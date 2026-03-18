<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { useEventListener } from '@vueuse/core'
import { nextTick, onMounted } from 'vue'
import { Logger } from 'zeed'
import { useSingleton } from '../basic/singleton'
import { isInsideScrollable } from './drag-util'

import './oui-mobile.styl'

const props = defineProps<{
  mode?: 'app' | 'body'
}>()

function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

function isAndroid(): boolean {
  return /Android/.test(navigator.userAgent)
}

function isMobile(): boolean {
  return isIOS() || isAndroid() || /Mobile|Tablet/.test(navigator.userAgent)
}

const log: LoggerInterface = Logger('oui-mobile')

/**
 * 400ms takes the virtual keyboard to show up,
 * other values seem to have an negative effect on the layout
 */
const keyboardAnimationDuration = 400

function isActive() {
  return document.documentElement.classList.contains('oui-mobile')
}

if (useSingleton('oui-mobile') && isMobile()) {
  log('init')

  if (window.visualViewport != null) {
    let timer: any
    let virtualKeyboardActive = false

    async function resizeHandler() {
      if (!isActive())
        return
      try {
        // Reset any iOS-induced window scroll (happens even with overflow:hidden).
        // visualViewport.scroll fires when iOS shifts the visual viewport to show
        // a focused input above the keyboard – scrollTo(0,0) cancels that shift.
        if (window.scrollY !== 0)
          window.scrollTo(0, 0)

        // Adjust the height!
        const newHeight = window.visualViewport?.height ?? 0
        const prevHeight = Number.parseFloat(document.documentElement.style.getPropertyValue('--visible-height') || '0')
        // Only animate when keyboard appears (height shrinks), not when it hides (height grows)
        if (newHeight < prevHeight)
          document.documentElement.classList.add('virtual-keyboard-transition')
        else
          document.documentElement.classList.remove('virtual-keyboard-transition')

        const height = `${newHeight}px`
        log(`resize height=${height}`)
        document.documentElement.style.setProperty('--visible-height', height)

        await nextTick()

        // Try to guess, if the virtual keyboard did show up
        // https://stackoverflow.com/questions/497094/how-do-i-find-out-which-dom-element-has-the-focus
        virtualKeyboardActive = document.activeElement?.matches('input,textarea,[contenteditable]') ?? false
        if (virtualKeyboardActive) {
          document.documentElement.classList.add('virtual-keyboard')
          clearTimeout(timer)

          // With some delay scroll active/focussed element into view
          timer = setTimeout(() => {
            if (document.activeElement?.matches('input,textarea,[contenteditable]')) {
              log('scroll into view', document.activeElement)
              document.activeElement?.scrollIntoView({
                // behavior: 'smooth',
                behavior: 'instant',
                block: 'nearest',
                inline: 'nearest',
              })
            }
          }, keyboardAnimationDuration)
        }
        else {
          document.documentElement.classList.remove('virtual-keyboard')
        }
      }
      catch (err) {
        log.error('resizeHandler issue', err)
      }
    }

    try {
      useEventListener(window.visualViewport, 'resize', resizeHandler)
      useEventListener(window.visualViewport, 'scroll', resizeHandler)

      // Intercept taps on non-focused inputs: prevent Safari's native focus+scroll,
      // apply our own focus({ preventScroll: true }) instead. The keyboard still
      // opens because we're synchronously inside a user-gesture handler.
      // Only active when keyboard is currently closed (no input already focused).
      useEventListener(window, 'touchend', (ev) => {
        if (!isActive())
          return
        const target = ev.target as HTMLElement
        if (!target?.matches('input,textarea,[contenteditable]'))
          return
        if (document.activeElement?.matches('input,textarea,[contenteditable]'))
          return
        ev.preventDefault()
        target.focus({ preventScroll: true })
      }, { capture: true, passive: false })

      // if (props.mode === 'app') {
      // Intercept `touchmove` where no scrolling is planned in our UI
      useEventListener(window, 'touchmove', (ev) => {
        if (!isActive())
          return

        log('touch move', ev.target)

        // if (virtualKeyboardActive === false)
        //   return

        if (isInsideScrollable(ev.target as any))
          return

        log('prevent scroll')
        // If not avoid scrolling
        ev.preventDefault()
      // ev.stopPropagation()
      }, {
      // make sure, we get those events
        passive: false,
        // capture them as early as possible
        capture: true,
      })
      // }

      onMounted(resizeHandler)
    }
    catch (err) {
      log.error('init issue', err)
    }
  }

  onMounted(() => {
    document.documentElement.classList.add('oui-mobile')
    document.documentElement.classList.add('oui-mobile-supported')
  })
  // document.documentElement.classList.add('oui-mobile')
}
</script>

<template>
  <Teleport to="body" />
</template>
