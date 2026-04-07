<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import { computed, defineAsyncComponent, nextTick, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import OuiFormItem from './oui-form-item.vue'

import './oui-richtext.styl'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  required?: boolean
  id?: string
  disabled?: boolean
  placeholder?: string
  mentions?: string[]
  bordered?: boolean
  allowCustomMentions?: boolean
  blocks?: boolean
  links?: boolean
}>(), {
  bordered: true,
  allowCustomMentions: true,
  blocks: false,
  links: true,
})

const emit = defineEmits<{
  mention: [value: string]
}>()

const model = defineModel<string | undefined>({ required: true })

// Async TipTap imports (optional dependency)
const EditorContent = defineAsyncComponent(async () => (await import('@tiptap/vue-3')).EditorContent)

const editor = shallowRef<Editor>()
const editorElement = ref<HTMLElement>()

// Floating toolbar state
const toolbarVisible = ref(false)
const toolbarReference = ref<HTMLElement>()
const toolbarFloating = ref<HTMLElement>()

const { floatingStyles } = useFloating(toolbarReference, toolbarFloating, {
  placement: 'top',
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(8),
    flip(),
    shift({ padding: 8 }),
  ],
})

// Toolbar actions
function toggleBold() {
  editor.value?.chain().focus().toggleBold().run()
}

function toggleItalic() {
  editor.value?.chain().focus().toggleItalic().run()
}

function toggleUnderline() {
  editor.value?.chain().focus().toggleUnderline().run()
}

// Link editing state
const linkEditing = ref(false)
const linkUrl = ref('')

function selectLinkRange(ed: Editor) {
  const { from } = ed.state.selection
  const $pos = ed.state.doc.resolve(from)
  const markType = ed.schema.marks.link
  let start = from
  let end = from
  while (start > $pos.start()) {
    const prev = ed.state.doc.resolve(start)
    if (!markType.isInSet(prev.nodeBefore?.marks ?? []))
      break
    start--
  }
  while (end < $pos.end()) {
    const next = ed.state.doc.resolve(end)
    if (!markType.isInSet(next.nodeAfter?.marks ?? []))
      break
    end++
  }
  ed.commands.setTextSelection({ from: start, to: end })
}

function startLinkEdit() {
  const ed = editor.value
  if (!ed)
    return

  // Select entire link text when cursor is inside a link
  if (ed.isActive('link')) {
    selectLinkRange(ed)
    linkUrl.value = ed.getAttributes('link').href ?? ''
  }
  else {
    linkUrl.value = ''
  }

  // Need selection for toolbar positioning - update after potential range change
  nextTick(() => {
    updateToolbar()
    linkEditing.value = true
    nextTick(() => {
      const input = document.querySelector('.oui-richtext-toolbar input') as HTMLInputElement
      input?.focus()
      input?.select()
    })
  })
}

function confirmLink() {
  const ed = editor.value
  const url = linkUrl.value.trim()
  if (!ed || !url) {
    cancelLinkEdit()
    return
  }

  const href = /^https?:\/\//.test(url) ? url : `https://${url}`
  ed.chain().focus().setLink({ href }).run()
  linkEditing.value = false
  linkUrl.value = ''
}

function cancelLinkEdit() {
  linkEditing.value = false
  linkUrl.value = ''
  editor.value?.commands.focus()
}

function removeLink() {
  editor.value?.chain().focus().unsetLink().run()
  linkEditing.value = false
  linkUrl.value = ''
}

// Selection-based floating toolbar
function updateToolbar() {
  const ed = editor.value
  if (!ed)
    return

  const { from, to, empty } = ed.state.selection
  if (empty) {
    toolbarVisible.value = false
    return
  }

  // Create a virtual element from the selection coordinates
  const view = ed.view
  const start = view.coordsAtPos(from)
  const end = view.coordsAtPos(to)

  const virtualEl = document.createElement('span')
  virtualEl.style.position = 'fixed'
  virtualEl.style.left = `${start.left}px`
  virtualEl.style.top = `${Math.min(start.top, end.top)}px`
  virtualEl.style.width = `${end.right - start.left}px`
  virtualEl.style.height = `${Math.max(end.bottom, start.bottom) - Math.min(start.top, end.top)}px`
  virtualEl.style.pointerEvents = 'none'
  document.body.appendChild(virtualEl)

  // Clean up previous virtual element
  if (toolbarReference.value && toolbarReference.value !== editorElement.value)
    toolbarReference.value.remove()

  toolbarReference.value = virtualEl
  toolbarVisible.value = true
}

function hideToolbar() {
  toolbarVisible.value = false
  linkEditing.value = false
  linkUrl.value = ''
  if (toolbarReference.value && toolbarReference.value !== editorElement.value) {
    toolbarReference.value.remove()
    toolbarReference.value = undefined
  }
}

