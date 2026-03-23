# Oui Kit – Component Reference

Complete API reference for all components in [oui-kit](https://www.npmjs.com/package/oui-kit).

```ts
import { ComponentName } from 'oui-kit'
import 'oui-kit/css'
```

---

## Table of Contents

- [Form Inputs](#form-inputs)
  - [OuiButton](#ouibutton)
  - [OuiInput](#ouiinput)
  - [OuiInputNumber](#ouiinputnumber)
  - [OuiInputColor](#ouiinputcolor)
  - [OuiInputGroup](#ouiinputgroup)
  - [OuiTextarea](#ouitextarea)
  - [OuiPassword](#ouipassword)
  - [OuiCheckbox](#ouicheckbox)
  - [OuiSelect](#ouiselect)
  - [OuiCombobox](#ouicombobox)
  - [OuiSegmented](#ouisegmented)
  - [OuiFile](#ouifile)
  - [OuiDate / OuiDatetime](#ouidate--ouidatetime)
  - [OuiDay / OuiDayRange](#ouiday--ouidayrange)
  - [OuiStars](#ouistars)
  - [OuiSlidingPill](#ouislidingpill)
- [Display](#display)
  - [OuiCard](#ouicard)
  - [OuiText](#ouitext)
  - [OuiNotice](#ouinotice)
  - [OuiSeparator](#ouiseparator)
  - [OuiItems](#ouiitems)
  - [OuiTable](#ouitable)
  - [OuiTableview](#ouitableview)
  - [OuiVirtualList](#ouivirtuallist)
  - [OuiLog](#ouilog)
  - [OuiQrcode](#ouiqrcode)
  - [OuiWait](#ouiwait)
- [Layout](#layout)
  - [OuiStackX / OuiStackY](#ouistackx--ouistacky)
  - [OuiSpace](#ouispace)
- [Overlay & Float](#overlay--float)
  - [OuiFloat](#ouifloat)
  - [OuiMenu](#ouimenu)
  - [OuiTooltipActivator](#ouitooltipactivator)
- [Modal & Dialog](#modal--dialog)
  - [OuiModal](#ouimodal)
  - [OuiDialog](#ouidialog)
  - [Programmatic Dialogs](#programmatic-dialogs)
- [Notification](#notification)
- [Mobile](#mobile)
- [Utilities](#utilities)
  - [OuiDark](#ouidark)
  - [OuiObject](#ouiobject)

---

## Form Inputs

### OuiButton

A versatile button component that renders as `<button>` or `<a>` depending on props.

```ts
import { OuiButton } from 'oui-kit'
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | – | Button label text |
| `mode` | `'primary' \| 'danger' \| 'neutral' \| 'success' \| 'ghost' \| 'outline'` | `'neutral'` | Visual variant |
| `size` | `'small' \| 'normal' \| 'large'` | `'normal'` | Size variant |
| `disabled` | `boolean` | `false` | Disables interaction |
| `href` | `string` | – | Renders as `<a>` link when set |
| `target` | `string` | `'_blank'` | Link target (used with `href`) |
| `outline` | `boolean` | `false` | Outline style |
| `dropdown` | `boolean` | `false` | Shows a dropdown indicator arrow |
| `focusable` | `boolean` | `true` | Whether the button is focusable |

**Slots:** `default` – button content (falls back to `title` prop)

**Example**

```vue
<OuiButton title="Save" mode="primary" @click="save" />
<OuiButton title="Delete" mode="danger" :disabled="loading" />
<OuiButton href="https://example.com" title="Visit" />
```

---

### OuiInput

Text input with optional label, description, formatting, and validation.

```ts
import { OuiInput } from 'oui-kit'
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| null \| undefined` | – | v-model value |
| `title` | `string` | – | Label text |
| `description` | `string` | – | Help text below input |
| `type` | `InputTypeHTMLAttribute` | `'text'` | Input type (text, email, url, …) |
| `required` | `boolean` | – | Marks field as required |
| `disabled` | `boolean` | – | Disables the input |
| `clearable` | `boolean` | `false` | Shows a clear button |
| `lazy` | `boolean` | `false` | Debounces updates |
| `lazyDelay` | `number` | `5000` | Debounce delay in ms |
| `formatter` | `(value: string) => string` | – | Transforms the value on input |
| `validator` | `(value: string) => boolean` | – | Validates and marks invalid state |
| `id` | `string` | – | Input element id |

**Events:** `update:modelValue`

**Example**

```vue
<OuiInput v-model="name" title="Name" required />
<OuiInput v-model="email" title="Email" type="email" clearable />
<OuiInput v-model="slug" :formatter="v => v.toLowerCase().replace(/\s/g, '-')" />
```

---

### OuiInputNumber

Numeric input with increment/decrement controls.

```ts
import { OuiInputNumber } from 'oui-kit'
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number \| null` | – | v-model value |
| `title` | `string` | – | Label text |
| `min` | `number` | – | Minimum value |
| `max` | `number` | – | Maximum value |
| `step` | `number` | `1` | Increment step |
| `disabled` | `boolean` | – | Disables the input |

**Example**

```vue
<OuiInputNumber v-model="count" title="Quantity" :min="1" :max="99" />
```

---

### OuiInputColor

Color picker input.

```ts
import { OuiInputColor } from 'oui-kit'
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | – | v-model color value (hex) |
| `title` | `string` | – | Label text |

**Example**

```vue
<OuiInputColor v-model="brandColor" title="Brand Color" />
```

---

### OuiInputGroup

Groups multiple inputs visually together.

```ts
import { OuiInputGroup } from 'oui-kit'
```

**Slots:** `default` – input components to group

**Example**

```vue
<OuiInputGroup>
  <OuiInput v-model="firstName" title="First Name" />
  <OuiInput v-model="lastName" title="Last Name" />
</OuiInputGroup>
```

---

### OuiTextarea

Multi-line text input.

```ts
import { OuiTextarea } from 'oui-kit'
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | – | v-model value |
| `title` | `string` | – | Label text |
| `description` | `string` | – | Help text |
| `rows` | `number` | – | Visible row count |
| `disabled` | `boolean` | – | Disables the textarea |

**Example**

```vue
<OuiTextarea v-model="notes" title="Notes" :rows="5" />
```

---

### OuiPassword

Password input with show/hide toggle and strength meter.

```ts
import { OuiPassword } from 'oui-kit'
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | – | v-model value |
| `title` | `string` | – | Label text |
| `showMeter` | `boolean` | – | Show password strength meter |

**Example**

```vue
<OuiPassword v-model="password" title="Password" show-meter />
```

---

### OuiCheckbox

Checkbox or toggle switch with optional label and description.

```ts
import { OuiCheckbox } from 'oui-kit'
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | – | v-model value |
| `title` | `string` | – | Label text |
| `description` | `string` | – | Help text below label |
| `switch` | `boolean` | `false` | Render as toggle switch |
| `intermediate` | `boolean` | `false` | Indeterminate state |

**Slots:** `default` – label content (falls back to `title`), `description`

**Example**

```vue
<OuiCheckbox v-model="agreed" title="I agree to the terms" />
<OuiCheckbox v-model="darkMode" title="Dark Mode" switch />
```

---

### OuiSelect

Dropdown select with support for segmented buttons and button-triggered modes.

```ts
import { OuiSelect } from 'oui-kit'
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number` | – | v-model selected value |
| `options` | `[value, label][] \| string[]` | – | Options array |
| `title` | `string` | – | Label text |
| `description` | `string` | – | Help text |
| `required` | `boolean` | – | Required field |
| `button` | `string` | – | Renders as button-triggered select with this label |
| `segmented` | `boolean` | – | Renders options as segmented button group |

**Slots:** `title`, `description`, `button`, `default` (option elements)

**Example**

```vue
<OuiSelect v-model="lang" title="Language" :options="[['en', 'English'], ['de', 'Deutsch']]" />
<OuiSelect v-model="view" :options="['list', 'grid']" segmented />
```

---

### OuiCombobox

Searchable select with autocomplete. Uses `OuiSelectItem` for option data.

```ts
import { OuiCombobox } from 'oui-kit'
// Type: OuiSelectItem { id, title, search?, action?, skipSelection?, class? }
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number` | – | v-model selected id |
| `items` | `OuiSelectItem[]` | – | Available options |
| `title` | `string` | – | Label text |
| `placeholder` | `string` | – | Search placeholder |

**Example**

```vue
<OuiCombobox v-model="userId" :items="users" title="User" placeholder="Search..." />
```

---

### OuiSegmented

Segmented control (button group for selecting one of multiple values).

```ts
import { OuiSegmented } from 'oui-kit'
// Type: OuiSegmentedOption<K> { value, title?, icon?, sliderClass? }
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `any` | – | v-model selected value |
| `options` | `OuiSegmentedOption[]` | – | Segment options |

**Example**

```vue
<OuiSegmented v-model="view" :options="[{value:'list',title:'List'},{value:'grid',title:'Grid'}]" />
```

---

### OuiFile

File upload input with drag-and-drop support.

```ts
import { OuiFile } from 'oui-kit'
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `File \| null` | – | v-model selected file |
| `title` | `string` | – | Label text |
| `accept` | `string` | – | Accepted MIME types |
| `multiple` | `boolean` | – | Allow multiple files |

---

### OuiDate / OuiDatetime

Date and datetime inputs.

```ts
import { OuiDate, OuiDatetime } from 'oui-kit'
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | – | v-model ISO date string |
| `title` | `string` | – | Label text |
| `disabled` | `boolean` | – | Disables the input |

**Example**

```vue
<OuiDate v-model="birthday" title="Birthday" />
<OuiDatetime v-model="scheduledAt" title="Scheduled At" />
```

---

### OuiDay / OuiDayRange

Calendar day picker and day-range picker.

```ts
import { OuiDay, OuiDayRange } from 'oui-kit'
```

**OuiDay Props**

| Prop | Type | Description |
|------|------|-------------|
| `modelValue` | `string` | Selected ISO date (YYYY-MM-DD) |
| `disabledDates` | `string[]` | Dates to disable |

**OuiDayRange Props**

| Prop | Type | Description |
|------|------|-------------|
| `modelValue` | `[string, string]` | [start, end] ISO date pair |

---

### OuiStars

Star rating input (1–5).

```ts
import { OuiStars } from 'oui-kit'
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number` | – | Rating value (1–5) |
| `readonly` | `boolean` | `false` | Display only, no interaction |

**Example**

```vue
<OuiStars v-model="rating" />
<OuiStars :modelValue="4.5" readonly />
```

---

### OuiSlidingPill

Sliding pill selector (visual range or option selector).

```ts
import { OuiSlidingPill } from 'oui-kit'
```

---

## Display

### OuiCard

Container with a card style (border, shadow, padding).

```ts
import { OuiCard } from 'oui-kit'
```

**Slots:** `default` – card content

**Example**

```vue
<OuiCard>
  <p>Card content here</p>
</OuiCard>
```

---

### OuiText

Formatted text display with support for markdown-like styling and truncation.

```ts
import { OuiText } from 'oui-kit'
```

See [lib/basic/oui-text.md](lib/basic/oui-text.md) for full docs.

---

### OuiNotice

Inline notice/alert box for info, warning, or error messages.

```ts
import { OuiNotice } from 'oui-kit'
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'info' \| 'warn' \| 'error' \| 'success'` | `'info'` | Visual variant |
| `title` | `string` | – | Notice title |
| `message` | `string` | – | Notice body text |

**Slots:** `default` – custom content

**Example**

```vue
<OuiNotice mode="warn" title="Warning" message="This action cannot be undone." />
```

---

### OuiSeparator

Visual horizontal divider.

```ts
import { OuiSeparator } from 'oui-kit'
```

**Example**

```vue
<OuiSeparator />
```

---

### OuiItems

Renders a list of items with consistent spacing and optional interactivity.

```ts
import { OuiItems } from 'oui-kit'
```

---

### OuiTable

Data table with sortable columns.

```ts
import { OuiTable } from 'oui-kit'
// Type: OuiTableColumn<K> { name, title?, sortable?, align?, width?, grow?, … }
```

**Props**

| Prop | Type | Description |
|------|------|-------------|
| `columns` | `OuiTableColumn[]` | Column definitions |
| `rows` | `any[]` | Row data |

**Example**

```vue
<OuiTable
  :columns="[{ name: 'name', title: 'Name', sortable: true }, { name: 'email', title: 'Email' }]"
  :rows="users"
/>
```

---

### OuiTableview

Advanced table view with selection and actions. See [lib/basic/oui-tableview.md](lib/basic/oui-tableview.md).

---

### OuiVirtualList

Virtualized list for rendering large datasets efficiently.

```ts
import { OuiVirtualList } from 'oui-kit'
```

See [lib/basic/oui-virtual-list.md](lib/basic/oui-virtual-list.md).

---

### OuiLog

Scrollable log output component. See [lib/basic/oui-log.md](lib/basic/oui-log.md).

---

### OuiQrcode

Generates and displays a QR code image.

```ts
import { OuiQrcode } from 'oui-kit'
```

**Props**

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | The data to encode |
| `size` | `number` | Size in pixels |

**Example**

```vue
<OuiQrcode value="https://oui.holtwick.de" :size="200" />
```

---

### OuiWait

Loading spinner / skeleton placeholder.

```ts
import { OuiWait } from 'oui-kit'
```

**Example**

```vue
<OuiWait v-if="loading" />
```

---

## Layout

### OuiStackX / OuiStackY

Flexbox row and column layout helpers.

```ts
import { OuiStackX, OuiStackY } from 'oui-kit'
```

**Props**

| Prop | Type | Description |
|------|------|-------------|
| `gap` | `string \| number` | Space between items. Numbers are converted: 16 → `1rem` |

**Example**

```vue
<!-- Horizontal row with gap -->
<OuiStackX :gap="8">
  <OuiButton title="Cancel" />
  <OuiButton title="Save" mode="primary" />
</OuiStackX>

<!-- Vertical column -->
<OuiStackY :gap="16">
  <OuiInput v-model="name" title="Name" />
  <OuiInput v-model="email" title="Email" />
</OuiStackY>
```

---

### OuiSpace

Flexible space filler (`flex: auto`) that pushes adjacent elements apart.

```ts
import { OuiSpace } from 'oui-kit'
```

**Example**

```vue
<OuiStackX>
  <OuiButton title="Back" />
  <OuiSpace />
  <OuiButton title="Next" mode="primary" />
</OuiStackX>
```

---

## Overlay & Float

### OuiFloat

Floating UI element (tooltip, popover, context menu) built on `@floating-ui/vue`.

```ts
import { OuiFloat } from 'oui-kit'
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `reference` | `Ref<HTMLElement>` | – | Target element to float against |
| `placement` | `Placement` | `'bottom'` | Floating UI placement string |
| `arrow` | `boolean` | `false` | Show arrow pointing to reference |
| `offset` | `OffsetOptions` | – | Distance from reference element |
| `hover` | `boolean` | `false` | Show on hover |
| `close` | `boolean` | `false` | Show close button |
| `delayEnter` | `number` | – | Hover show delay in ms |
| `delayLeave` | `number` | – | Hover hide delay in ms |
| `transition` | `string` | – | Vue transition name |

**Events:** `close`, `dblclick`

**Slots:** `default` – floating content, `trigger` – trigger element, `click` – click trigger, `hover` – hover trigger

See [lib/float/oui-float.md](lib/float/oui-float.md) for full docs.

---

### OuiMenu

Context menu component.

```ts
import { OuiMenu, useMenu, useMenuWithValue } from 'oui-kit'
// Type: OuiMenuItem { title, action?, icon?, disabled?, children? }
```

**Example**

```vue
<OuiMenu :items="[{ title: 'Edit', action: onEdit }, { title: 'Delete', action: onDelete }]" />
```

---

### OuiTooltipActivator

Wraps any element and shows a tooltip on hover.

```ts
import { OuiTooltipActivator } from 'oui-kit'
```

**Props**

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Tooltip text |
| `placement` | `Placement` | Tooltip position |

**Example**

```vue
<OuiTooltipActivator title="Click to save">
  <OuiButton title="Save" />
</OuiTooltipActivator>
```

---

## Modal & Dialog

### OuiModal

Modal dialog with overlay, ESC-close, focus trap, and mobile bottom-sheet support.

```ts
import { OuiModal } from 'oui-kit'
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | – | v-model visibility |
| `title` | `string` | – | Modal header title |
| `size` | `'small' \| 'normal' \| 'large' \| 'max'` | `'normal'` | Modal size |
| `close` | `boolean` | `false` | Show close button in header |
| `allowCancel` | `boolean` | `true` | Allow closing via overlay or ESC |
| `forceSheet` | `boolean` | `false` | Always use bottom sheet layout |
| `noSheet` | `boolean` | `false` | Disable bottom sheet on mobile |
| `transition` | `string` | – | Vue transition name |

**Events:** `close`, `cancel`, `open`

**Slots:** `default` – modal body, `header` – custom header, `footer` – action buttons

**Example**

```vue
<OuiModal v-model="showModal" title="Confirm" close>
  <p>Are you sure?</p>
  <template #footer>
    <OuiButton title="Cancel" @click="showModal = false" />
    <OuiButton title="Confirm" mode="primary" @click="confirm" />
  </template>
</OuiModal>
```

---

### OuiDialog

Pre-styled dialog built on OuiModal for common confirm/cancel patterns.

```ts
import { OuiDialog } from 'oui-kit'
```

See [lib/modal/oui-dialog.md](lib/modal/oui-dialog.md).

---

### Programmatic Dialogs

Show dialogs without mounting components.

```ts
import { ouiAlert, ouiConfirm, ouiPrompt, ouiDialog, useDialog } from 'oui-kit'

// Alert
await ouiAlert('Something happened')

// Confirm – returns true/false
const confirmed = await ouiConfirm('Delete this item?')

// Prompt – returns string or null
const name = await ouiPrompt('Enter your name')

// Custom dialog
const result = await ouiDialog(MyDialogComponent, { prop1: 'value' })
```

---

## Notification

Toast-like notifications with actions and auto-dismiss.

```ts
import {
  emitNotification,
  emitNotificationInfo,
  emitNotificationWarn,
  emitNotificationError,
  closeNotification,
  useNotification,
  OuiNotificationActivator,
} from 'oui-kit'
```

Add the activator once in your app root:

```vue
<OuiNotificationActivator />
```

**Emit notifications:**

```ts
emitNotificationInfo('Saved', 'Your changes have been saved.')
emitNotificationWarn('Low storage', 'Less than 10% disk space remaining.')
emitNotificationError('Upload failed', 'Please try again.')

// Full control
emitNotification({
  title: 'Update available',
  message: 'Restart to apply.',
  mode: 'info',
  timeout: -1, // never auto-dismiss
  actionLabel: 'Restart',
  onAction: () => restartApp(),
  cancelLabel: 'Later',
})
```

**Composable:**

```ts
const { notifications } = useNotification()
```

**Limits:** Max 6 simultaneous notifications.

---

## Mobile

### OuiMobileActivator

Activates mobile-optimized UI behavior. Place once in the app root.

```ts
import { OuiMobileActivator } from 'oui-kit'
```

```vue
<OuiMobileActivator />
```

See [lib/mobile/oui-mobile.md](lib/mobile/oui-mobile.md).

---

## Utilities

### OuiDark

Applies dark mode to its children or the whole app. See [lib/basic/oui-dark.md](lib/basic/oui-dark.md).

```ts
import { OuiDark } from 'oui-kit'
```

```vue
<OuiDark :active="isDarkMode">
  <!-- content -->
</OuiDark>
```

---

### OuiObject

Structured object/data display component. See [lib/object/README.md](lib/object/README.md).

```ts
import { OuiObject } from 'oui-kit'
```

---

### Utility Functions

```ts
import { px, rex } from 'oui-kit'

px(16)    // → "16px"
rex(16)   // → "1rem"  (1rem = 16px)
rex(8)    // → "0.5rem"
rex('24px') // → "1.5rem"
```

---

### Types

```ts
import type {
  OuiSelectItem,       // { id, title, search?, action?, skipSelection?, class? }
  OuiTableColumn,      // { name, title?, sortable?, align?, width?, grow?, … }
  OuiTab,              // { value, title?, icon?, content? }
  OuiSegmentedOption,  // { value, title?, icon?, sliderClass? }
  OuiDraggableEvent,   // { startX, startY, deltaX, deltaY, moveX, moveY, … }
  AppNotificationSetup, // notification config object
} from 'oui-kit'
```

---

## Theming & CSS Variables

> **Wichtig für KI-Assistenten:** Das Theming-System verwendet ein eigenes Benennungsschema für CSS-Variablen. Bitte die Konventionen unten genau einhalten – generische Namen wie `--primary-color` oder `--color-blue` werden in diesem System **nicht** verwendet.

### Import

```stylus
// Vollständige Library (empfohlen):
@import 'oui-kit/stylus'

// Oder einzelne Teile:
@import 'oui-kit/theme'     // nur CSS-Variablen
@import 'oui-kit/lib'       // nur Mixins
```

```ts
// CSS (vorkompiliert):
import 'oui-kit/css'
```

### Benennungsschema CSS-Variablen

Das Schema folgt dem Muster: `--[level]-[style]-[state]`

**Level** (Farbpalette):
| Kürzel | Bedeutung | Beispiel |
|--------|-----------|---------|
| `n0` | Neutral (Grautöne) | `--n0-500` |
| `p1` | Primary (Markenfarbe, Blau) | `--p1-500` |
| `s2` | Secondary (abgeschwächt) | `--s2-fg` |
| `t3` | Tertiary (noch schwächer) | `--t3-bg` |

**Style:**
| Kürzel | Bedeutung | CSS-Eigenschaft |
|--------|-----------|----------------|
| `fg` | Foreground | `color` |
| `bg` | Background | `background` |
| `border` | Rahmen | `border-color` |
| `shadow` | Schatten | `box-shadow` |
| `radius` | Eckenradius | `border-radius` |

**State** (optional):
`hover`, `focus`, `active`, `disabled`

### Farbpalette

```css
:root {
  /* Neutral – Grautöne */
  --n0-50:  #f5f6f6;
  --n0-100: #e6e7e7;
  --n0-200: #d0d1d1;
  --n0-300: #aeb0b2;
  --n0-400: #7d8082;
  --n0-500: #6b6e6f;
  --n0-600: #5b5d5f;
  --n0-700: #4e4f50;
  --n0-800: #444546;
  --n0-900: #3c3d3d;
  --n0-950: #252527;

  /* Primary – Blautöne (Markenfarbe) */
  --p1-50:  #f3f7fc;
  --p1-100: #e7eff7;
  --p1-200: #c9dbee;
  --p1-300: #9abedf;
  --p1-400: #639ccd;
  --p1-500: #4385be;  /* ← Hauptfarbe */
  --p1-600: #2e659b;
  --p1-700: #27527d;
  --p1-800: #234569;
  --p1-900: #223c58;
  --p1-950: #17273a;
}
```

### Semantische Variablen

```css
:root {
  /* Vordergrund / Hintergrund */
  --fg: #0a0a0a;       /* Haupttextfarbe */
  --bg: white;          /* Haupthintergrund */

  /* Primär (Buttons, Links, Akzente) */
  --p1-fg: var(--p1-600);
  --p1-bg: var(--p1-100);

  /* Sekundär (Panels, Sidebar) */
  --s2-fg: var(--n0-600);
  --s2-bg: var(--n0-50);

  /* Tertiär (dezente Elemente) */
  --t3-fg: var(--n0-400);
  --t3-bg: var(--n0-100);

  /* Inputs */
  --input-fg: var(--fg);
  --input-bg: var(--bg);
  --input-border: var(--n0-200);
  --input-border-hover: var(--p1-300);
  --input-border-focus: rgba(66, 153, 225, 1);
  --input-shadow-focus: 0 0 0 3px rgba(66, 153, 225, 0.5);
  --input-radius: 4px;

  /* Buttons */
  --button-fg: white;
  --button-bg: var(--p1-500);
  --button-bg-hover: var(--p1-600);
  --button-bg-active: var(--p1-700);

  /* Links */
  --link-fg: var(--p1-700);
  --link-fg-hover: var(--p1-800);
  --link-fg-active: var(--p1-900);

  /* Schriftarten */
  --font: var(--font-sans);
  --font-sans: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: "JetBrains Mono", Menlo, Consolas, monospace;
}
```

### Dark Mode

Dark Mode wird über die Klasse `.dark` am `html`-Element aktiviert – **nicht** über `@media (prefers-color-scheme: dark)`.

```css
.dark {
  --fg: var(--n0-50);
  --bg: var(--n0-950);
  --p1-fg: var(--p1-400);
  --p1-bg: var(--p1-900);
  --s2-fg: var(--n0-300);
  --s2-bg: var(--n0-800);
  --t3-fg: var(--n0-500);
  --t3-bg: var(--n0-700);
  --input-border: var(--n0-500);
  --link-fg: var(--p1-300);
}
```

```vue
<!-- OuiDark setzt/entfernt die .dark-Klasse automatisch -->
<OuiDark :active="isDark" />
```

### Eigene Komponenten stylen (Stylus)

```stylus
// Eigene Komponente im Oui-Stil
.my-widget
  color var(--fg)
  background var(--s2-bg)
  border 1px solid var(--input-border)
  border-radius var(--input-radius)

  &:hover
    border-color var(--input-border-hover)

  &:focus
    border-color var(--input-border-focus)
    box-shadow var(--input-shadow-focus)
```

### CSS-Klassen-Modifikatoren

Modifikatoren verwenden einen **Unterstrich** als Präfix (nicht `-`). Das erlaubt saubere Vue-Bindungen:

```vue
<!-- Richtig: -->
<div class="oui-item" :class="{ _active, _disabled }">

<!-- Falsch (würde mit JS-Variablennamen kollidieren): -->
<div class="oui-item" :class="{ '-active': active }">
```

Interne Komponenten folgen dem Muster `oui-[name]` für Wrapper und `oui-[name]-[part]` für Unterelemente:

```html
<div class="oui-list">
  <div class="oui-list-item _active">...</div>
</div>
```

### Einheit `rex()`

Oui verwendet eine eigene Einheit `rex` – eine Mischung aus `rem` und `px`. `1rem = 16px`.

```stylus
// In Stylus-Mixins:
rex(16)   // → 1rem
rex(8)    // → 0.5rem
rex(24)   // → 1.5rem

// Padding/Margin-Shortcuts wandeln Zahlen automatisch um:
.demo
  padding-x 16   // → padding-left: 1rem; padding-right: 1rem
  margin-y 8     // → margin-top: 0.5rem; margin-bottom: 0.5rem
```

```ts
// In TypeScript:
import { rex, px } from 'oui-kit'
rex(16)  // → "1rem"
px(16)   // → "16px"
```

### Palette anpassen

Um die Markenfarbe zu ändern, genügt es, die `--p1-*`-Variablen zu überschreiben:

```css
:root {
  --p1-500: #e85d04;  /* Orange statt Blau */
  --p1-400: #f48c06;
  --p1-600: #dc2f02;
  /* usw. */
}
```

Tools zum Erstellen eigener Paletten: [tailwindshades.com](https://www.tailwindshades.com/) · [uicolors.app](https://uicolors.app/create) · [tints.dev](https://www.tints.dev/)
