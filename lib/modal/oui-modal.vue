<script lang="ts" setup>
import type { OuiDraggableEvent } from '../basic'
import { onKeyStroke, useScrollLock, useWindowSize } from '@vueuse/core'
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useDispose } from 'zeed'
import { OuiClose } from '../basic'
import OuiDraggable from '../basic/oui-draggable.vue'
import { isEnterPressed, onEnterFree } from './focus'
import { vFocustrap } from './oui-modal.focustrap'

import './oui-modal.styl'

const props = withDefaults(defineProps<{
  close?: boolean
  allowCancel?: boolean
  title?: string
  transition?: string
  forceSheet?: boolean
  noSheet?: boolean
  size?: 'small' | 'normal' | 'large' | 'max'
}>(), {
  allowCancel: true,
  close: false,
  forceSheet: false,
  noSheet: false,
  size: 'normal',
})

const emit = defineEmits<{
  close: []
  cancel: []
  open: []
}>()

const _active = defineModel({ default: true })

const scrollLock = useScrollLock(window)

const dispose = useDispose()

onKeyStroke('Escape', (e) => {
  if (_active.value) {
    e.preventDefault()
    e.stopPropagation()
    doCancel()
  }
})

const root = ref()

// Only allowed if "close" is set
function doCancel() {
  if (props.allowCancel === true) {
    emit('cancel')
    doClose()
  }
}

// you could also parse the offset from the style directly
// if you'd prefer no having mutating variables
let scrollOffset: any
const scrollElement = document.scrollingElement as HTMLElement

function blockScrolling() {
  // scrollOffset = window.moveYOffset

  // if (scrollElement) {
  //   scrollElement.style.overflow = 'hidden'
  //   scrollElement.style.position = 'fixed'
  //   scrollElement.style.top = `${-scrollOffset}px`
  // }
}

function enableScrolling() {
  // if (scrollElement) {
  //   scrollElement.style.removeProperty('position')
  //   scrollElement.style.removeProperty('overflow')
  //   scrollElement.style.removeProperty('top')
  // }

  // window.scrollTo(0, scrollOffset)
}

function doClose() {
  dispose.dispose()
  enableScrolling()
  emit('close')
  _active.value = false
  // emit('update:modelValue', false)
}

function didClose() {

}

function didOpen() {
  blockScrolling()
  if (root.value) {
    dispose.add(onEnterFree(() => {
      const el = root.value.querySelector('._focus')
        ?? root.value.querySelector('input,button,select')
        ?? root.value
      el.focus()
    }, () => {
      root.value.querySelector('._focus_fail')?.focus()
    }))
  }

  emit('open')
}

function triggerActiveClass(active: boolean = false) {
  scrollLock.value = active
  if (active)
    document.documentElement.classList.add('oui-modal-active')
  else
    document.documentElement.classList.remove('oui-modal-active')
}

watch(_active, triggerActiveClass, { immediate: true })

onBeforeUnmount(doClose)

const name = 'oui-modal' // computed(() => String(attrs.class || 'oui-modal').split(/\s+/gim)?.[0])

//

const { height } = useWindowSize()

const dragY = ref(0)

async function checkClose(e: OuiDraggableEvent) {
  // console.log('checkclose', dragY.value, e.timeMS, height.value / 3, e)
  if (dragY.value > (height.value / 3) || (dragY.value > 40 && e.timeMS < 500)) {
    dragY.value = 0
    await nextTick()
    doClose()
  }
  else {
    dragY.value = 0
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition appear :name="transition ?? `${name}-transition`" @after-enter="didOpen" @after-leave="didClose">
      <div
        v-if="_active" ref="root" class="oui-modal _keyboard_aware_height" :class="{
          [name]: true,
          [$attrs.class as string]: !!$attrs.class,
          _active,
          _modal_sheet: !noSheet,
          _modal_force_sheet: forceSheet,
          _modal_has_footer: $slots.footer,
          [`_modal_size_${size}`]: true,
        }" :tabindex="-1" aria-modal="true" role="dialog" data-noscroll="true"
      >
        <div class="_modal_overlay" aria-label="Close" @click="doCancel" />
        <OuiDraggable v-focustrap class="_modal_container" only-touch :style="dragY > 0 ? { transform: `translateY(${dragY}px)` } : undefined" @move="e => dragY = -e.moveY" @move-end="checkClose">
          <div v-if="isEnterPressed" tabindex="0" class="_focus_fake" style="outline: none; position: absolute;" />
          <button v-if="close" tooltip="Close" class="oui-modal-close _modal_close" @click="doCancel">
            <slot name="close">
              <OuiClose />
            </slot>
          </button>
          <header v-if="title || $slots.title || $slots.header || close === true" class="oui-modal-header _modal_header">
            <div v-if="title || $slots.title" class="oui-modal-title title _modal_title">
              <slot name="title">
                {{ title }}
              </slot>
            </div>
            <slot name="header" />
          </header>
          <section class="oui-modal-body body _modal_body">
            <slot />
          </section>
          <footer v-if="$slots.footer" class="oui-modal-footer footer _modal_footer">
            <slot name="footer" />
          </footer>
          <div class="oui-modal-bottom-space _modal_bottom_space" />
        </OuiDraggable>
      </div>
    </Transition>
  </Teleport>
</template>
