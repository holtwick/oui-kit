<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiCard } from '@/lib'
import OuiCheckbox from './oui-checkbox.vue'
import OuiInput from './oui-input.vue'

const state = reactive({
  checked: false,
  text: 'Some text',
})
</script>

<template>
  <div class="-y -gap">
    <OuiCard title="Sample Card">
      Hello
    </OuiCard>

    <OuiCard>
      <template #title>
        <div>Slot title</div>
      </template>
      Hello
    </OuiCard>

    <OuiCard title="Collapsible Card" collapsible>
      <OuiInput v-model="state.text" label="Text input" title="Sample" description="Some text" required />
      <OuiCheckbox v-model="state.checked" label="Check me" title="Sample">
        <template #description>
          <em>Some</em> description <a href="#">Link</a>
        </template>
      </OuiCheckbox>
      <OuiInput v-model="state.text" label="Text input" title="Sample" required>
        <template #description>
          <em>Some</em> description <a href="#">Link</a>
        </template>
      </OuiInput>
    </OuiCard>

    <OuiCard title="Collapsible Card (Initially Collapsed, then persisted)" collapsible :collapsed="true" name="demo-card-1">
      <p>This card starts collapsed</p>
    </OuiCard>

    <OuiCard title="Collapsible Card (No Arrow)" collapsible hide-arrow>
      <p>This card has no arrow indicator</p>
    </OuiCard>

    <OuiCard title="Regular Card with Form">
      <OuiInput v-model="state.text" label="Text input" title="Sample" description="Some text" required />
      <OuiCheckbox v-model="state.checked" label="Check me" title="Sample">
        <template #description>
          <em>Some</em> description <a href="#">Link</a>
        </template>
      </OuiCheckbox>
    </OuiCard>

    <!-- Nested Cards -->
    <OuiCard title="Parent Card" collapsible>
      <p>This is the parent card content.</p>
      <OuiCard title="Child Card" collapsible :collapsed="true">
        <p>This is the child card content.</p>
      </OuiCard>
    </OuiCard>
  </div>
</template>
