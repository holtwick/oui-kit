# oui-alert

Inline alert box for feedback messages. Supports four semantic modes, an optional heading, and optional dismiss button.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'info' \| 'success' \| 'warn' \| 'error'` | `'info'` | Visual variant. |
| `title` | `string` | `undefined` | Optional heading shown above the message. |
| `dismissible` | `boolean` | `undefined` | Show a close button. Clicking it hides the alert and emits `close`. |

## Model

| Model | Type | Description |
|-------|------|-------------|
| `modelValue` (`v-model`) | `boolean` | Controls visibility. Defaults to `true`. |

## Events

| Event | Description |
|-------|-------------|
| `close` | Emitted when the dismiss button is clicked. |

## Slots

| Slot | Description |
|------|-------------|
| `(default)` | Alert message content. |

## Example

```vue
<OuiAlert mode="error" title="Login failed">
  Invalid username or password.
</OuiAlert>

<OuiAlert mode="success">
  Your changes have been saved.
</OuiAlert>

<!-- Dismissible -->
<OuiAlert v-model="showAlert" mode="warn" title="Warning" dismissible @close="onClose">
  This action cannot be undone.
</OuiAlert>
```
