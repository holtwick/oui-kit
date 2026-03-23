# oui-file

File upload input with drag-and-drop support. Stores the selected file as a data URI via `v-model`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Label text shown above the drop zone. |
| `titleChoose` | `string` | `undefined` | Text for the "choose file" button inside the drop zone. |
| `description` | `string` | `undefined` | Help text shown below the label. |
| `accept` | `string` | `'image/*'` | Accepted MIME types (passed to the file dialog and drop zone). |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `required` | `boolean` | `undefined` | Marks the field as required. |
| `id` | `string` | `undefined` | `id` attribute for the form element. |
| `openFileDialog` | `(options) => Promise<{dataUri, filename} \| undefined>` | `undefined` | Override the built-in file dialog with a custom one (e.g. a native bridge in Electron or Capacitor). |

## Models

| Model | Type | Description |
|-------|------|-------------|
| `modelValue` (`v-model`) | `string \| undefined` | The selected file as a base64 data URI. |
| `filename` (`v-model:filename`) | `string \| undefined` | The original filename of the selected file. |

## Slots

| Slot | Description |
|------|-------------|
| `(default)` | Custom icon or content displayed inside the drop zone. |

## Example

```vue
<OuiFile v-model="imageData" v-model:filename="imageName" title="Upload Image" accept="image/*">
  <svg>…</svg>
</OuiFile>

<!-- Custom file dialog (e.g. Capacitor / Electron) -->
<OuiFile
  v-model="fileData"
  :open-file-dialog="myNativeOpenDialog"
/>
```
