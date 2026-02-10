<script lang="ts" setup>
import { reactive } from 'vue'
import { dayFromString, dayFromToday, dayOffset, dayToDate } from 'zeed'
import { OuiButton, OuiDay, OuiDemo, OuiInputNumber } from '@/lib'

const state = reactive({
  day: dayFromToday(),
  editableDay: undefined as number | undefined,
  emptyDay: undefined as number | undefined,
  formattedDay: dayFromToday(),
  customFooterDay: undefined as number | undefined,
  placeholderDay: dayFromString('2026-01-01'),
  showArrows: false,
})

// Validator function for editable day
function parseDay(text: string): number | undefined {
  const parsed = dayFromString(text)
  return parsed ?? undefined
}

// Custom formatter for long date format
function formatDayLong(day: number): string {
  const date = dayToDate(day)
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Custom footer actions
function setYesterday() {
  state.customFooterDay = dayOffset(dayFromToday(), -1)
}

function setNextWeek() {
  state.customFooterDay = dayOffset(dayFromToday(), 7)
}
</script>

<template>
  <div>
    <OuiDay
      v-model:day="state.day"
      title="Select Date"
      description="Button mode: Arrow keys navigate days, Alt+Arrow for months, Cmd+Arrow for years"
      :required="true"
      :show-arrows="state.showArrows"
    />

    <OuiDay
      v-model:day="state.editableDay"
      title="Editable Date"
      description="Type a date like '2026-02-10'. Keyboard: Alt+Arrow for months, Cmd+Arrow for years"
      :editable="true"
      :validator="parseDay"
      :show-arrows="state.showArrows"
    />

    <OuiDay
      v-model:day="state.emptyDay"
      title="Empty Date with Placeholder"
      description="Optional date field with placeholder"
      :placeholder-day="state.placeholderDay"
      :show-arrows="state.showArrows"
    />

    <OuiDay
      v-model:day="state.formattedDay"
      title="Custom Formatter"
      description="Using a long weekday/month format"
      :formatter="formatDayLong"
      :show-arrows="state.showArrows"
    />

    <OuiDay
      v-model:day="state.customFooterDay"
      title="Custom Footer"
      description="Footer slot with custom actions"
      :show-arrows="state.showArrows"
    >
      <template #footer>
        <OuiButton mode="ghost" @click="setYesterday">
          Gestern
        </OuiButton>
        <OuiButton mode="ghost" @click="setNextWeek">
          Nächste Woche
        </OuiButton>
      </template>
    </OuiDay>
  </div>
  <OuiDemo :state="state">
    <OuiInputNumber v-model="state.day" title="day" />
    <OuiInputNumber v-model="state.editableDay" title="editableDay" />
    <OuiInputNumber v-model="state.emptyDay" title="emptyDay" />
    <OuiInputNumber v-model="state.formattedDay" title="formattedDay" />
    <OuiInputNumber v-model="state.customFooterDay" title="customFooterDay" />
    <OuiInputNumber v-model="state.placeholderDay" title="placeholderDay" />
    <label>
      <input v-model="state.showArrows" type="checkbox">
      Show arrows
    </label>
  </OuiDemo>
</template>
