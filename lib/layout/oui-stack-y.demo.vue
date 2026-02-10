<script lang="ts" setup>
import OuiStackY from './oui-stack-y.vue'
import OuiCard from '../basic/oui-card.vue'
</script>

<template>
  <OuiCard title="OuiStackY - Vertical Layout">
    <p>Basic vertical stack without gap:</p>
    <OuiStackY style="max-width: 200px">
      <div style="padding: 8px; background: var(--bg-2)">Item 1</div>
      <div style="padding: 8px; background: var(--bg-3)">Item 2</div>
      <div style="padding: 8px; background: var(--bg-2)">Item 3</div>
    </OuiStackY>

    <p style="margin-top: 16px">Vertical stack with 16px gap (converted to 1rem):</p>
    <OuiStackY :gap="16" style="max-width: 200px">
      <div style="padding: 8px; background: var(--bg-2)">Item 1</div>
      <div style="padding: 8px; background: var(--bg-3)">Item 2</div>
      <div style="padding: 8px; background: var(--bg-2)">Item 3</div>
    </OuiStackY>

    <p style="margin-top: 16px">Vertical stack with 8px gap (converted to 0.5rem):</p>
    <OuiStackY :gap="8" style="max-width: 200px">
      <div style="padding: 8px; background: var(--bg-2)">Item 1</div>
      <div style="padding: 8px; background: var(--bg-3)">Item 2</div>
      <div style="padding: 8px; background: var(--bg-2)">Item 3</div>
    </OuiStackY>

    <p style="margin-top: 16px">Vertical stack with custom gap (1.5rem):</p>
    <OuiStackY gap="1.5rem" style="max-width: 200px">
      <div style="padding: 8px; background: var(--bg-2)">Item 1</div>
      <div style="padding: 8px; background: var(--bg-3)">Item 2</div>
      <div style="padding: 8px; background: var(--bg-2)">Item 3</div>
    </OuiStackY>
  </OuiCard>
</template>
