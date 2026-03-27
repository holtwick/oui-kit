# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**oui-kit** is a Vue 3 component library with a Stylus CSS framework. Three products live here:

1. **Vue 3 component library** — source in `lib/`
2. **Stylus CSS framework** — source in `stylus/`
3. **Demo application** — source in `src/`

## Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Dev server with demo app (port 5173)
pnpm dev:e2e              # E2E dev server (port 5174)
pnpm build                # Build library to dist/
pnpm build:demo           # Build demo to www/

pnpm lint                 # ESLint check
pnpm lint:fix             # ESLint auto-fix
pnpm check                # TypeScript type check (vue-tsc --noEmit)

pnpm test                 # Vitest unit tests (watch mode)
pnpm test -- --run        # Vitest single run
pnpm test:e2e             # Playwright E2E tests
pnpm test:e2e:update      # Update visual regression baselines

pnpm test:release         # Full pre-release: lint:fix → check → vitest → e2e
```

## Architecture

### Library (`lib/`)

- **`lib/lib.ts`** — main export; re-exports all modules
- **`lib/basic/`** — form inputs, display components, utilities (~30 components)
- **`lib/float/`** — floating UI (tooltips, menus) via `@floating-ui/vue`
- **`lib/layout/`** — `OuiStackX`, `OuiStackY`, `OuiSpace`
- **`lib/modal/`** — modals, dialogs, programmatic APIs (`ouiAlert()`, `ouiConfirm()`)
- **`lib/notification/`** — toast notifications (`emitNotification*()`)
- **`lib/basic/index.ts`** and **`lib/basic/index.styl`** — component registration points

### Stylus Framework (`stylus/`)

- **`stylus/theme.styl`** — CSS variable definitions + dark mode (`.dark` class)
- **`stylus/mixins/`** — reusable functions (`rex()` for px→rem, layout helpers)
- **`stylus/preset/`** — CSS resets and base styles
- **`stylus/default-basic.styl`** / **`default-app.styl`** / **`default-page.styl`** — theme presets

### Build System (Vite)

- `BUILD_LIB=1` → library build (ES module to `dist/`, externalizes vue/vueuse/zeed)
- Default → demo app build (to `www/`)
- `vite-plugin-dts` generates `.d.ts` files for library build

### Path Alias

`@/*` → `./lib/*` (configured in tsconfig.json and vite)

## Coding Conventions

### Vue Components

- Always `<script lang="ts" setup>` — never Options API
- v-model via `defineModel<T>()`
- Collocated `.styl` file imported directly in component

### CSS / Stylus

- Component classes: `oui-[name]`, subparts: `oui-[name]-[part]`
- Modifier classes use **underscore prefix**: `._active`, `._disabled` (not dashes)
- CSS variables: `--[level]-[style]-[state]` (levels: `n0`=neutral, `p1`=primary, `s2`=secondary, `t3`=tertiary)
- Dark mode: `.dark` class on `<html>` — never `@media (prefers-color-scheme: dark)`
- Use `rex(16)` for px→rem conversion, `@require "../../stylus/index.styl"` as first line

### Strings / i18n

- Visible strings in `t('Fallback', 'oui.component.key')` or `tt(...)` — import from `@/basic/i18n`

### Logging

```ts
import { Logger, LoggerInterface } from 'zeed'
const log: LoggerInterface = Logger('filename-without-suffix')
```

### JSX Files (`.tsx`)

- Start with `/** @jsx h */`, import `h` from `zeed-dom`, add `const _ = h` to prevent tree-shaking

### Linting

- Don't manually fix import order or lint issues — ESLint auto-fixes on commit
- `@antfu/eslint-config` with `zeed/eslint` defaults

## Testing

- **Unit tests**: `*.spec.ts` collocated with source, run with Vitest (jsdom)
- **Browser-only tests**: `*.browser.spec.ts`
- **E2E tests**: `tests/e2e/*.e2e.spec.ts` + `lib/**/*.e2e.ts`, run with Playwright
- **Demos**: `src/*.demo.vue` — auto-loaded sandbox for visual testing

## Adding a New Component

Create files in `lib/basic/`: `oui-[name].vue`, `oui-[name].styl`, `oui-[name].md`, optionally `oui-[name].demo.vue` and `oui-[name].spec.ts`.

Register in 4 places:

1. `lib/basic/index.ts` — add export (alphabetical)
2. `lib/basic/index.styl` — add `@require` (alphabetical)
3. `COMPONENTS.md` — add documentation section
4. `llms.txt` — add to docs list and module overview

`lib/lib.ts` does **not** need changes — it re-exports `./basic` wholesale.

## Git Conventions

- Commit messages: lowercase, prefixed with `feat:`, `fix:`, or `chore:`
- Dependency-only changes: `chore: updated dependencies`
- PR title format: `[oui] <Title>`
- Run `pnpm lint:fix && pnpm test -- --run` before committing

## Key Documentation Files

- **`COMPONENTS.md`** — full component API reference (props, events, slots)
- **`llms.txt`** — AI-optimized project overview and export lists
- **`AGENTS.md`** — agent/AI development instructions
- **`CONTRIBUTING.md`** — development guidelines
- **`.github/copilot-instructions.md`** — coding standards

Keep `COMPONENTS.md` and `llms.txt` in sync when changing components.
