# oui-dark

Toggle button that switches between light and dark mode using [VueUse `useDark`](https://vueuse.org/core/useDark/). Adds or removes the `.dark` class on the `<html>` element, which all Oui CSS variables respond to.

## Usage

```ts
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
```

```vue
<!-- Drop-in toggle button -->
<OuiDark />
```

## Avoid flash of wrong theme

Add this script to your `index.html` `<head>` to apply the correct class before Vue loads:

```html
<script>
  const theme = localStorage.getItem('vueuse-color-scheme')
  if (
    theme === 'dark' ||
    (theme !== 'light' && window.matchMedia?.('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  }
</script>
<style>
  .dark { background: black; color: white; }
</style>
```

## How dark mode works in Oui

Dark mode is controlled by the `.dark` class on the `<html>` element. All Oui CSS variables have `.dark` overrides:

```css
/* Light (default) */
:root { --fg: #0a0a0a; --bg: white; }

/* Dark */
.dark { --fg: var(--n0-50); --bg: var(--n0-950); }
```

Do **not** rely solely on `@media (prefers-color-scheme: dark)` — always use the `.dark` class so user choice overrides the system preference.
