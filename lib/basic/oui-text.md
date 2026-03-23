# oui-text

A styled `<div>` wrapper that applies Oui's typography preset to its content. Use it around blocks of rich text (articles, descriptions, help texts) where you want headings, links, lists, and inline formatting to look consistent.

## Props

None. All content is passed via the default slot.

## Slots

| Slot | Description |
|------|-------------|
| `(default)` | Any HTML or Vue content. The following elements are styled automatically: headings (`h1`–`h6`), `b`, `u`, `i`, `a`, `ul`, `ol`, `li`, `pre`, `code`, `hr`. |

## Example

```vue
<OuiText>
  <h2>Getting started</h2>
  <p>This is a <b>bold</b> and <i>italic</i> paragraph with a <a href="#">link</a>.</p>
  <ul>
    <li>Item one</li>
    <li>Item two</li>
  </ul>
  <pre>const x = 42</pre>
</OuiText>
```

## Notes

- Applies CSS class `oui-text` — style it via that selector if you need overrides.
- Does **not** render markdown; pass already-rendered HTML or static Vue template content.
