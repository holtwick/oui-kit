<script setup lang="ts">
import type { DayValue } from 'zeed'
import { useDark } from '@vueuse/core'
import { computed, defineAsyncComponent, nextTick, ref, watch } from 'vue'
import { dayFromDate, dayFromToday, dayMonthOffset, dayOffset, dayToDate, dayYearOffset } from 'zeed'
import { t } from '@/basic/i18n'
import OuiFloat from '../float/oui-float.vue'
import OuiSpace from '../layout/oui-space.vue'
import OuiButton from './oui-button.vue'
import OuiClose from './oui-close.vue'
import OuiFormItem from './oui-form-item.vue'

import './oui-day.styl'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  required?: boolean
  id?: string
  editable?: boolean
  disabled?: boolean
  clearable?: boolean
  validator?: (text: string) => DayValue | undefined
  placeholderDay?: DayValue
  showArrows?: boolean
  formatter?: (day: DayValue) => string
}>(), {})

const DatePicker = defineAsyncComponent(async () => (await import('v-calendar')).DatePicker)

const day = defineModel<DayValue | undefined>({ required: false })

const showPicker = ref(false)
const inputText = ref('')
const targetRef = ref()
const focus = ref(false)

// Format day value
function formatDay(dayValue: DayValue | undefined): string {
  if (!dayValue)
    return ''
  if (props.formatter) {
    return props.formatter(dayValue)
  }
  // Default: compact locale date format
  const date = dayToDate(dayValue)
  return date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })
}

// Close the picker
function closePicker() {
  nextTick(() => {
    showPicker.value = false
  })
}

// Computed properties for v-calendar compatibility
const vdate = computed<Date | undefined>({
  get: () => {
    const effectiveDay = day.value ?? props.placeholderDay
    return effectiveDay ? dayToDate(effectiveDay) : undefined
  },
  set: (val) => {
    if (val) {
      day.value = dayFromDate(val)
    }
    closePicker()
  },
})

const selectedDateFormatted = computed(() => {
  if (day.value) {
    return formatDay(day.value)
  }
  if (props.placeholderDay) {
    return formatDay(props.placeholderDay)
  }
  return ''
})

const placeholderText = computed(() => {
  if (props.placeholderDay) {
    return formatDay(props.placeholderDay)
  }
  return t('Select date', 'oui.day.selectDate')
})

// Watch day value and sync inputText
watch(() => day.value, (newValue) => {
  if (props.editable) {
    inputText.value = formatDay(newValue)
  }
}, { immediate: true })

// Handle input change for editable mode
function handleInputChange(event: Event) {
  const target = event.target as HTMLInputElement
  const text = target.value
  inputText.value = text

  if (props.validator) {
    const parsed = props.validator(text)
    if (parsed !== undefined) {
      day.value = parsed
    }
    else if (text === '') {
      day.value = undefined
    }
  }
}

// Handle focus
function handleFocus() {
  focus.value = true
  showPicker.value = true
  // Keep current inputText or sync with value
  if (!inputText.value && day.value) {
    inputText.value = formatDay(day.value)
  }
}

// Handle blur
function handleBlur() {
  focus.value = false
  // Format the text with the current day value
  inputText.value = formatDay(day.value)
  // Don't close immediately - allow calendar interaction
  setTimeout(() => {
    if (!focus.value) {
      showPicker.value = false
    }
  }, 200)
}

// Navigation functions
function moveDay(delta: number) {
  const current = day.value ?? props.placeholderDay
  if (current) {
    day.value = dayOffset(current, delta)
    showPicker.value = true
  }
}

function moveMonth(delta: number) {
  const current = day.value ?? props.placeholderDay
  if (current) {
    day.value = dayMonthOffset(current, delta)
    showPicker.value = true
  }
}

function moveYear(delta: number) {
  const current = day.value ?? props.placeholderDay
  if (current) {
    day.value = dayYearOffset(current, delta)
    showPicker.value = true
  }
}

function navigateBackward() {
  moveDay(-1)
}

function navigateForward() {
  moveDay(+1)
}

function setToday() {
  day.value = dayFromToday()
  closePicker()
}

function clearDay() {
  day.value = undefined
  closePicker()
}

const isDark = useDark()
</script>

<template>
  <OuiFormItem :id="id" :title="title" :description="description" :required="required">
    <!-- Conditionally pass the title slot -->
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>

    <!-- Conditionally pass the description slot -->
    <template v-if="$slots.description" #description>
      <slot name="description" />
    </template>

    <div ref="targetRef" class="oui-day">
      <div class="_dateselect oui-input-group">
        <div class="oui-input-container" :class="{ '-focus': focus }">
          <input v-if="editable" type="text" class="oui-input" :value="inputText" :placeholder="placeholderText" :disabled="Boolean(disabled)" @input="handleInputChange" @focus="handleFocus" @blur="handleBlur" @keydown.up.exact.prevent="moveDay(+1)" @keydown.down.exact.prevent="moveDay(-1)" @keydown.alt.up.prevent="moveMonth(+1)" @keydown.alt.down.prevent="moveMonth(-1)" @keydown.meta.up.prevent="moveYear(+1)" @keydown.meta.down.prevent="moveYear(-1)" @keydown.ctrl.up.prevent="moveYear(+1)" @keydown.ctrl.down.prevent="moveYear(-1)">
          <OuiButton v-else mode="outline" dropdown :disabled="Boolean(disabled)" @keydown.up.exact.prevent="moveDay(+1)" @keydown.down.exact.prevent="moveDay(-1)" @keydown.alt.up.prevent="moveMonth(+1)" @keydown.alt.down.prevent="moveMonth(-1)" @keydown.meta.up.prevent="moveYear(+1)" @keydown.meta.down.prevent="moveYear(-1)" @keydown.ctrl.up.prevent="moveYear(+1)" @keydown.ctrl.down.prevent="moveYear(-1)" @click="showPicker = !showPicker">
            {{ selectedDateFormatted || t('Select date', 'oui.day.selectDate') }}
          </OuiButton>
          <OuiButton
            v-if="clearable"
            mode="outline"
            class="oui-input-clearable"
            @click.stop.prevent="clearDay"
          >
            <OuiClose />
          </OuiButton>
          <slot name="selectors" />
          <OuiButton v-if="showArrows" mode="outline" title="Previous day" @click="navigateBackward">
            ←
          </OuiButton>
          <OuiButton v-if="showArrows" mode="outline" title="Next day" @click="navigateForward">
            →
          </OuiButton>
        </div>
        <OuiFloat v-model="showPicker" :reference="targetRef" placement="bottom-start" :close="!editable" class="oui-float _dropdown oui-day-float" :offset="4">
          <DatePicker v-model="vdate" :is-dark="isDark" mode="date" :placeholder="t('Select date', 'oui.day.selectDate')" class="date-picker oui-day-teleport" :columns="1" show-weeknumbers :popover="false" transparent borderless @mousedown.prevent @touchstart.prevent />
          <div class="oui-day-footer">
            <slot name="footer">
              <OuiButton mode="ghost" @click="setToday">
                Heute
              </OuiButton>
              <OuiSpace />
              <OuiButton mode="ghost" @click="clearDay">
                Löschen
              </OuiButton>
            </slot>
          </div>
        </OuiFloat>
      </div>
      <slot />
    </div>
  </OuiFormItem>
</template>
