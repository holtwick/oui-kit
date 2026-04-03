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
- Fix any test or type errors until the whole suite is green
- Add or update tests for the code you change, even if nobody asked

## Dev environment tips

- Read JSDoc comments in source files (`lib/**/*.ts`) for inline API documentation
- Run and examine demo files (`lib/basic/*.demo.vue`) to understand component usage
- Run and examine test specs (`lib/**/*.spec.ts`) to understand expected behavior

## Adding a New Component

### Files to create (in `lib/basic/`)

| File | Required | Description |
|------|----------|-------------|
| `oui-[name].vue` | yes | Vue 3 component with `<script lang="ts" setup>` |
| `oui-[name].styl` | yes | Stylus stylesheet |
| `oui-[name].md` | yes | Markdown docs (props, events, slots, example) |
| `oui-[name].demo.vue` | recommended | Interactive demo using `OuiDemo` wrapper |
| `oui-[name].spec.ts` | for complex logic | Vitest unit test |

### Registration checklist (4 places)

1. **`lib/basic/index.ts`** - add export (keep alphabetical order):

   ```ts
   export { default as OuiName } from './oui-name.vue'
   ```

2. **`lib/basic/index.styl`** - add style import (keep alphabetical order):

   ```styl
   @require "./oui-name.styl";
   ```

3. **`COMPONENTS.md`** - add entry to the table of contents and a section with props table, events, slots, and usage example.

4. **`llms.txt`** - two places:
   - Documentation Files list: `- [lib/basic/oui-name.md](...): OuiName details`
   - Module Overview Basic section: add component name to the correct category

`lib/lib.ts` does **not** need changes - it re-exports `./basic` wholesale.

### Vue component pattern

```vue
<script lang="ts" setup>
import { tt } from './i18n'        // for user-visible strings
import './oui-[name].styl'         // import stylesheet directly

defineProps<{
  mode?: 'info' | 'warn' | 'error'
  title?: string
}>()

const emit = defineEmits<{ close: [] }>()
const show = defineModel<boolean>({ default: true })
</script>
```

### Stylus pattern

```styl
@require "../../stylus/index.styl";   // always first line

.oui-[name] {
  padding: rex(12);                   // rex() converts to rem
  border-radius: var(--input-radius, 4px);

  &._modifier { }    // modifiers use underscore prefix
  &-part { }         // sub-elements follow BEM-like naming
}

.dark .oui-[name] { }  // dark mode: always .dark selector
```

## Documentation maintenance

When adding, removing, or significantly changing components, composables, CSS variables, or theming:

- **Update [COMPONENTS.md](COMPONENTS.md)**: Keep the props tables, events, slots, and examples accurate.
- **Update [llms.txt](llms.txt)**: Keep the module overview and export lists in sync with `lib/lib.ts` and the module index files.
- **Update [stylus/README.md](stylus/README.md)**: If CSS variables or naming conventions change.

These files are the primary reference for AI assistants working in this project. Stale documentation is worse than no documentation.

## Git Conventions

- Commit messages: lowercase, prefixed with `feat:`, `fix:`, or `chore:`
- Dependency-only changes: `chore: updated dependencies`
- Run `pnpm lint:fix && pnpm test -- --run` before committing

## Key Documentation Files

- **`COMPONENTS.md`** — full component API reference (props, events, slots)
- **`llms.txt`** — AI-optimized project overview and export lists
- **`AGENTS.md`** — instructions for AI agents using oui-kit as a dependency
- **`CONTRIBUTING.md`** — development guidelines
- **`.github/copilot-instructions.md`** — coding standards

Keep `COMPONENTS.md` and `llms.txt` in sync when changing components.

## Behavior Rules

### Output style

- Answer first, reasoning after. No preamble, no hollow closings, no restating the prompt.
- Execute immediately. Do not explain what you are about to do.
- Structured output (bullets, tables, code blocks). Prose only when requested.
- Compress responses. Every sentence must earn its place.

### Code

- Simplest working solution. No over-engineering, no speculative features.
- No abstractions for single-use operations. Three similar lines > premature abstraction.
- No error handling for impossible scenarios.
- Read the file before modifying it. Never edit blind.
- No docstrings, comments, or type annotations on unchanged code.
- Do not add features, refactor surrounding code, or create files beyond what was asked.

### Accuracy

- Never speculate about code, files, or APIs without reading them first.
- If unsure: say "I don't know." Never guess confidently.
- Never invent file paths, function names, or API signatures.
- Accept user corrections as ground truth for the session.

### Reviews and debugging

- State the bug. Show the fix. Stop. No compliments, no extra suggestions.
- If cause is unclear: say so. Do not guess.

### Tone

- No sycophancy. No "Great question!", "Sure!", "Absolutely!".
- No safety disclaimers unless genuine life-safety or legal risk.
- No "Note that...", "As an AI..." framing.
- Disagree when wrong. Do not change a correct answer under pushback.
- Learn corrections silently. Apply without re-announcing.

### Typography

- Hyphens instead of em dashes. Straight quotes only. Three dots instead of ellipsis character.
- No Unicode bullets, no non-breaking spaces. Code must be copy-paste safe.

## Override Rule

User instructions always override this file.
