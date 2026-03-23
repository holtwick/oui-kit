# oui-float

Floating UI components (tooltips, popovers, context menus) built on [`@floating-ui/vue`](https://floating-ui.com/).

> [!NOTE]
> **oui** components are *headless* – they do not ship with CSS by default. Import the CSS explicitly.

## Components

- [`OuiFloat`](#ouifloat) – general-purpose floating element
- [`OuiMenu`](#ouimenu) – context / dropdown menu
- [`OuiTooltipActivator`](#ouitooltipactivator) – global tooltip via `tooltip` attribute

---

## OuiFloat

General-purpose floating element. Attaches to a reference element and positions itself automatically.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `reference` | `Ref<HTMLElement \| undefined>` | `undefined` | The element to float against. If omitted, use the `trigger` / `click` / `hover` slots instead. |
| `placement` | `Placement` | `'top'` | Preferred placement (`'top'`, `'bottom'`, `'left'`, `'right'`, and `-start`/`-end` variants). Flips automatically if there is not enough space. |
| `arrow` | `boolean` | `false` | Show an arrow pointing from the float to the reference. |
| `offset` | `OffsetOptions` | `0` | Distance in pixels between the float and the reference element. |
| `padding` | `Padding` | `16` | Minimum distance to keep from the viewport edges (shift middleware). |
| `close` | `boolean` | `false` | Show a close button inside the float. |
| `hover` | `boolean` | `false` | Show the float on mouse hover over the trigger. |
| `delayEnter` | `number` | `undefined` | Delay in ms before showing on hover. |
| `delayLeave` | `number` | `undefined` | Delay in ms before hiding after hover leaves. |
| `transition` | `string` | `undefined` | Vue transition name for show/hide animation. |

### Model

| Model | Type | Description |
|-------|------|-------------|
| `modelValue` (`v-model`) | `boolean` | Controls visibility. |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `close` | – | Emitted when the float closes. |
| `dblclick` | `MouseEvent` | Emitted on double-click inside the float. |

### Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `(default)` | – | Content of the floating element. |
| `trigger` | `{ active: boolean }` | Generic trigger (toggles on click). |
| `click` | `{ active: boolean }` | Click-triggered area (alias for `trigger`). |
| `hover` | `{ active: boolean }` | Hover-triggered area. |

### HTML structure

```html
<div class="oui-float _float">
  <div class="_float_arrow"></div>   <!-- only when :arrow="true" -->
  <div class="_float_content">
    <slot />
  </div>
</div>
```

### Examples

```vue
<!-- External reference element -->
<script setup>
const button = ref()
const show = ref(false)
</script>

<template>
  <button ref="button" @click="show = !show">Toggle</button>
  <OuiFloat v-model="show" :reference="button" placement="bottom">
    Popover content
  </OuiFloat>
</template>
```

```vue
<!-- Inline trigger via slot -->
<OuiFloat placement="bottom">
  Dropdown content here
  <template #click="{ active }">
    <button :class="{ _active: active }">Open</button>
  </template>
</OuiFloat>
```

```vue
<!-- Hover tooltip -->
<OuiFloat hover placement="top" :delay-enter="300">
  Tooltip text
  <template #hover>
    <span>Hover me</span>
  </template>
</OuiFloat>
```

---

## OuiMenu

Context or dropdown menu. Renders a list of `OuiMenuItem` entries, supports nested submenus.

```ts
import { OuiMenu, useMenu } from 'oui-kit'
import type { OuiMenuItem } from 'oui-kit'
```

### OuiMenuItem type

```ts
interface OuiMenuItem {
  title: string
  action?: () => void
  icon?: string | Component
  disabled?: boolean
  children?: OuiMenuItem[]  // submenu
}
```

### Example

```vue
<OuiMenu :items="[
  { title: 'Edit',   action: onEdit },
  { title: 'Delete', action: onDelete, icon: TrashIcon },
]" />
```

---

## OuiTooltipActivator

Place once in your `App.vue`. Every HTML element with a `tooltip` attribute will then show a tooltip on hover — no extra components needed.

```vue
<!-- App.vue -->
<OuiTooltipActivator />
```

```html
<!-- Anywhere in your app -->
<button tooltip="Save the current document">Save</button>
<i tooltip="This is italic">italic text</i>
```

---

## Directives

| Directive | Description |
|-----------|-------------|
| `v-menu` | Attaches a context menu to any element. |
| `v-context` | Alias for `v-menu` for right-click context menus. |

```vue
<div v-menu="menuItems">Right-click me</div>
```
