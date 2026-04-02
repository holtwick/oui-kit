# OuiCombobox

Searchable select with autocomplete dropdown. Filters items as you type.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number` | – | v-model selected id |
| `items` | `(OuiSelectItem \| string \| number)[]` | – | Available options |
| `title` | `string` | – | Form item label |
| `description` | `string` | – | Form item description |
| `required` | `boolean` | – | Mark as required |
| `placeholder` | `string` | `''` | Input placeholder |
| `selectIcon` | `boolean` | `false` | Show trailing select arrow |
| `clearable` | `boolean` | `false` | Show clear button when value is set |
| `disabled` | `boolean` | `false` | Disable input |
| `formatValue` | `(value: any) => string` | – | Format model value for display in input |
| `parseValue` | `(value: string) => any` | – | Parse input text back to model value |
| `addItemAction` | `(title: string) => any` | – | Callback to create a new item; return the new id |
| `addItemTitle` | `string` | – | i18n key for the "add item" label |
| `addItemClass` | `string` | – | CSS class for the "add item" entry |
| `addItemFooter` | `boolean` | `false` | Show "add item" at bottom instead of top |
| `clearOnSelection` | `boolean` | `false` | Clear input text after selecting an item |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `change` | `string \| number \| undefined` | Fired when value changes |
| `deleteLast` | – | Fired on Backspace with empty input |

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `before` | – | Content before the input (e.g. tags) |
| `after` | – | Content after the input |
| `item` | `{ item: OuiSelectItem }` | Custom rendering for dropdown items |
| `header` | – | Content above the dropdown list |
| `footer` | – | Content below the dropdown list |
| `empty` | – | Content when no items match |
| `title` | – | Custom title slot (forwarded to OuiFormItem) |
| `description` | – | Custom description slot (forwarded to OuiFormItem) |

## Example

```vue
<script setup>
import { ref } from 'vue'
import { OuiCombobox } from 'oui-kit'

const value = ref('cherry')
const items = [
  { id: 'apple', title: 'Apple' },
  { id: 'banana', title: 'Banana' },
  { id: 'cherry', title: 'Cherry' },
]
</script>

<template>
  <OuiCombobox v-model="value" :items="items" title="Fruit" placeholder="Search..." />
</template>
```

## With clearable

```vue
<OuiCombobox v-model="value" :items="items" clearable />
```

## With addItemAction

When the user types something that doesn't match any item, an "Add ..." entry appears in the dropdown. The callback receives the typed text and should return the new item's id.

```vue
<OuiCombobox
  v-model="value"
  :items="items"
  :add-item-action="(title) => { items.push({ id: title, title }); return title }"
  clearable
/>
```

## With formatValue / parseValue

Useful for numeric or formatted values where the display differs from the stored value.

```vue
<OuiCombobox
  v-model="percent"
  :items="[5, 7, 16, 19]"
  :format-value="v => v != null ? `${v} %` : ''"
  :parse-value="v => Number.parseInt(v, 10)"
/>
```

## clearOnSelection

Clears the input text after selecting an item. Used internally by OuiInputTags.

```vue
<OuiCombobox
  v-model="value"
  :items="items"
  clear-on-selection
  @change="onSelected"
/>
```
