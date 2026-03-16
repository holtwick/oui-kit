<script lang="ts" setup>
import { ref, watch } from 'vue'

import { vFocustrap } from '../modal/oui-modal.focustrap'
import './oui-notice.styl'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  title?: string
  cover?: boolean
}>()

const root = ref()

watch(root, (el) => {
  setTimeout(() => {
    if (el) {
      (el.querySelector('._focus')
        ?? el.querySelector('input,button,select')
        ?? el).focus()
    }
  }, 0)
}, { immediate: true })
</script>

<template>
  <template v-if="cover">
    <Teleport to="body" :disabled="!cover">
      <div ref="root" v-focustrap class="oui-notice _notice_cover oui-mobile-fullheight" data-noscroll="true">
        <div class="oui-notice-body" v-bind="$attrs">
          <div v-if="$slots.icon" class="oui-notice-icon">
            <slot name="icon" />
          </div>
          <div v-if="$slots.title || title" class="oui-notice-title">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <div v-if="$slots.default" class="oui-notice-message">
            <slot />
          </div>
        </div>
      </div>
    </Teleport>
  </template>
  <template v-else>
    <div ref="root" class="oui-notice">
      <div class="oui-notice-body" v-bind="$attrs">
        <div v-if="$slots.icon" class="oui-notice-icon">
          <slot name="icon" />
        </div>
        <div v-if="$slots.title || title" class="oui-notice-title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div v-if="$slots.default" class="oui-notice-message">
          <slot />
        </div>
      </div>
    </div>
  </template>
</template>
