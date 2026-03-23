# 🎨 Oui Kit

🎯 *UI toolkit with a French touch* 🇫🇷

**Modern • Lightweight • TypeScript-first • Accessible**

[![npm version](https://img.shields.io/npm/v/oui-kit.svg)](https://www.npmjs.com/package/oui-kit)
[![license](https://img.shields.io/npm/l/oui-kit.svg)](https://github.com/holtwick/oui/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dm/oui-kit.svg)](https://www.npmjs.com/package/oui-kit)

[🚀 Get Started](#installation) • [📚 Documentation](https://oui.holtwick.de) • [🎮 Live Demo](https://oui.holtwick.de) • [📖 Component Reference](./COMPONENTS.md)

## ✨ Why Oui Kit?

- 🎯 **Vue 3 Native** - Built from the ground up for Vue 3 Composition API
- 🎨 **Stylus Powered** - Flexible theming system with Stylus CSS
- 📦 **Tree Shakeable** - Import only what you need
- 🔧 **TypeScript First** - Full TypeScript support out of the box
- ♿ **Accessible** - WCAG compliant components
- 🪶 **Lightweight** - Minimal bundle size impact
- 🎛️ **Customizable** - Easy to theme and extend

---

🎮 **Try it live:** <https://oui.holtwick.de>

📱 **Scan QR code for mobile demo:**

<img src="./qrcode.png" alt="QR Code to demo website" style="max-width: 20rem">

## 🚀 Installation

```bash
npm install oui-kit
# or
pnpm add oui-kit
# or
yarn add oui-kit
```

## 🎯 Usage

### Basic Setup

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

import 'oui-kit/css'

const app = createApp(App)
app.mount('#app')
```

### Your First Component

```vue
<script setup lang="ts">
import { emitNotificationInfo, OuiButton, OuiModal } from 'oui-kit'
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <div>
    <OuiButton mode="primary" @click="emitNotificationInfo('Success', 'It works!')">
      Show Notification
    </OuiButton>

    <OuiButton mode="outline" @click="showModal = true">
      Open Modal
    </OuiButton>

    <OuiModal v-model="showModal" title="Hello from Oui Kit!" close>
      <p>This modal demonstrates the power of Oui Kit components.</p>
    </OuiModal>
  </div>
</template>

<style lang="stylus">
@import 'oui-kit/stylus'
</style>
```

### Notifications

Add the activator once in your app root, then emit notifications from anywhere:

```vue
<!-- App.vue -->
<OuiNotificationActivator />
```

```ts
import { emitNotificationInfo, emitNotificationWarn, emitNotificationError } from 'oui-kit'

emitNotificationInfo('Saved', 'Your changes have been saved.')
emitNotificationWarn('Low storage', 'Less than 10% remaining.')
emitNotificationError('Upload failed', 'Please try again.')
```

## 🧩 Available Components

See [COMPONENTS.md](./COMPONENTS.md) for the full API reference including props, events, slots, and examples.

### Form Inputs
`OuiButton` · `OuiInput` · `OuiInputNumber` · `OuiInputColor` · `OuiInputGroup` · `OuiTextarea` · `OuiPassword` · `OuiCheckbox` · `OuiSelect` · `OuiCombobox` · `OuiSegmented` · `OuiFile` · `OuiDate` · `OuiDatetime` · `OuiDay` · `OuiDayRange` · `OuiStars` · `OuiSlidingPill`

### Display
`OuiCard` · `OuiText` · `OuiNotice` · `OuiSeparator` · `OuiItems` · `OuiTable` · `OuiTableview` · `OuiVirtualList` · `OuiLog` · `OuiQrcode` · `OuiWait`

### Layout
`OuiStackX` · `OuiStackY` · `OuiSpace`

### Overlay & Float
`OuiFloat` · `OuiMenu` · `OuiTooltipActivator`

### Modal & Dialog
`OuiModal` · `OuiDialog` · `ouiAlert()` · `ouiConfirm()` · `ouiPrompt()`

### Notification
`OuiNotificationActivator` · `emitNotificationInfo()` · `emitNotificationWarn()` · `emitNotificationError()`

### Utilities
`OuiDark` · `OuiObject` · `OuiMobileActivator` · `OuiResizeable` · `OuiDraggable`

## 🎨 Theming

Oui uses CSS custom properties with a structured naming scheme: `--[level]-[style]-[state]`.

```css
:root {
  /* Override the primary colour palette */
  --p1-500: #e85d04;
  --p1-400: #f48c06;
  --p1-600: #dc2f02;
}
```

Dark mode is activated via the `.dark` class on `<html>` (not via `@media`):

```ts
import { useDark } from '@vueuse/core'
const isDark = useDark() // automatically toggles .dark on <html>
```

See [COMPONENTS.md – Theming](./COMPONENTS.md#theming--css-variables) for the full variable reference.

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Scripts

```bash
pnpm install       # install dependencies
pnpm dev           # start dev server
pnpm build         # build library
pnpm test --run    # run tests
pnpm lint          # lint
pnpm lint:fix      # auto-fix lint issues
```

### Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## Browser Support

Chrome 88+ · Firefox 85+ · Safari 14+ · Edge 88+

## License

MIT – see [LICENSE](./LICENSE) for details.

## Acknowledgments

Derives from previous work:

- [twindy](https://github.com/holtwick/twindy)
- [twindy-headless](https://github.com/holtwick/twindy-headless)

## Support

- 📖 [Documentation](https://oui.holtwick.de)
- 📖 [Component Reference](./COMPONENTS.md)
- 🐛 [Issues](https://github.com/holtwick/oui/issues)
- 💬 [Discussions](https://github.com/holtwick/oui/discussions)
- ❤️ [Sponsor](https://github.com/sponsors/holtwick)
