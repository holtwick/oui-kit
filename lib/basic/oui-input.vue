<script lang="ts" setup>
import type { InputTypeHTMLAttribute } from 'vue'
import { onBeforeUnmount, ref, watch } from 'vue'
import OuiClose from './oui-close.vue'
import OuiFormItem from './oui-form-item.vue'

import './oui-form.styl'

defineOptions({
  inheritAttrs: false,
})

// type InputTypeHTMLAttribute = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week' | (string & {});

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  required?: boolean
  id?: string
  type?: InputTypeHTMLAttribute // 'text' | 'url' | 'email' | 'tel' | 'search'
  lazy?: boolean
  lazyDelay?: number
  disabled?: boolean
  clearable?: boolean
  formatter?: (value: string) => string
  validator?: (value: string) => boolean
}>(), {
  type: 'text',
  lazy: false,
  lazyDelay: 5000,
  clearable: false,
})

const emit = defineEmits<{
  update: [value: string | undefined | null]
}>()

const model = defineModel<string | undefined>({ required: true })

const tempValue = ref('')
const isValid = ref(true)

let timeout: any

function formatValue(value: string): string {
  if (!props.formatter)
    return value
  return props.formatter(value)
}

function validateValue(value: string): boolean {
  if (!props.validator)
    return true
  return props.validator(value)
}

function stopTimeout() {
  clearTimeout(timeout)
}

onBeforeUnmount(stopTimeout)

watch(tempValue, (v) => {
  const formatted = formatValue(v)
  if (formatted !== v) {
    tempValue.value = formatted
    return
  }

  isValid.value = validateValue(formatted)

  if (!props.lazy) {
    if (isValid.value) {
      model.value = formatted
    }
  }
  else if (props.lazyDelay > 0) {
    stopTimeout()
    timeout = setTimeout(() => {
      if (validateValue(tempValue.value)) {
        model.value = tempValue.value
      }
    }, props.lazyDelay)
  }
})

watch(() => model.value, (v) => {
  const formatted = formatValue(v ?? '')
  tempValue.value = formatted
  isValid.value = validateValue(formatted)
}, { immediate: true })

function lazyUpdate() {
  if (props.lazy) {
    stopTimeout()
    isValid.value = validateValue(tempValue.value)
    if (isValid.value) {
      model.value = tempValue.value
    }
  }
}

function doUpdate(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    tempValue.value = model.value ?? ''
  }
  emit('update', tempValue.value)
  if (event.key === 'Enter') {
    lazyUpdate()
  }
}

function doClear() {
  if (props.disabled)
    return

  tempValue.value = ''
  isValid.value = validateValue('')
  model.value = ''
}
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

    <template v-if="$slots.start || $slots.end || (clearable && (model || tempValue))">
      <div class="oui-input oui-input-container" :disabled="disabled ? true : undefined">
        <slot name="start" />
        <input :id="id" v-model="tempValue" :type="type" v-bind="$attrs" :disabled="disabled ? true : undefined" :aria-invalid="!isValid ? true : undefined" @keypress="doUpdate" @blur="lazyUpdate">
        <slot name="end" />
        <div
          v-if="clearable && (model || tempValue)"
          class="oui-input-clearable"
          @click.stop.prevent="doClear"
        >
          <OuiClose />
        </div>
      </div>
    </template>
    <template v-else>
      <input :id="id" v-model="tempValue" :type="type" class="oui-input oui-input-string" :disabled="disabled ? true : undefined" v-bind="$attrs" :aria-invalid="!isValid ? true : undefined" @keypress="doUpdate" @blur="lazyUpdate">
    </template>
  </OuiFormItem>
</template>
