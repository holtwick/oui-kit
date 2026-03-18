# oui-notice

A prominent overlay containing a message, suitable e. g. for warning messages. It covers everything up to parent element with `position: relative`. If icon is used, it should be an SVG.

- `title?: string`
- `#default` Message
- `#title` Title (alternative to prop `title`)
- `#icon` SVG Icon

It is possible to set CSS variable `--notice-fg` for the icon color.

`--notice-bg` to set the background color.

```vue
<OuiNotice title="Warning" style="--notice-fg: red; --notice-bg: #ccc">
  <template #icon><OuiClose></template>
  You should not do that!
</OuiNotice>
```
