<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiCheckbox, OuiDemo, OuiInput, OuiRichtext } from '../lib'

const state = reactive({
  value: '<p>Hello <strong>World</strong></p>',
  title: 'Rich Text',
  description: 'Markiere Text fuer Formatierung. Tippe @ fuer Platzhalter.',
  placeholder: 'Schreibe etwas...',
  disabled: false,
  required: false,
  bordered: true,
  allowCustomMentions: true,
})

const mentions = reactive(['Vorname', 'Nachname', 'Email', 'Firma', 'Anrede'])

function onMention(name: string) {
  if (!mentions.includes(name))
    mentions.push(name)
}
</script>

<template>
  <div>
    <OuiRichtext
      v-model="state.value"
      :title="state.title"
      :description="state.description"
      :placeholder="state.placeholder"
      :disabled="state.disabled"
      :required="state.required"
      :bordered="state.bordered"
      :allow-custom-mentions="state.allowCustomMentions"
      :mentions="mentions"
      @mention="onMention"
    />
  </div>

  <!-- <div>
    <OuiRichtext
      v-model="state.value"
      title="Ohne Rahmen"
      description="bordered=false"
      :bordered="false"
      :mentions="mentions"
    />
  </div> -->

  <div style="margin-top: 1rem; padding: 1rem; background: var(--t3-bg); border-radius: 4px;">
    <strong>HTML Output:</strong>
    <pre style="white-space: pre-wrap; margin-top: 0.5rem;">{{ state.value }}</pre>
  </div>

  <OuiDemo :state="state">
    <OuiInput v-model="state.title" title="title" />
    <OuiInput v-model="state.description" title="description" />
    <OuiInput v-model="state.placeholder" title="placeholder" />
    <OuiCheckbox v-model="state.disabled" switch title="disabled" />
    <OuiCheckbox v-model="state.required" switch title="required" />
    <OuiCheckbox v-model="state.bordered" switch title="bordered" />
    <OuiCheckbox v-model="state.allowCustomMentions" switch title="allowCustomMentions" />
  </OuiDemo>
</template>
