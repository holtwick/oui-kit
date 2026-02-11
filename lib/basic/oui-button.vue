<script lang="ts" setup>
import { computed, useSlots } from 'vue'

import './oui-form.styl'

const props = withDefaults(defineProps<{
  title?: string
  mode?: 'primary' | 'danger' | 'neutral' | 'success' | 'ghost' | 'outline'
  size?: 'small' | 'normal' | 'large'
  dropdown?: boolean
  outline?: boolean
  href?: string
  target?: string
  disabled?: boolean
  focusable?: boolean
}>(), {
  mode: 'neutral',
  size: 'normal',
  dropdown: false,
  outline: false,
  target: '_blank',
  disabled: false,
  focusable: true,
})

const slots = useSlots()

const slotText = computed(() => {
  const defaultSlot = slots.default?.({})

  if (!defaultSlot || defaultSlot.length === 0)
    return ''

  // Extract text content from slot
  const textContent = defaultSlot.map((vnode: any) => {
    if (typeof vnode.children === 'string') {
      return vnode.children
    }
    return ''
  }).join('')

  return textContent
})

const buttonTitle = computed(() => (props.title || slotText.value || '').trim())

const klass = computed(() => ([
  'oui-button',
  props.mode && `_button_mode_${props.mode}`,
  props.size && `_button_size_${props.size}`,
  props.dropdown && `_button_dropdown`,
].filter(Boolean)))
</script>

<template>
  <a v-if="href && !disabled" :href="href" :target="target" :class="klass" role="button" :aria-label="buttonTitle" :aria-disabled="disabled" :tabindex="focusable ? 0 : -1">
    <slot>{{ title }}</slot>
  </a>
  <button v-else :tabindex="focusable ? 0 : -1" :disabled="disabled ? true : undefined" :class="klass" :aria-label="buttonTitle" :aria-disabled="disabled">
    <slot>{{ title }}</slot>
  </button>
</template>
