<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiAlert, OuiCheckbox, OuiDemo, OuiInput } from '@/lib'

const state = reactive({
  title: 'Heads up!',
  message: 'This is an alert message with some important information.',
  dismissible: true,
  show: true,
})
</script>

<template>
  <OuiDemo :state="state">
    <OuiInput v-model="state.title" title="title" />
    <OuiInput v-model="state.message" title="message" />
    <OuiCheckbox v-model="state.dismissible" title="dismissible" switch />
    <OuiCheckbox v-model="state.show" title="show" switch />
  </OuiDemo>

  <div style="display: flex; flex-direction: column; gap: 0.75rem;">
    <OuiAlert mode="info" :title="state.title" :dismissible="state.dismissible" v-model="state.show">
      {{ state.message }}
    </OuiAlert>
    <OuiAlert mode="success" :title="state.title" :dismissible="state.dismissible" v-model="state.show">
      {{ state.message }}
    </OuiAlert>
    <OuiAlert mode="warn" :title="state.title" :dismissible="state.dismissible" v-model="state.show">
      {{ state.message }}
    </OuiAlert>
    <OuiAlert mode="error" :title="state.title" :dismissible="state.dismissible" v-model="state.show">
      {{ state.message }}
    </OuiAlert>
  </div>
</template>
