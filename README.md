# 🎨 Oui Kit

🎯 *UI toolkit with a French touch* 🇫🇷

**Modern • Lightweight • TypeScript-first • Accessible**

[![npm version](https://img.shields.io/npm/v/oui-kit.svg)](https://www.npmjs.com/package/oui-kit)
[![license](https://img.shields.io/npm/l/oui-kit.svg)](https://github.com/holtwick/oui/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dm/oui-kit.svg)](https://www.npmjs.com/package/oui-kit)

[🚀 Get Started](#installation) • [📚 Documentation](https://oui.holtwick.de) • [🎮 Live Demo](https://oui.holtwick.de)

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

## 🚀 Quick Start

Get up and running in under 2 minutes!

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

// Import oui-kit styles
import 'oui-kit/css'

const app = createApp(App)
app.mount('#app')
```

### Your First Component

```vue
<script setup lang="ts">
import { OuiButton, OuiModal, useNotification } from 'oui-kit'
import { ref } from 'vue'

const showModal = ref(false)
const { notify } = useNotification()

function handleSuccess() {
  notify('🎉 Success! Your component is working!', 'success')
}

function handleInfo() {
  notify('ℹ️ This is an info message', 'info')
}
</script>

<template>
  <div class="demo-container">
    <h2>Welcome to Oui Kit!</h2>

    <div class="button-group">
      <OuiButton variant="primary" @click="handleSuccess">
        🎉 Show Success
      </OuiButton>

      <OuiButton variant="secondary" @click="handleInfo">
        ℹ️ Show Info
      </OuiButton>

      <OuiButton variant="outline" @click="showModal = true">
        📱 Open Modal
      </OuiButton>
    </div>

    <OuiModal v-model="showModal" title="🎨 Hello from Oui Kit!">
      <p>This modal demonstrates the power of Oui Kit components.</p>
      <p>Enjoy building beautiful Vue.js applications! 🚀</p>
    </OuiModal>
  </div>
</template>

<style lang="stylus">
@import 'oui-kit/stylus'

.demo-container
  padding: -spacing-lg
  max-width: 600px
  margin: 0 auto

.button-group
  display: flex
  gap: -spacing-md
  flex-wrap: wrap
  margin-top: -spacing-md
</style>
```

## 🧩 Available Components

### 🎨 UI Components

| Component | Description | Features |
|-----------|-------------|----------|
| **OuiButton** | Versatile button component | Multiple variants, sizes, loading states |
| **OuiModal** | Beautiful modal dialogs | Backdrop blur, animations, accessibility |
| **OuiNotification** | Toast notification system | Auto-dismiss, positions, custom styling |
| **OuiFloat** | Floating positioning | Tooltips, dropdowns, popovers |

### 🔧 Composables & Utilities

| Composable | Description | Use Case |
|------------|-------------|----------|
| **useNotification** | Reactive notification system | Show success/error messages |
| **useModal** | Modal state management | Programmatic modal control |
| **useFloat** | Floating element positioning | Tooltips, dropdowns, menus |

### Tree Shaking

```typescript
// Import only what you need
import * as OuiKit from 'oui-kit'
// Or import everything (not recommended for production)
import { OuiButton, OuiModal, useNotification } from 'oui-kit'
import { OuiButton } from 'oui-kit/button'
import { OuiModal } from 'oui-kit/modal'

import { useNotification } from 'oui-kit/notification'
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on:

- Code style and formatting
- Testing requirements
- Git workflow and commit conventions
- Development setup

## Browser Support

oui-kit supports all modern browsers:

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

MIT License - see [LICENSE](./LICENSE) file for details.

## Acknowledgments

Derives from this previous work:

- [twindy](https://github.com/holtwick/twindy)
- [twindy-headless](https://github.com/holtwick/twindy-headless)

## Support

- 📖 [Documentation](https://oui.holtwick.de)
- 🐛 [Issues](https://github.com/holtwick/oui/issues)
- 💬 [Discussions](https://github.com/holtwick/oui/discussions)
- ❤️ [Sponsor](https://github.com/sponsors/holtwick)
