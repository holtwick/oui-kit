# oui-richtext

A rich text editor component based on [TipTap](https://tiptap.dev/). It uses the external TipTap packages as optional dependencies. Make sure to add them to your app's `package.json`:

```bash
pnpm add @tiptap/vue-3 @tiptap/pm @tiptap/starter-kit @tiptap/extension-underline @tiptap/extension-placeholder @tiptap/extension-mention @tiptap/suggestion
```

The component looks and behaves like `OuiTextarea` with autosize. It provides inline formatting (Bold, Italic, Underline) via a floating toolbar that appears when text is selected. Placeholders can be inserted by typing `@` which opens a suggestion dropdown.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Label displayed above the editor. |
| `description` | `string` | `undefined` | Help text displayed below the label. |
| `required` | `boolean` | `false` | Whether the field is required. |
| `id` | `string` | `undefined` | The ID attribute for the form item. |
| `disabled` | `boolean` | `false` | Disables the editor. |
| `placeholder` | `string` | `undefined` | Placeholder text shown when the editor is empty. |
| `mentions` | `string[]` | `undefined` | List of available mention/placeholder names for the `@` suggestion dropdown. |
| `bordered` | `boolean` | `true` | Show the standard input border (same as OuiInput/OuiTextarea). Set to `false` for custom styling. |
| `allowCustomMentions` | `boolean` | `true` | Allow typing custom mentions not in the `mentions` list. A "+ name" option appears in the dropdown. Set to `false` to restrict to predefined mentions only. |
| `blocks` | `boolean` | `false` | Enable block-level formatting: headings (H1-H3), bullet/ordered lists, blockquote, code block, horizontal rule. When `false`, only inline styles (bold, italic, underline) are available. Changing this prop requires re-mounting the component (use `:key`). |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `mention` | `string` | Emitted when a custom mention is created (the new name). Use this to update the `mentions` list. |

## Models

| Model | Type | Description |
|-------|------|-------------|
| `modelValue` | `string` | HTML string of the editor content (v-model). |

## Slots

| Slot | Description |
|------|-------------|
| `title` | Custom title content, overrides the `title` prop. |
| `description` | Custom description content, overrides the `description` prop. |

## Features

### Floating Toolbar

Select text to reveal a floating toolbar with Bold, Italic, and Underline buttons. The toolbar is positioned via `@floating-ui/vue` and disappears when the selection is cleared.

### Mentions / Placeholders

Type `@` to open a dropdown with available placeholders. Navigate with arrow keys and confirm with Enter. The list is filtered as you type. Mentions are rendered as inline tags in the editor.

If `allowCustomMentions` is `true` (default), typing a name that is not in the list shows a "+ name" option at the bottom. Selecting it creates the mention and emits the `mention` event so the parent can update the list.

The generated HTML for a mention looks like:

```html
<span data-type="mention" class="oui-richtext-mention" data-id="Vorname">@Vorname</span>
```

## Example

```vue
<script setup>
import { ref } from 'vue'
import { OuiRichtext } from 'oui-kit'

const html = ref('<p>Hello <strong>World</strong></p>')
const mentions = ['Vorname', 'Nachname', 'Email', 'Firma', 'Anrede']
</script>

<template>
  <OuiRichtext
    v-model="html"
    title="Nachricht"
    description="Markiere Text fuer Formatierung. Tippe @ fuer Platzhalter."
    placeholder="Schreibe etwas..."
    :mentions="mentions"
  />
</template>
```

### Without border

```vue
<OuiRichtext
  v-model="html"
  :bordered="false"
  :mentions="mentions"
/>
```

### With block formatting

```vue
<OuiRichtext
  v-model="html"
  blocks
  :mentions="mentions"
/>
```

Markdown shortcuts: `# `, `## `, `### ` for headings, `- ` or `* ` for bullet lists, `1. ` for ordered lists, `> ` for blockquote, `` ``` `` for code block, `---` for horizontal rule.

### Disabled

```vue
<OuiRichtext
  v-model="html"
  disabled
  title="Nur lesen"
/>
```
