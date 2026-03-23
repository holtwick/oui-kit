# oui-resizeable

Adds a draggable separator between two sibling elements, allowing the user to resize them. Persists the size to `localStorage`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | *(required)* | Unique key for persisting the pane size in `localStorage` (`oui.resizeable.[name]`). |
| `side` | `'top' \| 'left' \| 'right' \| 'bottom'` | *(required)* | Which side of `OuiResizeable` the resizable pane is on relative to its sibling. |
| `size` | `number` | *(required)* | Initial size in pixels. |
| `minSize` | `number` | *(required)* | Minimum allowed size in pixels. |
| `maxSize` | `number` | *(required)* | Maximum allowed size in pixels. |
| `color` | `string` | `undefined` | Custom colour for the separator handle. |
| `hide` | `boolean` | `undefined` | Hides the resizable pane and the separator (e.g. for collapsible sidebars). |
| `static` | `boolean` | `undefined` | Renders a plain `<div>` without any separator or resize behaviour. |

## Slots

| Slot | Description |
|------|-------------|
| `(default)` | Content of the resizable pane. |

## Example

```vue
<!-- Left pane (fills remaining space) -->
<div class="center _grow">
  Main content
</div>

<!-- Right pane – resizable between 200 and 400px, starts at 300px -->
<OuiResizeable side="left" name="sidebar" :size="300" :min-size="200" :max-size="400">
  Sidebar content
</OuiResizeable>
```

```vue
<!-- Vertical split: top/bottom -->
<OuiResizeable side="bottom" name="details" :size="200" :min-size="100" :max-size="500">
  Detail panel
</OuiResizeable>
<div class="_grow">
  List
</div>
```

## Notes

- The `side` prop describes which side the **neighbour** element is on. `side="left"` means "my neighbour is to my left", so the component renders on the right with a separator on its left edge.
- Size is stored as `oui.resizeable.[name]` in `localStorage` and restored on next render.
