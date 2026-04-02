# OuiInputTags

Tag input field with autocomplete. Allows selecting multiple items displayed as removable tags. Built on top of `OuiCombobox`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string[]` | `[]` | v-model array of selected tag ids |
| `items` | `(OuiSelectItem \| string)[]` | – | Available tags to choose from |
| `title` | `string` | – | Form item label |
| `description` | `string` | – | Form item description |
| `required` | `boolean` | – | Mark as required |
| `placeholder` | `string` | `''` | Input placeholder (hidden when tags are present) |
| `disabled` | `boolean` | `false` | Disable the input |
| `addItemAction` | `(title: string) => any` | – | Callback to create a new item; should return the new id |
| `addItemTitle` | `string` | – | Label for the "add item" entry in the dropdown |

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `item` | `{ item: OuiSelectItem }` | Custom rendering for dropdown items |

## Example

```vue
<script setup>
import { ref } from 'vue'
import { OuiInputTags } from 'oui-kit'

const tags = ref(['apple', 'cherry'])
const fruits = [
  { id: 'apple', title: 'Apple' },
  { id: 'banana', title: 'Banana' },
  { id: 'cherry', title: 'Cherry' },
  { id: 'mango', title: 'Mango' },
]
</script>

<template>
  <OuiInputTags v-model="tags" :items="fruits" title="Fruits" placeholder="Add fruit..." />
</template>
```

## With string items

```vue
<OuiInputTags v-model="colors" :items="['red', 'green', 'blue']" />
```

## With add item action

```vue
<OuiInputTags
  v-model="tags"
  :items="items"
  :add-item-action="(title) => { items.push({ id: title, title }); return title }"
  placeholder="Type to add..."
/>
```
