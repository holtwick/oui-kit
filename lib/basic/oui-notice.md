# oui-notice

A prominent notice/overlay component for warnings, errors, or important messages. Covers the nearest `position: relative` parent. Supports an optional SVG icon.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Title text. Alternative to the `title` slot. |
| `cover` | `boolean` | `undefined` | If `true`, renders as a full-screen overlay via `<Teleport to="body">` with focus trapping. |

## Slots

| Slot | Description |
|------|-------------|
| `(default)` | Message body content. |
| `title` | Custom title content. Falls back to the `title` prop. |
| `icon` | SVG icon shown above the title. |

## CSS Variables

| Variable | Description |
|----------|-------------|
| `--notice-fg` | Icon and text foreground color. |
| `--notice-bg` | Background color of the notice box. |

## Example

```vue
<OuiNotice title="Warning">
  You should not do that!
</OuiNotice>

<!-- With icon and custom colors -->
<OuiNotice title="Error" style="--notice-fg: red; --notice-bg: #fee">
  <template #icon>
    <svg>…</svg>
  </template>
  Something went wrong.
</OuiNotice>

<!-- Full-screen cover overlay with focus trap -->
<OuiNotice cover title="Loading…" />
```
