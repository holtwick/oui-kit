<script lang="ts" setup>
import { computed } from 'vue'

import './oui-form.styl'
import './oui-checkbox.styl'
import './switch-polyfill'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  title?: string
  switch?: boolean
  intermediate?: boolean
  description?: string
}>(), {
  switch: false,
  intermediate: false,
})

const model = defineModel({ required: true })

// Fixes Vue issue not supporting non-boolean values
// https://github.com/vuejs/core/issues/5775
const modelBool = computed({
  get() {
    return !!model.value
  },
  set(value: any) {
    model.value = value
  },
})

const klass = computed(() => {
  const klasses = [props.switch ? 'oui-switch' : 'oui-checkbox']
  if (model.value == null)
    klasses.push('_checkbox_intermediate')
  return klasses
})

const switchAttrs = computed(() => {
  // Add the 'switch' attribute for the polyfill when switch prop is true
  return props.switch ? { switch: '' } : {}
})
</script>

<template>
  <template v-if="title || $slots.default">
    <label class="oui-form-item-checkbox" :class="{ _disabled: $attrs.disabled }">
      <input v-model="modelBool" type="checkbox" :class="klass" v-bind="{ ...$attrs, ...switchAttrs }">
      {{ ' ' }}
      <slot>{{ title }}</slot>
    </label>
    <template v-if="$slots.description || description">
      <div class="oui-form-item-description" :class="{ _disabled: $attrs.disabled }">
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </template>
  </template>
  <template v-else>
    <input v-model="modelBool" type="checkbox" :class="klass" v-bind="{ ...$attrs, ...switchAttrs }">
  </template>
</template>
