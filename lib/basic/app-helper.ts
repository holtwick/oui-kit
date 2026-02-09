import type { App, Component } from 'vue'
import type { LoggerInterface } from 'zeed'
import { createApp } from 'vue'
import { Logger } from 'zeed'

const log: LoggerInterface = Logger('app-helper')

/**
 * Creates a temporary Vue app from a component and mounts it to the DOM.
 * Useful for temporary UI elements like menus, dialogs, or notifications.
 *
 * @template T - The type of value returned when the component is done
 * @param component - The Vue component to mount
 * @param props - Props to pass to the component
 * @param delay - Optional delay in milliseconds before cleanup after done() is called
 * @returns Object containing app instance, done callback, cancel callback, and awaitDone promise
 *
 * @example
 * ```typescript
 * const { done, awaitDone } = mountComponentAsApp(MyMenu, { items: [] })
 * const result = await awaitDone
 * console.log('Menu closed with result:', result)
 * ```
 */
export function mountComponentAsApp<T>(
  component: Component,
  props: Record<string, any>,
  delay?: number,
) {
  let container: HTMLElement | undefined
  let app: App | undefined
  let resolveFn: ((r: any) => void) | undefined
  let isDone = false
  const awaitDone = new Promise<T>(resolve => (resolveFn = resolve))

  /** Call this to dispose everything */
  const done = (value?: any) => {
    if (isDone)
      return
    isDone = true

    let isRemoved = false
    function remove() {
      if (isRemoved)
        return
      isRemoved = true

      try {
        app?.unmount()
        app = undefined
        container?.remove()
        container = undefined
        log('Component unmounted and cleaned up')
      }
      catch (error) {
        log('Error during cleanup:', error)
      }
    }
    if (delay != null && delay > 0)
      setTimeout(remove, delay)
    else
      remove()

    resolveFn?.(value)
    resolveFn = undefined
  }

  const cancel = () => {
    done(undefined)
  }

  // Actually mount the component
  try {
    container = document.createElement('div')
    document.body.appendChild(container)
    app = createApp(component, {
      ...props,
      done,
    })
    app.mount(container)
    log('Component mounted successfully')
  }
  catch (error) {
    log('Error mounting component:', error)
    // Clean up on error
    container?.remove()
    container = undefined
    throw error
  }

  return {
    app,
    done,
    cancel,
    awaitDone,
  }
}
