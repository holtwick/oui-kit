# oui-mobile

Fixes common mobile browser layout issues (especially iOS Safari) when using modals, forms, and full-height app layouts.

Place it once in your app root — it acts as a singleton:

```vue
<OuiMobileActivator />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'app' \| 'body'` | `undefined` | Layout mode. `'app'` targets the app shell; `'body'` targets the document body. When omitted, the default mobile fixes are applied without a specific layout target. |

## What it fixes

Without `OuiMobileActivator`, iOS Safari commonly causes:

- Viewport height jumps when the virtual keyboard opens/closes
- Focused inputs being pushed out of view or hidden behind the keyboard
- Unwanted page scroll or "rubber-band" overscroll inside modals
- Broken full-height layouts in modals and app shells
- Incorrect bottom safe-area spacing while typing

## How it works

The activator runs once (singleton) and only activates on mobile user agents. On mount it adds classes to `<html>`:

- `oui-mobile` – activates the mobile CSS behaviour
- `oui-mobile-supported` – marks that runtime support is active

It then tracks the real visible viewport height via `visualViewport.resize` and writes it into the CSS variable `--visible-height`. Layouts using `.oui-mobile-fullheight` follow this value, so they correctly account for the keyboard.

To detect keyboard state it checks `document.activeElement`:

- If an `input`, `textarea`, or `[contenteditable]` is focused → adds `html.virtual-keyboard`
- On blur → removes `html.virtual-keyboard`

The `virtual-keyboard` class sets `--safe-bottom: 0`, preventing extra spacing artifacts on iOS while typing.

After a ~400ms keyboard animation delay, the focused field is scrolled into view with `scrollIntoView({ behavior: 'instant', block: 'nearest' })`.

Touch scroll is guarded at the capture phase to prevent iOS bounce/background scroll while preserving intentional scroll regions.

## CSS variables set by this module

| Variable | Description |
|----------|-------------|
| `--visible-height` | Actual visible viewport height in px (updates on keyboard open/close). |
| `--safe-top` | `env(safe-area-inset-top)` |
| `--safe-right` | `env(safe-area-inset-right)` |
| `--safe-bottom` | `env(safe-area-inset-bottom)` (set to `0` while keyboard is open) |
| `--safe-left` | `env(safe-area-inset-left)` |