// Mention suggestion dropdown
const mentionListVisible = ref(false)
const mentionItems = ref<string[]>([])
const mentionQuery = ref('')
const mentionSelectedIndex = ref(0)
const mentionReference = ref<HTMLElement>()
const mentionFloating = ref<HTMLElement>()
const mentionCommand = ref<((props: { id: string }) => void) | null>(null)

const { floatingStyles: mentionFloatingStyles } = useFloating(mentionReference, mentionFloating, {
  placement: 'bottom-start',
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(4),
    flip(),
    shift({ padding: 8 }),
  ],
})

const filteredMentions = computed(() => {
  const q = mentionQuery.value.toLowerCase()
  return mentionItems.value.filter(item => item !== '__custom__' && item.toLowerCase().includes(q))
})

const showCustomOption = computed(() => {
  if (!props.allowCustomMentions || !mentionQuery.value.trim())
    return false
  const q = mentionQuery.value.toLowerCase()
  return !filteredMentions.value.some(item => item.toLowerCase() === q)
})

const totalItems = computed(() => filteredMentions.value.length + (showCustomOption.value ? 1 : 0))

function selectMention(index: number) {
  if (index === filteredMentions.value.length && showCustomOption.value) {
    selectCustomMention()
    return
  }
  const item = filteredMentions.value[index]
  if (item && mentionCommand.value) {
    mentionCommand.value({ id: item })
    mentionListVisible.value = false
  }
}

function selectCustomMention() {
  const name = mentionQuery.value.trim()
  if (name && mentionCommand.value) {
    mentionCommand.value({ id: name })
    mentionListVisible.value = false
    emit('mention', name)
  }
}

// Initialize editor
async function initEditor() {
  const imports = [
    import('@tiptap/vue-3'),
    import('@tiptap/starter-kit'),
    import('@tiptap/extension-placeholder'),
    import('@tiptap/extension-mention'),
    import('@tiptap/suggestion'),
    props.links ? import('@tiptap/extension-link') : undefined,
  ] as const

  const results = await Promise.all(imports)
  const { Editor } = results[0]
  const { default: StarterKit } = results[1]
  const { default: Placeholder } = results[2]
  const { default: Mention } = results[3]
  const { default: Suggestion } = results[4]
  const Link = results[5]?.default

  const mentionSuggestion: Partial<typeof Suggestion> = {
    char: '@',
    allowSpaces: true,
    items: ({ query }: { query: string }) => {
      mentionQuery.value = query
      const filtered = (props.mentions ?? []).filter(item =>
        item.toLowerCase().includes(query.toLowerCase()),
      )
      // Return at least a placeholder so TipTap keeps the dropdown open for custom input
      if (filtered.length === 0 && props.allowCustomMentions && query.trim())
        return ['__custom__']
      return filtered
    },
    render: () => {
      return {
        onStart: (renderProps: any) => {
          mentionItems.value = renderProps.items
          mentionCommand.value = renderProps.command
          mentionSelectedIndex.value = 0

          // Position near cursor
          const coords = renderProps.clientRect?.()
          if (coords) {
            const el = document.createElement('span')
            el.style.position = 'fixed'
            el.style.left = `${coords.left}px`
            el.style.top = `${coords.bottom}px`
            el.style.width = '1px'
            el.style.height = '1px'
            el.style.pointerEvents = 'none'
            document.body.appendChild(el)
            if (mentionReference.value)
              mentionReference.value.remove()
            mentionReference.value = el
          }

          mentionListVisible.value = true
        },
        onUpdate: (renderProps: any) => {
          mentionItems.value = renderProps.items
          mentionCommand.value = renderProps.command
          mentionQuery.value = renderProps.query

          const coords = renderProps.clientRect?.()
          if (coords) {
            const el = document.createElement('span')
            el.style.position = 'fixed'
            el.style.left = `${coords.left}px`
            el.style.top = `${coords.bottom}px`
            el.style.width = '1px'
            el.style.height = '1px'
            el.style.pointerEvents = 'none'
            document.body.appendChild(el)
            if (mentionReference.value)
              mentionReference.value.remove()
            mentionReference.value = el
          }
        },
        onKeyDown: (renderProps: any) => {
          const { event } = renderProps
          const total = totalItems.value
          if (event.key === 'ArrowDown') {
            mentionSelectedIndex.value = (mentionSelectedIndex.value + 1) % total
            return true
          }
          if (event.key === 'ArrowUp') {
            mentionSelectedIndex.value = (mentionSelectedIndex.value - 1 + total) % total
            return true
          }
          if (event.key === 'Enter') {
            selectMention(mentionSelectedIndex.value)
            return true
          }
          if (event.key === 'Escape') {
            mentionListVisible.value = false
            return true
          }
          return false
        },
        onExit: () => {
          mentionListVisible.value = false
          if (mentionReference.value) {
            mentionReference.value.remove()
            mentionReference.value = undefined
          }
        },
      }
    },
  }

  editor.value = new Editor({
    content: model.value ?? '',
    editable: !props.disabled,
    extensions: [
      StarterKit.configure({
        heading: props.blocks ? { levels: [1, 2, 3] as const } : false,
        codeBlock: props.blocks ? {} : false,
        blockquote: props.blocks ? {} : false,
        bulletList: props.blocks ? {} : false,
        orderedList: props.blocks ? {} : false,
        listItem: props.blocks ? {} : false,
        horizontalRule: props.blocks ? {} : false,
      }),
      Placeholder.configure({
        placeholder: props.placeholder ?? '',
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'oui-richtext-mention',
        },
        suggestion: mentionSuggestion as any,
      }),
      ...(Link
        ? [Link.configure({
            openOnClick: false,
            autolink: true,
            linkOnPaste: true,
            HTMLAttributes: {
              class: 'oui-richtext-link',
            },
          })]
        : []),
    ],
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML()
      model.value = html === '<p></p>' ? '' : html
    },
    onSelectionUpdate: () => {
      nextTick(updateToolbar)
    },
    onBlur: () => {
      // Delay to allow toolbar click; keep toolbar open during link editing
      setTimeout(() => {
        if (!linkEditing.value)
          hideToolbar()
      }, 200)
    },
  })
}

