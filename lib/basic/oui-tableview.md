# oui-tableview

A high-performance data table built on `OuiVirtualList`. Handles large datasets efficiently with sorting, row selection, column resizing, and optional header/footer rows.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | *(required)* | Array of row data objects. Generic type `T`. |
| `columns` | `OuiTableColumn<K>[]` | *(required)* | Column definitions (see below). |
| `rowHeight` | `number` | `44` | Height of each row in pixels. |
| `header` | `boolean` | `true` | Show the column header row. |
| `footer` | `boolean` | `false` | Show a footer row (uses `OuiTableColumn.footer` values). |
| `selectable` | `boolean` | `true` | Allow row selection by clicking. |
| `fillLast` | `boolean` | `true` | Expand the last column to fill remaining width. |
| `scrollToEnd` | `boolean` | `false` | Auto-scroll to the last row when `data` changes. |
| `rowAttrs` | `(item: T, index: number) => Record<string, any>` | `() => ({})` | Callback to add HTML attributes to each row element (e.g. `class`, `data-*`). |
| `name` | `string` | `undefined` | Unique name for persisting column widths in `localStorage`. |
| `resizeable` | `boolean` | `true` | Allow dragging column borders to resize columns. Requires `name` for persistence. |

## Models

| Model | Type | Description |
|-------|------|-------------|
| `modelValue` (`v-model`) | `number \| undefined` | Index of the selected row. `undefined` when no row is selected. |
| `sort` (`v-model:sort`) | `string` | Sort expression in the format `"fieldName asc"` or `"fieldName desc"`. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `select` | `(row: T, index: number, event: Event)` | Fired when a row is clicked. |
| `context` | `(row: T, index: number, event: Event)` | Fired on right-click (context menu) on a row. |
| `visible` | `(offset: number, limit: number)` | Fired when the visible row range changes (for server-side pagination). |

## OuiTableColumn

```ts
interface OuiTableColumn<K = string> {
  name: K            // field name in the data object
  title?: string     // column header label
  sortable?: boolean // enables click-to-sort on the header
  align?: 'left' | 'center' | 'right'  // cell text alignment
  valign?: 'top' | 'middle' | 'bottom' // cell vertical alignment
  footer?: string    // text shown in the footer row
  width?: number     // initial column width in pixels (default: 120)
  minWidth?: number  // minimum width when resizing
  maxWidth?: number  // maximum width when resizing
  grow?: boolean     // allow column to grow (overrides fillLast for this column)
}
```

## Example

```ts
import type { OuiTableColumn } from 'oui-kit'

const columns: OuiTableColumn[] = [
  { name: 'id',    title: '#',      sortable: false, width: 60 },
  { name: 'name',  title: 'Name',   sortable: true,  width: 200 },
  { name: 'email', title: 'Email',  sortable: true },
  { name: 'role',  title: 'Role',   align: 'center', width: 100 },
]
```

```vue
<OuiTableview
  v-model="selectedRow"
  v-model:sort="sortExpr"
  :columns="columns"
  :data="users"
  name="users-table"
  footer
  @select="onSelect"
  @context="onContextMenu"
/>
```

## Notes

- The parent element must have a fixed height (uses `OuiVirtualList` internally).
- Column widths are saved to `localStorage` under the key `oui.tableview.[name].widths` when `name` is set.
- The `sort` model is a string like `"name asc"` or `"email desc"` — sorting logic must be applied to `data` externally.
