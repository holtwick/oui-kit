# oui-object

Renders a JavaScript object as an interactive, collapsible tree view. Great for debugging and inspecting data at runtime.

> [!NOTE]
> **oui** components are *headless* – they do not ship with CSS by default. Import the CSS explicitly.

Based on [object-visualizer](https://github.com/iendeavor/object-visualizer).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `any` | *(required)* | The JavaScript value to display (object, array, primitive, etc.). |
| `title` | `string` | `'value'` | Root node label shown at the top of the tree. |

## Example

```vue
<script lang="ts" setup>
import { OuiObject } from 'oui-kit'
import 'oui-kit/css'

const data = {
  name: 'Alice',
  age: 30,
  address: { city: 'Berlin', zip: '10115' },
  tags: ['vue', 'typescript'],
}
</script>

<template>
  <OuiObject :value="data" title="user" />
</template>
```

## Notes

- Nodes up to depth 1 are expanded by default; deeper nodes start collapsed.
- Works with any serialisable value: plain objects, arrays, strings, numbers, booleans, `null`.