initEditor()

// Sync external model changes
let skipWatch = false
watch(() => model.value, (v) => {
  if (skipWatch)
    return
  const ed = editor.value
  if (ed && v !== ed.getHTML()) {
    skipWatch = true
    ed.commands.setContent(v ?? '', { emitUpdate: false })
    nextTick(() => skipWatch = false)
  }
})

watch(() => props.disabled, (disabled) => {
  editor.value?.setEditable(!disabled)
})

onBeforeUnmount(() => {
  editor.value?.destroy()
  hideToolbar()
  if (mentionReference.value)
    mentionReference.value.remove()
})
</script>

<template>
  <OuiFormItem :id="id" :title="title" :description="description" :required="required">
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.description" #description>
      <slot name="description" />
    </template>

    <div ref="editorElement" class="oui-richtext" :class="{ _disabled: props.disabled, _bordered: props.bordered }" v-bind="$attrs">
      <EditorContent v-if="editor" :editor="editor" />
    </div>

    <!-- Floating formatting toolbar -->
    <teleport to="body">
      <Transition name="oui-richtext-toolbar-transition">
        <div
          v-show="toolbarVisible"
          ref="toolbarFloating"
          class="oui-richtext-toolbar"
          :style="floatingStyles"
          @mousedown.prevent
        >
          <template v-if="!linkEditing">
            <button
              type="button"
              :class="{ _active: editor?.isActive('bold') }"
              @click="toggleBold"
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              :class="{ _active: editor?.isActive('italic') }"
              @click="toggleItalic"
            >
              <em>I</em>
            </button>
            <button
              type="button"
              :class="{ _active: editor?.isActive('underline') }"
              @click="toggleUnderline"
            >
              <u>U</u>
            </button>
            <button
              v-if="links"
              type="button"
              :class="{ _active: editor?.isActive('link') }"
              @click="startLinkEdit"
            >
              &#128279;
            </button>
          </template>
          <template v-else>
            <input
              v-model="linkUrl"
              class="oui-richtext-toolbar-input"
              placeholder="https://..."
              @keydown.enter.prevent="confirmLink"
              @keydown.escape.prevent="cancelLinkEdit"
            >
            <button type="button" @click="confirmLink">
              &#10003;
            </button>
            <button v-if="editor?.isActive('link')" type="button" @click="removeLink">
              &#128465;
            </button>
            <button type="button" @click="cancelLinkEdit">
              &#10005;
            </button>
          </template>
        </div>
      </Transition>
    </teleport>

    <!-- Mention dropdown -->
    <teleport to="body">
      <Transition name="oui-richtext-toolbar-transition">
        <div
          v-show="mentionListVisible && totalItems > 0"
          ref="mentionFloating"
          class="oui-richtext-mentions"
          :style="mentionFloatingStyles"
        >
          <button
            v-for="(item, index) in filteredMentions"
            :key="item"
            type="button"
            class="oui-richtext-mention-item"
            :class="{ _active: index === mentionSelectedIndex }"
            @mousedown.prevent="selectMention(index)"
          >
            {{ item }}
          </button>
          <button
            v-if="showCustomOption"
            type="button"
            class="oui-richtext-mention-item _custom"
            :class="{ _active: mentionSelectedIndex === filteredMentions.length }"
            @mousedown.prevent="selectCustomMention"
          >
            + {{ mentionQuery }}
          </button>
        </div>
      </Transition>
    </teleport>
  </OuiFormItem>
</template>
