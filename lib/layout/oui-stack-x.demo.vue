<script lang="ts" setup>
import OuiCard from '../basic/oui-card.vue'
import OuiStackX from './oui-stack-x.vue'
</script>

<template>
  <OuiCard title="OuiStackX - Horizontal Layout">
    <p>Basic horizontal stack without gap:</p>
    <OuiStackX>
      <div style="padding: 8px; background: var(--bg-2)">
        Item 1
      </div>
      <div style="padding: 8px; background: var(--bg-3)">
        Item 2
      </div>
      <div style="padding: 8px; background: var(--bg-2)">
        Item 3
      </div>
    </OuiStackX>

    <p style="margin-top: 16px">
      Horizontal stack with 16px gap (converted to 1rem):
    </p>
    <OuiStackX :gap="16">
      <div style="padding: 8px; background: var(--bg-2)">
        Item 1
      </div>
      <div style="padding: 8px; background: var(--bg-3)">
        Item 2
      </div>
      <div style="padding: 8px; background: var(--bg-2)">
        Item 3
      </div>
    </OuiStackX>

    <p style="margin-top: 16px">
      Horizontal stack with 8px gap (converted to 0.5rem):
    </p>
    <OuiStackX :gap="8">
      <div style="padding: 8px; background: var(--bg-2)">
        Item 1
      </div>
      <div style="padding: 8px; background: var(--bg-3)">
        Item 2
      </div>
      <div style="padding: 8px; background: var(--bg-2)">
        Item 3
      </div>
    </OuiStackX>

    <p style="margin-top: 16px">
      Horizontal stack with custom gap (2rem):
    </p>
    <OuiStackX gap="2rem">
      <div style="padding: 8px; background: var(--bg-2)">
        Item 1
      </div>
      <div style="padding: 8px; background: var(--bg-3)">
        Item 2
      </div>
      <div style="padding: 8px; background: var(--bg-2)">
        Item 3
      </div>
    </OuiStackX>
  </OuiCard>
</template>
