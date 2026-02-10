# oui-day

This component uses the external [v-calendar](https://vcalendar.io/getting-started/installation.html) component. Make sure to add it to your app's `package.json` and also place an import for their CSS into your app's code:

```ts
import 'v-calendar/style.css'
```

For the date the `day` format (integer number like YYYYMMDD) supported by [zeed](https://github.com/holtwick/zeed/blob/ab3b88a3093932ea393bad9464b153cc2a42e19d/src/common/data/day.ts) is used.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | The title displayed above the date picker. |
| `description` | `string` | `undefined` | The description displayed below the title. |
| `required` | `boolean` | `false` | Whether the date selection is required. |
| `id` | `string` | `undefined` | The ID attribute for the form item. |
| `editable` | `boolean` | `false` | If true, shows an input field where users can type dates. |
| `validator` | `(text: string) => DayValue \| undefined` | `undefined` | Validation function to parse user input into a DayValue. Only used when `editable` is true. |
| `placeholderDay` | `DayValue` | `undefined` | Placeholder date (YYYYMMDD format) to display when the field is empty. |
| `showArrows` | `boolean` | `false` | If true, shows navigation arrows (←/→) for day navigation. |
| `formatter` | `(day: DayValue) => string` | `undefined` | Custom formatter function to display dates. Default uses compact locale format (e.g., "02/10/2026"). |

## Models

| Model | Type | Description |
|-------|------|-------------|
| `day` | `DayValue \| undefined` | The selected day as an integer (YYYYMMDD format). Can be undefined for empty/optional fields. |

## Slots

| Slot | Description |
|------|-------------|
| `footer` | Content displayed at the bottom of the date picker dropdown. Default shows "Heute" (Today) and "Löschen" (Clear) buttons. |
| `selectors` | Additional selector buttons placed between the date picker and navigation buttons. |
| (default) | Content placed after the date controls. |

## Example

```vue
<template>
  <OuiDay
    v-model:day="state.day"
    title="Select Date"
    description="This is a demo of the OuiDay component"
    :required="true"
  />
  
  <!-- Editable mode with validation -->
  <OuiDay
    v-model:day="state.editableDay"
    title="Editable Date"
    :editable="true"
    :validator="parseDay"
  />
  
  <!-- Optional field with placeholder -->
  <OuiDay
    v-model:day="state.emptyDay"
    title="Optional Date"
    :placeholder-day="20260101"
  />
  
  <!-- Custom formatter -->
  <OuiDay
    v-model:day="state.formattedDay"
    title="Custom Format"
    :formatter="formatDayLong"
  />
</template>

<script setup>
import { ref } from 'vue'
import { dayFromString, dayToDate, today } from 'zeed'

const state = ref({
  day: today,
  editableDay: undefined,
  emptyDay: undefined,
  formattedDay: today,
})

function parseDay(text: string): number | undefined {
  return dayFromString(text) ?? undefined
}

function formatDayLong(day: number): string {
  const date = dayToDate(day)
  return date.toLocaleDateString(undefined, { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>
```

## Date Formatting

By default, dates are displayed using the browser's locale with a compact format (`year: 'numeric', month: '2-digit', day: '2-digit'`). This produces formats like "02/10/2026" or "10.02.2026" depending on the user's locale.

You can customize the date display by providing a `formatter` function:

```ts
function formatDayCustom(day: DayValue): string {
  const date = dayToDate(day)
  // Use any formatting logic you prefer
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
  // Returns: "Mon, Feb 10, 2026"
}
```

The formatter function receives the day value (YYYYMMDD integer) and must return a string. This affects all displayed dates: the selected date, placeholder, and input field values.

## Editable Mode

When `editable` is set to `true`, the component displays an input field instead of a button. Users can type dates directly into the field. You should provide a `validator` function to parse the user's text input:

```ts
function parseDay(text: string): DayValue | undefined {
  // Parse text and return a DayValue (YYYYMMDD integer) or undefined
  return dayFromString(text) ?? undefined
}
```

The validator is called on every input change. If it returns `undefined`, the value is considered invalid. If the input is empty, the day model is set to `undefined`.

## Empty Values

The `day` model can be `undefined`, allowing for optional date fields. When empty:

- If `placeholderDay` is set, that date is displayed as placeholder text
- If no placeholder is set, "Select date" is shown
- The navigation buttons will use the placeholder date as the starting point if the field is empty

## Navigation

The component provides navigation buttons to move to the previous or next day. These buttons are only visible when the `showArrows` prop is set to `true`.

### Keyboard Navigation

When the picker button (non-editable mode) is focused, you can use keyboard shortcuts:

- **Arrow Up**: Next day
- **Arrow Down**: Previous day
- **Alt/Option + Arrow Up**: Next month
- **Alt/Option + Arrow Down**: Previous month
- **Cmd/Ctrl + Arrow Up**: Next year
- **Cmd/Ctrl + Arrow Down**: Previous year

When the input field (editable mode) is focused, only modifier key combinations work to preserve normal text editing:

- **Alt/Option + Arrow Up**: Next month
- **Alt/Option + Arrow Down**: Previous month
- **Cmd/Ctrl + Arrow Up**: Next year
- **Cmd/Ctrl + Arrow Down**: Previous year

## Footer Slot

The date picker dropdown includes a footer with two default buttons:

- **Heute** (Today): Sets the date to today
- **Löschen** (Clear): Clears the selected date

You can customize the footer content using the `footer` slot:

```vue
<OuiDay v-model:day="selectedDay">
  <template #footer>
    <OuiButton mode="ghost" @click="setCustomDate">
      Custom Action
    </OuiButton>
  </template>
</OuiDay>
```
