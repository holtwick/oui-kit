<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import type { OuiSelectItem } from './_types'
import { computed, inject, ref, watch } from 'vue'
import { isNumber, isString, Logger, promisify, uuid } from 'zeed'
import OuiFloat from '../float/oui-float.vue'
import { tt } from './i18n'
import OuiClose from './oui-close.vue'
import OuiFormItem from './oui-form-item.vue'
import OuiItems from './oui-items.vue'

import './oui-combobox.styl'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    id?: string
    title?: string
    description?: string
    required?: boolean

    /** Suggestions */
    items: (OuiSelectItem | string | number)[]

    placeholder?: string
    selectIcon?: boolean
    clearable?: boolean
    disabled?: boolean

    formatValue?: (value: any) => string
    parseValue?: (value: string) => any

    /** Allow to create new item, return its id */
    addItemAction?: (title: string) => any
    addItemTitle?: string
    addItemClass?: string
    addItemFooter?: boolean

    /** Clear input text after selecting an item */
    clearOnSelection?: boolean
  }>(),
  {
    id: uuid(),
    placeholder: '',
    selectIcon: false,
    clearable: false,
    addItemFooter: false,
    disabled: false,
    clearOnSelection: false,
  },
)

const emit = defineEmits<{
  change: [value: string | number | undefined]
  deleteLast: []
}>()

const log: LoggerInterface = Logger('oui-combobox')

// Resolve translate function during setup (inject must not be called inside computed)
const translateFn = inject('t', null) as ((id: string, ...args: any) => string) | null

function translateAddTitle(value: string): string {
  const key = props.addItemTitle ?? 'ui.combobox.addTitle'
  if (translateFn) {
    const result = translateFn(key, value)
    if (result !== key)
      return result
  }
  return `Add "${value}"`
}

const model = defineModel({ required: true })

const target = ref()
const input = ref()
const selected = ref(0)
const focus = ref(false)
const showPopover = ref(false)
const inputValue = ref<string>('')
const applyFilter = ref(false)

const sourceItems = computed<OuiSelectItem[]>(() => {
  return (props.items ?? []).map((item) => {
    if (isString(item) || isNumber(item)) {
      return {
        id: String(item),
        title: props.formatValue?.(item as any) ?? String(item),
      }
    }
    return item
  })
})

const filteredItems = computed<OuiSelectItem[]>(() => {
  let items = [...sourceItems.value]

  if (applyFilter.value) {
    const value = inputValue.value.trim()
    const lvalue = value.toLowerCase()
    let exactMatch = false

    items = items.filter((item) => {
      if (value) {
        if (item.title.toLowerCase() === lvalue)
          exactMatch = true
        else if (props.parseValue && props.parseValue(value) === item.id)
          exactMatch = true

        if (!exactMatch) {
          const search = item.search?.toString().toLowerCase() ?? item.title.toString().toLowerCase()
          return search.includes(lvalue)
        }
        return exactMatch
      }
      return true
    })

    if (value && !exactMatch) {
      if (props.addItemAction) {
        const addItem: any = {
          action: () => {
            promisify(props.addItemAction!(value)).then(id =>
              setModelValue(id),
            )
          },
          title: translateAddTitle(value),
          class: props.addItemClass ?? 'oui-combobox-item-add',
          skipSelection: items.length > 0,
        }
        if (props.addItemFooter)
          items.push(addItem)
        else
          items.unshift(addItem)
      }
      else if (props.formatValue && props.parseValue) {
        const parsed = props.parseValue(inputValue.value ?? '')
        if (parsed) {
          items.unshift({
            title: props.formatValue(parsed),
            id: parsed,
            class: props.addItemClass ?? 'oui-combobox-item-preview',
          })
        }
      }
    }
  }

  return items
})

function updateInputValue() {
  if (props.formatValue)
    inputValue.value = props.formatValue(model.value) ?? ''
  else
    inputValue.value = sourceItems.value.find(item => item.id === model.value)?.title ?? ''
}

watch(model, updateInputValue, { immediate: true })

