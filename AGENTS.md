# AGENTS.md

## Dev environment tips

- Use `pnpm install` to install dependencies.
- Run `pnpm build` to build the library (runs `vite build` with TypeScript compilation and bundling).
- Check `package.json` for available scripts.
- Read JSDoc comments in source files (`lib/**/*.ts`) for inline API documentation and usage examples.
- Read Markdown documentation files (e.g., `src/**/*.md`) for additional guides and examples.
- Run and examine demo files (`src/**/*.demo.vue`) to understand component usage and examples.
- Run and examine test specs (`lib/**/*.spec.ts`) to understand functionality, expected behavior, and integration patterns.
- Check `README.md` for project overview, architecture, and usage patterns.

## Testing instructions

- Run `pnpm test --run` to run all tests with Vitest.
- Run `pnpm test --coverage` to check test coverage.
- Run `pnpm lint` to check linting with ESLint.
- Run `pnpm lint:fix` to auto-fix linting issues.
- Fix any test or type errors until the whole suite is green.
- Add or update tests for the code you change, even if nobody asked.

## PR instructions

- Title format: [oui] <Title>
- Always run `pnpm lint:fix` and `pnpm test --run` before committing.

## Documentation maintenance

When adding, removing, or significantly changing components, composables, CSS variables, or theming:

- **Update [COMPONENTS.md](COMPONENTS.md)**: Keep the props tables, events, slots, and examples accurate.
- **Update [llms.txt](llms.txt)**: Keep the module overview and export lists in sync with `lib/lib.ts` and the module index files.
- **Update [stylus/README.md](stylus/README.md)**: If CSS variables or naming conventions change.

These files are the primary reference for AI assistants working in this project. Stale documentation is worse than no documentation.

### Key conventions to preserve

- CSS variable naming: `--[level]-[style]-[state]` (e.g. `--p1-fg`, `--input-border-hover`)
- Levels: `n0` = neutral, `p1` = primary, `s2` = secondary, `t3` = tertiary
- Dark mode: `.dark` class on `html` element – not `@media (prefers-color-scheme: dark)`
- CSS modifier classes: `_active` (underscore prefix), not `-active`
- Component CSS classes: `oui-[name]` and `oui-[name]-[part]`

## Adding a new component

### Files to create (in `lib/basic/`)

| File | Required | Description |
|------|----------|-------------|
| `oui-[name].vue` | yes | Vue 3 component with `<script lang="ts" setup>` |
| `oui-[name].styl` | yes | Stylus stylesheet |
| `oui-[name].md` | yes | Markdown docs (props, events, slots, example) |
| `oui-[name].demo.vue` | recommended | Interactive demo using `OuiDemo` wrapper |
| `oui-[name].spec.ts` | for complex logic | Vitest unit test |

### Registration checklist (4 places)

1. **`lib/basic/index.ts`** – add export (keep alphabetical order):

   ```ts
   export { default as OuiName } from './oui-name.vue'
   ```

2. **`lib/basic/index.styl`** – add style import (keep alphabetical order):

   ```styl
   @require "./oui-name.styl";
   ```

3. **`COMPONENTS.md`** – add entry to the table of contents and a section with props table, events, slots, and usage example.

4. **`llms.txt`** – two places:
   - Documentation Files list: `- [lib/basic/oui-name.md](...): OuiName details`
   - Module Overview Basic section: add component name to the correct category (Display, Form inputs, etc.)

`lib/lib.ts` does **not** need to be changed — it re-exports `./basic` wholesale.

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
  padding: rex(12);                   // rex() ≈ px, converts to rem
  border-radius: var(--input-radius, 4px);

  &._modifier { }    // modifiers use underscore prefix
  &-part { }         // sub-elements follow BEM-like naming
}

/* dark mode — always .dark selector, never @media prefers-color-scheme */
.dark .oui-[name] { }

/* transitions for Vue <Transition name="oui-[name]"> */
.oui-[name]-enter-active,
.oui-[name]-leave-active { transition: opacity 0.2s ease; }
.oui-[name]-enter-from,
.oui-[name]-leave-to { opacity: 0; }
```
