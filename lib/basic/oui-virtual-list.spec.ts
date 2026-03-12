import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import OuiVirtualList from './oui-virtual-list.vue'

describe('ouiVirtualList', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders more rows when root height increases', async () => {
    class TestResizeObserver {
      static instances: TestResizeObserver[] = []

      callback: ResizeObserverCallback

      constructor(callback: ResizeObserverCallback) {
        this.callback = callback
        TestResizeObserver.instances.push(this)
      }

      observe() {
      }

      unobserve() {
      }

      disconnect() {
      }
    }

    vi.stubGlobal('ResizeObserver', TestResizeObserver)
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      cb(0)
      return 0
    })

    const data = Array.from({ length: 200 }, (_, i) => ({ id: i }))

    const wrapper = mount(OuiVirtualList as any, {
      props: {
        data,
        rowHeight: 20,
        rowBuffer: 5,
      },
    })

    const root = wrapper.find('.oui-virtual-list').element as HTMLElement
    let clientHeight = 20

    Object.defineProperty(root, 'clientHeight', {
      configurable: true,
      get: () => clientHeight,
    })

    await wrapper.vm.$nextTick()

    const countRows = () => wrapper.findAll('.oui-virtual-list > div > div').length

    const initialRows = countRows()

    clientHeight = 120
    const observer = TestResizeObserver.instances[0]
    observer.callback([
      {
        contentRect: {
          height: clientHeight,
          width: 0,
          x: 0,
          y: 0,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          toJSON: () => ({}),
        },
      } as ResizeObserverEntry,
    ], observer as unknown as ResizeObserver)

    await wrapper.vm.$nextTick()

    const resizedRows = countRows()

    expect(resizedRows).toBeGreaterThan(initialRows)
  })
})
