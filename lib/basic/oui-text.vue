<script lang="ts" setup>
import './oui-text.styl'

defineProps<{
  responsiveTables?: boolean
}>()
</script>

<template>
  <div class="oui-text" :class="{ '_responsive-tables': responsiveTables }">
    <slot />
  </div>
</template>
