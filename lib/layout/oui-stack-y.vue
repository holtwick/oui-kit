<script lang="ts" setup>
import { rex } from '../basic/lib'
import './oui-stack-y.styl'

defineProps<{
  gap?: string | number
}>()
</script>

<template>
  <div class="oui-stack-y" :style="gap ? { gap: typeof gap === 'number' ? rex(gap) : gap } : undefined">
    <slot />
  </div>
</template>
