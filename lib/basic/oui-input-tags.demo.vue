<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiCheckbox, OuiDemo, OuiInput, OuiInputTags } from '../lib'

const fruits = [
  'Apple',
  'Banana',
  'Cherry',
  'Damson',
  'Elderberry',
  'Fig',
  'Guava',
  'Hawthorn',
  'Jackfruit',
  'Kumquat',
  'Lemon',
  'Mango',
  'Nectarine',
  'Olive',
  'Papaya',
  'Raspberry',
  'Strawberry',
  'Tangerine',
]

const items = fruits.map(title => ({ id: title.toLowerCase(), title }))

const state = reactive<any>({
  tags: ['apple', 'cherry', 'mango'],
  tagsEmpty: [],
  disabled: false,
  required: false,
  allowAdd: true,
  title: 'Fruits',
  description: '',
  placeholder: 'Add fruit...',
  items,
})

function doAddItem(title: string) {
  const id = title.toLowerCase().replace(/\s+/g, '-')
  state.items.push({ id, title })
  return id
}
</script>

<template>
  <div>
    <OuiInputTags
      v-model="state.tags"
      :title="state.title"
      :description="state.description || undefined"
      :placeholder="state.placeholder"
      :items="state.items"
      :disabled="state.disabled"
      :required="state.required"
      :add-item-action="state.allowAdd ? doAddItem : undefined"
    />
  </div>

  <div>
    <OuiInputTags
      v-model="state.tagsEmpty"
      title="Empty"
      placeholder="Type to add..."
      :items="state.items"
      :add-item-action="doAddItem"
    />
  </div>

  <div>
    <OuiInputTags
      v-model="state.tags"
      title="Simple strings"
      :items="['red', 'green', 'blue', 'yellow', 'purple']"
    />
  </div>

  <OuiDemo :state="state">
    <OuiInput v-model="state.title" title="title" />
    <OuiInput v-model="state.description" title="description" />
    <OuiInput v-model="state.placeholder" title="placeholder" />
    <OuiCheckbox v-model="state.disabled" switch title="disabled" />
    <OuiCheckbox v-model="state.required" switch title="required" />
    <OuiCheckbox v-model="state.allowAdd" switch title="addItemAction" />
  </OuiDemo>
</template>
