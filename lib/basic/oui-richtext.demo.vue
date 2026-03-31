<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiDemo, OuiRichtext } from '../lib'

const state = reactive({
  value: '<p>Hello <strong>World</strong></p>',
  title: 'Rich Text',
  placeholder: 'Schreibe etwas...',
  disabled: false,
})

const mentions = ['Vorname', 'Nachname', 'Email', 'Firma', 'Anrede']
</script>

<template>
  <div>
    <OuiRichtext
      v-model="state.value"
      :title="state.title"
      :placeholder="state.placeholder"
      :disabled="state.disabled"
      :mentions="mentions"
    />
  </div>

  <div style="margin-top: 1rem; padding: 1rem; background: var(--t3-bg); border-radius: 4px;">
    <strong>HTML Output:</strong>
    <pre style="white-space: pre-wrap; margin-top: 0.5rem;">{{ state.value }}</pre>
  </div>

  <OuiDemo :state="state">
    <OuiRichtext v-model="state.value" title="value (editable)" />
  </OuiDemo>
</template>
