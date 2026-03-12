const _focusableSelectors = [
  'a[href]',
  'area[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '*[tabindex]',
  '*[contenteditable]',
]

let focusableSelectors: undefined | string

function findFocusable(element: HTMLElement): HTMLElement[] {
  if (!element)
    return []
  focusableSelectors ??= _focusableSelectors.join(',')
  return [...element.querySelectorAll(focusableSelectors!)] as any
}

let onKeyDown: any

function bind(el: HTMLElement, { value = true }) {
  if (value && el) {
    onKeyDown = (event: KeyboardEvent) => {
      const focusable: HTMLElement[] = findFocusable(el)
      const currentFocus = document.querySelector(':focus')
      let index = focusable.findIndex((f: Node) => f.isSameNode(currentFocus))
      const length = focusable.length
      if (event.key === 'Tab') {
        event.preventDefault()
        if (!event.shiftKey) {
          ++index
          if (index >= length)
            index = 0
        }
        else {
          --index
          if (index <= 0)
            index = length - 1
        }
        focusable[index].focus()
      }
    }
    el.addEventListener('keydown', onKeyDown)
  }
}

function unbind(el: HTMLElement) {
  el?.removeEventListener('keydown', onKeyDown)
}

export const vFocustrap = {
  beforeMount: bind,
  unMount: unbind,
}
