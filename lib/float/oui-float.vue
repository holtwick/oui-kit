<script lang="ts" setup>
import type { OffsetOptions, Padding, Placement } from '@floating-ui/vue'
import type { UseElementHoverOptions } from '@vueuse/core'
import type { Ref } from 'vue'
import { arrow as arrowMiddleware, autoUpdate, flip, offset, shift, size, useFloating } from '@floating-ui/vue'
import { onKeyStroke, useElementHover, useEventListener, useFocusWithin } from '@vueuse/core'
import { computed, onBeforeUnmount, ref, useAttrs, watch } from 'vue'

import { isString } from 'zeed'
import './oui-float.styl'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  reference?: Ref<HTMLElement | undefined>
  transition?: string
  placement?: Placement
  arrow?: boolean
  offset?: OffsetOptions
  padding?: Padding
  close?: boolean
  hover?: boolean
  delayEnter?: number
  delayLeave?: number
}>()

const emit = defineEmits<{
  close: []
  dblclick: [e: MouseEvent]
}>()

const slots = defineSlots<{
  default: () => any
  click: (props: { active: boolean }) => any
  hover: (props: { active: boolean }) => any
  trigger: (props: { active: boolean }) => any
}>()

const active = defineModel<boolean>()

// Floating

const slotReference = ref()
const reference = computed<any>(() => slotReference.value ?? props.reference)

const floating = ref()
const floatingArrow = ref()

const placement = computed<Placement>(() => props.placement ?? 'top')

// https://floating-ui.com/docs/vue
const { floatingStyles, middlewareData, placement: placementActual } = useFloating(reference, floating, {
  placement,
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(isString(props.offset) ? +props.offset : props.offset ?? 0),
    size(),
    flip(),
    shift({
      padding: props.padding ?? 16,
    }),
    arrowMiddleware({
      element: floatingArrow,
    }),
  ],
})

// Close

watch(active, (v) => {
  if (v === false)
    emit('close')
})

async function doClose(e?: Event) {
  if (props.close && active.value) {
    e?.preventDefault()
    e?.stopPropagation()
    active.value = false
  }
}

onKeyStroke('Escape', e => doClose (e))

let timeout: any

useEventListener('pointerup', (e) => {
  if (!active.value)
    return undefined
  if (floating?.value?.contains?.(e.target) === true)
    return undefined
  if (reference?.value?.contains?.(e.target) === true)
    return undefined
  timeout = setTimeout(() => active.value = false, 50)
  // active.value = false
}, {
  passive: true,
})

onBeforeUnmount(() => clearTimeout(timeout))

// onClickOutside(floating, e => doClose(e))

// Name

const attrs = useAttrs()
const name = computed(() => String(attrs.class || 'oui-float').split(/\s+/g)?.[0])

// Click Slot

function toggle(ev: MouseEvent) {
  active.value = !active.value
  ev.preventDefault()
}

/* magic, we identify the first slot element and add the triggers! */

const triggerSlot = ref()

watch(triggerSlot, (s) => {
  const el = s?.nextElementSibling as HTMLElement
  slotReference.value = el

  el?.addEventListener('dblclick', toggle)
  el?.addEventListener('click', toggle)
  el?.addEventListener('contextmenu', toggle)

  if (s && !el)
    console.error('#click slot requires at least one element!')
})

const hoverProps: UseElementHoverOptions = {
  delayLeave: props.delayLeave ?? 250,
  delayEnter: props.delayEnter ?? 0,
}

const hoverFloating = useElementHover(floating, hoverProps)
const hoverReference = useElementHover(reference, hoverProps)
const { focused } = useFocusWithin(floating)

watch(() => ([hoverFloating.value, hoverReference.value, focused.value]), (v) => {
  if (props.hover)
    active.value = !!(hoverFloating.value || hoverReference.value || focused.value)
})
</script>

<template>
  <template v-if="$slots.click">
    <div
      ref="slotReference"
      style="display: inline-block"
      @click.prevent.stop="active = !active"
      @contextmenu.prevent.stop="active = !active"
    >
      <slot name="click" :active="active === true" />
    </div>
  </template>
  <template v-if="$slots.trigger">
    <component :is="$slots.trigger" ref="triggerSlot" :active="active === true" />
  </template>
  <teleport to="body">
    <Transition :name="transition ?? `${name}-transition`">
      <div v-show="active" ref="floating" :style="floatingStyles" :class="$attrs.class || 'oui-float'" v-bind="$attrs" class="_float">
        <div
          v-show="arrow ?? false"
          ref="floatingArrow"
          class="_float_arrow"
          :class="`_float_arrow_${placementActual}`"
          :style="{
            position: 'absolute',
            left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : '',
            top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : '',
          }"
        />
        <div class="_float_inner">
          <slot />
        </div>
      </div>
    </Transition>
  </teleport>
</template>