function setModelValue(value: string | number | undefined) {
  emit('change', value)
  if (model.value !== value)
    model.value = value
  if (props.clearOnSelection)
    inputValue.value = ''
  else
    updateInputValue()
}

function doMove(delta: number, e?: KeyboardEvent) {
  if (e?.metaKey)
    return
  showPopover.value = true
  selected.value = Math.max(0, Math.min(filteredItems.value.length - 1, selected.value + delta))
  e?.stopPropagation()
  e?.preventDefault()
}

function doSelectItemByClickOnList(item: any) {
  if (item.action)
    item.action(inputValue.value)
  else
    setModelValue(item.id)
  showPopover.value = false
}

function doSelect(closePopover: boolean = true) {
  const item = filteredItems.value[selected.value]
  if (!item) {
    setModelValue(undefined)
    return
  }
  if (item?.action)
    item.action(inputValue.value)
  else
    setModelValue(item.id)
  if (closePopover)
    showPopover.value = false
  selected.value = 0
}

function doDeleteLast(ev: Event) {
  if (inputValue.value?.length === 0) {
    ev.preventDefault()
    showPopover.value = false
    emit('deleteLast')
  }
}

function doInput() {
  showPopover.value = true
  applyFilter.value = true
  selected.value = filteredItems.value?.[0]?.skipSelection ? 1 : 0
}

function doBlur() {
  if (focus.value === true) {
    focus.value = false
    if (inputValue.value.trim().length === 0) {
      setModelValue(undefined)
    }
    else if (props.parseValue) {
      setModelValue(props.parseValue(inputValue.value))
    }
    else if (showPopover.value === true) {
      const item = filteredItems.value[selected.value]
      if (item?.id)
        setModelValue(item.id)
    }
    updateInputValue()
    showPopover.value = false
  }
}

function doFocus() {
  applyFilter.value = false
  focus.value = true
  showPopover.value = true
  input.value.select()
  queueMicrotask(() => {
    selected.value = filteredItems.value.findIndex(item => item.id === model.value)
  })
}
</script>

<template>
  <OuiFormItem :id="id" :title="title" :description="description" :required="required">
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.description" #description>
      <slot name="description" />
    </template>

    <div
      ref="target"
      class="oui-input-container oui-combobox"
      :class="{ '-focus': focus }"
      v-bind="$attrs"
      @click="input.focus()"
    >
      <slot name="before" />
      <input
        :id="id"
        ref="input"
        v-model="inputValue"
        autocomplete="off"
        :placeholder="placeholder"
        class="oui-combobox-input"
        :disabled="disabled"
        @focus="doFocus"
        @blur="doBlur"
        @input="doInput"
        @keydown.down="doMove(+1, $event)"
        @keydown.up="doMove(-1, $event)"
        @keydown.esc="showPopover = false"
        @keydown.enter="doSelect(true)"
        @keydown.backspace="doDeleteLast"
      >
      <div
        v-if="clearable && (model || inputValue)"
        class="oui-combobox-clearable"
        @click="setModelValue(undefined)"
      >
        <OuiClose />
      </div>
      <div v-if="selectIcon" class="oui-combobox-select-icon" />
      <slot name="after" />
      <OuiFloat
        v-model="showPopover"
        :reference="target"
        placement="bottom-start"
        theme="dropdown"
        :offset="4"
        class="oui-float _dropdown combobox-dropdown"
      >
        <div class="oui-combobox-popover-content">
          <slot name="header" />
          <slot v-if="filteredItems.length <= 0" name="empty">
            <div class="oui-items-item">
              {{ tt('Empty', 'ui.combobox.empty') }}
            </div>
          </slot>
          <OuiItems
            v-else
            v-slot="{ item }"
            v-model="selected"
            :items="filteredItems"
            @pointerdown="focus = false"
            @pointerup="showPopover = false"
            @action="doSelectItemByClickOnList"
          >
            <slot name="item" :item="(item as OuiSelectItem)">
              {{ item.title }}&nbsp;
            </slot>
          </OuiItems>
          <slot />
          <slot name="footer" />
          <div class="oui-combobox-popover-content-spacer" />
        </div>
      </OuiFloat>
    </div>
  </OuiFormItem>
</template>
