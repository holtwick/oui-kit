<script lang="ts" setup>
import OuiCard from '../basic/oui-card.vue'
import OuiSpace from './oui-space.vue'
import OuiStackX from './oui-stack-x.vue'
</script>

<template>
  <OuiCard title="OuiSpace - Flexible Space">
    <p>OuiSpace fills available space in a flex container:</p>
    <OuiStackX :gap="8" style="background: var(--bg-1); padding: 8px">
      <div style="padding: 8px; background: var(--bg-2)">
        Fixed Item 1
      </div>
      <OuiSpace style="background: var(--bg-3); padding: 8px">
        Flexible Space
      </OuiSpace>
      <div style="padding: 8px; background: var(--bg-2)">
        Fixed Item 2
      </div>
    </OuiStackX>

    <p style="margin-top: 16px">
      Multiple spaces distribute evenly:
    </p>
    <OuiStackX :gap="8" style="background: var(--bg-1); padding: 8px">
      <div style="padding: 8px; background: var(--bg-2)">
        Item 1
      </div>
      <OuiSpace style="background: var(--bg-3); padding: 8px">
        Space 1
      </OuiSpace>
      <div style="padding: 8px; background: var(--bg-2)">
        Item 2
      </div>
      <OuiSpace style="background: var(--bg-3); padding: 8px">
        Space 2
      </OuiSpace>
      <div style="padding: 8px; background: var(--bg-2)">
        Item 3
      </div>
    </OuiStackX>

    <p style="margin-top: 16px">
      Empty space for pushing items apart:
    </p>
    <OuiStackX :gap="8" style="background: var(--bg-1); padding: 8px">
      <div style="padding: 8px; background: var(--bg-2)">
        Left
      </div>
      <OuiSpace />
      <div style="padding: 8px; background: var(--bg-2)">
        Right
      </div>
    </OuiStackX>
  </OuiCard>
</template>
