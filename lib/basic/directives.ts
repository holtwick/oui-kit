import type { DirectiveBinding } from 'vue'
import type { LoggerInterface } from 'zeed'
import { ref } from 'vue'
import { Logger } from 'zeed'

const log: LoggerInterface = Logger('directives')

/** Vue3 Directive! Toggle ref value on click or context menu. */
export const vActionToggle = {
  mounted: (el: HTMLElement, binding: DirectiveBinding, ...args: any) => {
    if (binding instanceof ref)
      throw new Error('v-action-toggle requires ref as argument')
    el.addEventListener('contextmenu', (ev: MouseEvent) => {
      ev.preventDefault() // no system menu
      binding.value = !binding.value
    })

    el.addEventListener('click', (ev: MouseEvent) => {
      binding.value = !binding.value
    })
  },
}

/** Vue3 Directive! Set ref value to true on click or context menu. */
export const vActionTrue = {
  mounted: (el: HTMLElement, binding: DirectiveBinding) => {
    if (binding instanceof ref)
      throw new Error('v-action-ture requires ref  as argument')
    el.addEventListener('contextmenu', (ev: MouseEvent) => {
      ev.preventDefault() // no system menu
      binding.value = true
    })

    el.addEventListener('click', (ev: MouseEvent) => {
      binding.value = true
    })
  },
}

/** Vue3 Directive! Fixes an issue in WKWebView where the cursor pretends text selection even if user-select: none; */
export const vNoSelection = {
  mounted: (el: HTMLElement, _binding: DirectiveBinding) => {
    log.warn('v-no-selection, use with care! causes issues on draggable!')
    if (!el.draggable) {
      el.addEventListener('pointermove', (ev: MouseEvent) =>
        ev.preventDefault())
    }
  },
}

/** Vue3 Directive! Set focus onMounted. Use with care, causes issues for transitions.  */
export const vAutofocus = {
  mounted: (el: HTMLElement, _binding: DirectiveBinding) => {
    log('focus', el)
    setTimeout(() => el.focus({ preventScroll: true }), 50)
  },
}
