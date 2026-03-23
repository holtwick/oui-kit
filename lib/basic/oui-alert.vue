<script lang="ts" setup>
import { tt } from './i18n'
import OuiClose from './oui-close.vue'
import './oui-alert.styl'

defineProps<{
  /** Visual variant */
  mode?: 'info' | 'success' | 'warn' | 'error'
  /** Optional heading shown above the message */
  title?: string
  /** Show a dismiss button */
  dismissible?: boolean
  tooltipClose?: string
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
      <button v-if="dismissible" class="oui-alert-close" :aria-label="tooltipClose ?? tt('Close', 'oui.alert.close')" :tooltip="tooltipClose ?? tt('Close', 'oui.alert.close')" @click="dismiss">
        <OuiClose />
      </button>
    </div>
  </Transition>
</template>
