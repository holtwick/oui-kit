# AGENTS.md

Instructions for AI agents working in projects that **use** oui-kit as a dependency.

> For developing oui-kit itself, see [CLAUDE.md](CLAUDE.md).

## What is oui-kit?

A Vue 3 component library with a Stylus CSS framework. Import components from `oui-kit` and styles from `oui-kit/css` or Stylus presets.

## Finding documentation

- **[COMPONENTS.md](COMPONENTS.md)** - full component API reference (props, events, slots, examples)
- **[llms.txt](llms.txt)** - AI-optimized project overview, export lists, module structure
- **`lib/basic/oui-[name].md`** - per-component documentation with usage examples
- **`lib/basic/oui-[name].demo.vue`** - interactive demos showing real usage patterns

Read `COMPONENTS.md` or the per-component `.md` files before using a component. They contain props tables, slot descriptions, and code examples.

## Installation

```bash
pnpm add oui-kit
```

Some components require optional dependencies:

| Component              | Optional dependency                                                                                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OuiDay`, `OuiDayRange` | `v-calendar`                                                                                                                                                     |
| `OuiRichtext`          | `@tiptap/vue-3`, `@tiptap/pm`, `@tiptap/starter-kit`, `@tiptap/extension-underline`, `@tiptap/extension-placeholder`, `@tiptap/extension-mention`, `@tiptap/suggestion` |

## Basic usage

```ts
import { OuiButton, OuiInput, OuiCheckbox } from 'oui-kit'
import 'oui-kit/css'
```

Or use Stylus presets for more control:

```styl
@require "oui-kit/default-app"   // full app preset
@require "oui-kit/default-basic" // minimal preset
@require "oui-kit/theme"         // just CSS variables
```

## Key conventions to know

- **v-model**: Components use Vue 3 `defineModel()` - standard `v-model` binding works
- **CSS variables**: Theming via `--[level]-[style]-[state]` (e.g. `--p1-fg`, `--input-border-hover`)
- **Dark mode**: Add `.dark` class to `<html>` - never use `@media (prefers-color-scheme: dark)`
- **CSS classes**: Components use `oui-[name]` classes, modifiers use underscore prefix (`._active`, `._disabled`)
- **Strings/i18n**: User-visible strings go through `t('Fallback', 'oui.component.key')`

## Component patterns

### Form components

All form components support `title`, `description`, `required`, `disabled`, and `id` props via the shared `OuiFormItem` wrapper:

```vue
<OuiInput v-model="name" title="Name" description="Help text" required />
```

### Floating UI

Tooltips, menus, and popovers are built on `@floating-ui/vue`:

```vue
<OuiFloat placement="bottom" close>
  <template #click>
    <button>Open</button>
  </template>
  <div>Floating content</div>
</OuiFloat>
```

### Modals

Programmatic modals and dialogs:

```ts
import { ouiAlert, ouiConfirm } from 'oui-kit'

await ouiAlert('Something happened')
const ok = await ouiConfirm('Are you sure?')
```
