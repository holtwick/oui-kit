# oui-virtual-list

A high-performance virtual list that renders only the rows currently visible in the viewport. Essential for large datasets (thousands of rows).

Used internally by `OuiTableview`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | *(required)* | Array of row data objects. Generic type `T`. |
| `rowHeight` | `number` | `20` | Height of each row in pixels. All rows must have the same height. |
| `rowBuffer` | `number` | `5` | Number of extra rows to render above and below the visible area. |
| `scrollToEnd` | `boolean` | `false` | Automatically scroll to the last row when `data` changes (useful for logs). |
| `emitDelay` | `number` | `100` | Debounce delay in ms before the `visible` event fires after scrolling. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `visible` | `(offset: number, limit: number)` | Fires when the visible range changes. Use for server-side pagination: load rows `offset` to `offset + limit`. |
| `scrollX` | `(x: number)` | Fires when the list scrolls horizontally. |

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `(default)` | `{ item: T, index: number }` | Template for each visible row. |

## Example

```vue
<OuiVirtualList
  :data="rows"
  :row-height="32"
  :scroll-to-end="isLiveLog"
  style="height: 400px"
  @visible="loadPage"
>
  <template #default="{ item, index }">
    <span>{{ index + 1 }}.</span>
    <span>{{ item.name }}</span>
  </template>
</OuiVirtualList>
```

```ts
function loadPage(offset: number, limit: number) {
  // fetch rows[offset..offset+limit] from server
}
```

## Notes

- The parent element **must** have a fixed height (e.g. `style="height: 400px"` or via CSS).
- Row height is uniform — variable row heights are not supported.
