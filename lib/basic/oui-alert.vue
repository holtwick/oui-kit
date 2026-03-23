<script lang="ts" setup>
import OuiClose from './oui-close.vue'
import './oui-alert.styl'

defineProps<{
  /** Visual variant */
  mode?: 'info' | 'success' | 'warn' | 'error'
  /** Optional heading shown above the message */
  title?: string
  /** Show a dismiss button */
  dismissible?: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const show = defineModel<boolean>({ default: true })

function dismiss() {
  show.value = false
  emit('close')
}
</script>

<template>
  <Transition name="oui-alert">
    <div
      v-if="show"
      class="oui-alert"
      :class="`_${mode ?? 'info'}`"
      role="alert"
    >
      <div v-if="title" class="oui-alert-title">
        {{ title }}
      </div>
      <div class="oui-alert-body">
        <slot />
      </div>
      <button v-if="dismissible" class="oui-alert-close" :aria-label="'Close'" @click="dismiss">
        <OuiClose />
      </button>
    </div>
  </Transition>
</template>
