<script lang="ts" setup generic="K extends string, T extends Record<K, any>">
// Derived from https://github.com/waningflow/vue3-virtual-list
// Which is under MIT License https://github.com/waningflow/vue3-virtual-list/blob/master/package.json#L11

import { useResizeObserver } from '@vueuse/core'
import { onMounted, ref, toRefs, watch } from 'vue'
import { debounce } from 'zeed'
import { px } from './lib'

import './oui-virtual-list.styl'

const props = withDefaults(defineProps<{
  data: T[]
  rowHeight?: number
  rowBuffer?: number
  scrollToEnd?: boolean
  emitDelay?: number
}>(), {
  rowHeight: 20,
  rowBuffer: 5,
  scrollToEnd: false,
  emitDelay: 100,
})

const emit = defineEmits<{
  scrollX: [number]
  visible: [offset: number, limit: number]
}>()

// const log: LoggerInterface = Logger('oui-virtual-list')

const { data, rowBuffer, rowHeight } = toRefs(props)
const root = ref<HTMLElement>()
const margin = /* props.margin ?? */ 0
const poolSteps = Math.ceil(rowBuffer.value / 10) * 2
const scrollHeight = ref(data.value.length * rowHeight.value + 2 * margin)
const indexFirst = ref(0)
const indexLast = ref(0)
const paddingTop = ref(margin)

let containerSize = 0
let isScrollBusy = false
let lastScrollX = 0
let didUserScroll = false
let lastRootHeight = 0

function handleScroll() {
  // log('handleScroll', isScrollBusy)
  if (!root.value)
    return

  const scrollLeft = root.value.scrollLeft
  if (scrollLeft !== lastScrollX)
    lastScrollX = scrollLeft
    // bus.emit('updateScroll', scrollLeft)

  if (isScrollBusy)
    return

  isScrollBusy = true

  requestAnimationFrame(() => {
    // log('handleScroll', 'requestAnimationFrame')
    isScrollBusy = false
    if (!root.value)
      return
    const range: number[] = []

    range[0] = Math.floor(root.value.scrollTop / rowHeight.value) - Math.floor(rowBuffer.value / 2)
    range[0] = Math.max(range[0], 0)

    range[1] = range[0] + Math.floor(root.value.clientHeight / rowHeight.value) + rowBuffer.value
    range[1] = Math.min(Math.ceil(range[1] / poolSteps) * poolSteps, data.value.length) // don't update too often

    range[0] = Math.max(Math.floor(range[0] / poolSteps) * poolSteps, 0)

    indexFirst.value = range[0]
    indexLast.value = range[1]
    paddingTop.value = range[0] * rowHeight.value + margin

    emit('scrollX', root.value.scrollLeft)

    // Scroll to end
    if (props.scrollToEnd && !isScrollBusy && !didUserScroll) {
      root.value.scrollTop = scrollHeight.value
    }
  })
}

// useOnBus('listScrollTop', () => {
//   if (root.value)
//     root.value.scrollTop = 0
//   handleScroll()
// })

// const emitVisible = throttle(() => emit('visible', indexFirst.value, indexLast.value - indexFirst.value), { delay: props.emitDelay })
const emitVisible = debounce(() => emit('visible', indexFirst.value, indexLast.value - indexFirst.value), { delay: props.emitDelay })

watch(() => [indexFirst.value, indexLast.value], emitVisible)

function scrollToEnd() {
  if (root.value) {
    if (props.scrollToEnd)
      root.value.scrollTop = scrollHeight.value
    else
      root.value.scrollTop = 0
  }
}

watch(() => props.scrollToEnd, scrollToEnd)

watch(() => data.value.length, (l) => {
  scrollHeight.value = l * rowHeight.value
  handleScroll()
})

watch(rowHeight, (cRowHeight) => {
  scrollHeight.value = data.value.length * cRowHeight
})

function handleUserScroll() {
  const bottomScroll = root.value ? root.value.scrollTop + root.value.clientHeight + 1 : 0
  handleScroll()
  didUserScroll = scrollHeight.value > bottomScroll
}

onMounted(() => {
  if (!root.value)
    return
  containerSize = root.value.clientHeight
  lastRootHeight = containerSize
  const contentLines = Math.ceil(containerSize / rowHeight.value)
  const totalLines = contentLines + rowBuffer.value
  const range = [0, totalLines]
  indexFirst.value = range[0]
  indexLast.value = range[0] + range[1]
  scrollToEnd()
})

useResizeObserver(root, (entries) => {
  const entry = entries[0]
  if (!entry)
    return
  const height = entry.contentRect.height
  if (height === lastRootHeight)
    return
  lastRootHeight = height
  handleScroll()
})
</script>

<template>
  <div ref="root" class="oui-virtual-list" @scroll.passive="handleUserScroll">
    <div :style="`height: ${px(scrollHeight)}; padding-top: ${px(paddingTop)}`">
      <template v-for="(item, index) in data.slice(indexFirst, indexLast)" :key="indexFirst + index">
        <div :style="{ height: `${px(rowHeight)}` }">
          <template v-if="item">
            <slot :item="item" :index="indexFirst + index">
              Placeholder {{ index }}
            </slot>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
