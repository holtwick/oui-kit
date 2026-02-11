<script lang="ts" setup generic="K">
import type { OuiSegmentedOptions } from './_types'
import { computed, ref } from 'vue'
import { tt } from '@/basic/i18n'
import OuiFormItem from './oui-form-item.vue'
import OuiSlider from './oui-slider.vue'

import './oui-form.styl'
import './oui-segmented.styl'

const props = defineProps<{
  title?: string
  description?: string
  required?: boolean
  id?: string
  options: OuiSegmentedOptions<K>
  placeholder?: string
  disabled?: boolean
  error?: boolean
  size?: 'md' | 'lg' | 'xl'
}>()

const model = defineModel<K>({ required: false })

const containerRef = ref<HTMLElement>()

// Ensure we have a default value if none is set
// onMounted(() => {
//   if (!model.value && props.options.length > 0) {
//     model.value = props.options[0].value
//   }
// })

const computedClass = computed(() => [
  'oui-segmented',
  {
    _error: props.error,
    [`_size-${props.size || 'md'}`]: true,
  },
])

const activeOption = computed(() =>
  props.options.find(option => option.value === model.value),
)

const displayValue = computed(() =>
  activeOption.value?.title || activeOption.value?.value || props.placeholder || tt('Select option', 'oui.segmented.placeholder'),
)

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled)
    return

  const currentIndex = model.value ? props.options.findIndex(option => option.value === model.value) : -1
  let newIndex = currentIndex

  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      event.preventDefault()
      if (currentIndex > 0) {
        newIndex = currentIndex - 1
      }
      else if (currentIndex === -1) {
        newIndex = props.options.length - 1
      }
      else {
        newIndex = props.options.length - 1
      }
      break
    case 'ArrowRight':
    case 'ArrowDown':
      event.preventDefault()
      if (currentIndex < props.options.length - 1) {
        newIndex = currentIndex + 1
      }
      else if (currentIndex === -1) {
        newIndex = 0
      }
      else {
        newIndex = 0
      }
      break
    case 'Home':
      event.preventDefault()
      newIndex = 0
      break
    case 'End':
      event.preventDefault()
      newIndex = props.options.length - 1
      break
  }

  if (newIndex !== currentIndex && newIndex >= 0 && newIndex < props.options.length) {
    model.value = props.options[newIndex].value
  }
}

const disabledConform = computed(() => {
  return props.disabled ? true : undefined
})
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

    <div ref="containerRef" class="oui-input oui-segmented" :class="computedClass" tabindex="0" role="radiogroup" :disabled="disabledConform" v-bind="$attrs" @keydown="handleKeydown">
      <OuiSlider v-model="model" :options="options" class="oui-segmented-container" slider-class="oui-segmented-slider">
        <template #default="{ options: slidingOptions, updateModelValue }">
          <template v-for="option in slidingOptions" :key="String(option.value)">
            <button :class="{ _active: model === option.value }" :disabled="disabledConform" role="radio" :aria-checked="model === option.value" :aria-label="option.title || String(option.value)" tabindex="-1" @click="updateModelValue(option.value)">
              <slot :name="`option-${option.value}`" v-bind="{ option }">
                <template v-if="option.icon">
                  <component :is="option.icon" v-if="typeof option.icon !== 'string'" />
                  <span v-else v-text="option.icon" />
                </template>
                {{ option.title ?? option.value }}
              </slot>
            </button>
          </template>
        </template>
      </OuiSlider>
    </div>
  </OuiFormItem>
</template>
