<script lang="ts" setup>
import type { OuiSelectItem } from './_types'
import { computed, ref } from 'vue'
import { last } from 'zeed'
import OuiClose from './oui-close.vue'
import OuiCombobox from './oui-combobox.vue'

import './oui-input-tags.styl'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    /** Title for form item wrapper */
    title?: string
    description?: string
    required?: boolean

    /** Available items to choose from */
    items?: (OuiSelectItem | string)[]

    /** Placeholder for the combobox input */
    placeholder?: string

    disabled?: boolean

    /** Allow creating new items via callback. Return the new item's id. */
    addItemAction?: (title: string) => any

    /** Label for the "add item" entry in the dropdown */
    addItemTitle?: string
  }>(),
  {
    placeholder: '',
    disabled: false,
  },
)

const model = defineModel<string[]>({ default: () => [] })

const focus = ref(false)

const sourceItems = computed<OuiSelectItem[]>(() => {
  return (props.items ?? []).map(item =>
    typeof item === 'string' ? { id: item, title: item } : item,
  )
})

const availableItems = computed(() => {
  const selected = new Set(model.value)
  return sourceItems.value.filter(item => !selected.has(String(item.id)))
})

const tagsList = computed(() => {
  const itemMap = new Map(sourceItems.value.map(i => [String(i.id), i.title]))
  return model.value.map(id => ({
    id,
    title: itemMap.get(id) ?? id,
  }))
})

function doAddTag(id: string | number | undefined) {
  if (id != null) {
    const stringId = String(id)
    if (!model.value.includes(stringId))
      model.value = [...model.value, stringId]
  }
}

function doRemoveTag(id: string) {
  model.value = model.value.filter(v => v !== id)
}

function doDeleteLast() {
  const lastTag = last(tagsList.value)
  if (lastTag)
    doRemoveTag(lastTag.id)
}
</script>

<template>
  <OuiCombobox
    :model-value="undefined"
    class="oui-input-tags"
    :class="{ _focus: focus, _blur: !focus }"
    :title="title"
    :description="description"
    :required="required"
    :items="availableItems"
    :placeholder="tagsList.length > 0 ? '' : placeholder"
    :disabled="disabled"
    :add-item-action="addItemAction"
    :add-item-title="addItemTitle"
    clear-on-selection
    v-bind="$attrs"
    @change="doAddTag"
    @delete-last="doDeleteLast"
    @focus="focus = true"
    @blur="focus = false"
  >
    <template #before>
      <span v-for="tag in tagsList" :key="tag.id" class="oui-input-tags-tag">
        {{ tag.title }}
        <span class="oui-input-tags-tag-remove" @click.prevent="doRemoveTag(tag.id)">
          <OuiClose />
        </span>
      </span>
    </template>

    <template v-if="$slots.item" #item="{ item }">
      <slot name="item" :item="item" />
    </template>
  </OuiCombobox>
</template>
