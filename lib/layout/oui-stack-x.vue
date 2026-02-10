<script lang="ts" setup>
import { rex } from '../basic/lib'
import './oui-stack-x.styl'

defineProps<{
  gap?: string | number
}>()
</script>

<template>
  <div class="oui-stack-x" :style="gap ? { gap: typeof gap === 'number' ? rex(gap) : gap } : undefined">
    <slot />
  </div>
</template>
