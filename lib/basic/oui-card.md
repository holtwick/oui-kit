# oui-card

Container with card styling (border, shadow, padding). Supports optional header, footer, and collapsible behavior with persistent state.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Heading shown in the header. Ignored if the `title` or `header` slot is used. |
| `collapsible` | `boolean` | `false` | Allow toggling the body by clicking the header. |
| `collapsed` | `boolean` | `false` | Initial collapsed state. |
| `hideArrow` | `boolean` | `false` | Hide the arrow indicator in collapsible mode. |
| `name` | `string` | `undefined` | If set, the collapsed state is persisted in `localStorage` under `oui.card.collapsed.<name>`. |

## Slots

| Slot | Description |
|------|-------------|
| `(default)` | Card body content. |
| `header` | Full custom header. Overrides `title` slot and `title` prop. |
| `title` | Custom title content inside the default header layout. |
| `footer` | Footer content shown below the body (hidden when collapsed). |

## Example

```vue
<OuiCard title="Details">
  <p>Card content here</p>
</OuiCard>

<!-- Collapsible with persisted state -->
<OuiCard title="Settings" collapsible name="settings">
  <p>Toggle me by clicking the header.</p>
  <template #footer>
    <OuiButton>Save</OuiButton>
  </template>
</OuiCard>

<!-- Custom header -->
<OuiCard collapsible>
  <template #header>
    <strong>Custom header</strong>
  </template>
  Body content.
</OuiCard>
```
