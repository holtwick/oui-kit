<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiCheckbox, OuiDemo, OuiInput, OuiSelect } from '../lib'

const state = reactive({
  value: 'Hello World',
  lazy: true,
  required: false,
  title: 'Title',
  type: 'text',
  clearable: false,

})

const options = [
  // 'button',
  // 'checkbox',
  // 'color',
  'date',
  'datetime-local',
  'email',
  // 'file',
  // 'hidden',
  // 'image',
  'month',
  'number',
  'password',
  // 'radio',
  // 'range',
  // 'reset',
  'search',
  // 'submit',
  'tel',
  'text',
  'time',
  'url',
  'week',
]
</script>

<template>
  <div>
    <OuiInput
      v-model="state.value"
      :lazy="state.lazy"
      :required="state.required"
      :title="state.title"
      :type="state.type"
      :clearable="state.clearable"
    />
  </div>

  <div>
    <OuiInput
      v-model="state.value"
      :lazy="state.lazy"
      :required="state.required"
      :title="state.title"
      :type="state.type"
      clearable
    />
  </div>

  <div>
    <OuiInput
      v-model="state.value"
      :lazy="state.lazy"
      :required="state.required"
      :title="state.title"
      :type="state.type"
    >
      <template #start>
        START
      </template>
      <template #end>
        END
      </template>
    </OuiInput>
  </div>

  <OuiDemo :state="state">
    <OuiInput v-model="state.value" title="value" />
    <OuiInput v-model="state.title" title="title" />
    <OuiCheckbox v-model="state.lazy" switch title="lazy" />
    <OuiCheckbox v-model="state.required" switch title="required" />
    <OuiCheckbox v-model="state.clearable" switch title="clearable" />
    <OuiSelect v-model="state.type" title="type" :options="options" />
  </OuiDemo>
</template>
