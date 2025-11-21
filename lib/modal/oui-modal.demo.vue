<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import { reactive } from 'vue'
import { OuiButton, OuiCheckbox, OuiDemo, OuiInput, OuiModal, OuiSelect, OuiText } from '@/lib'

import './oui-modal.demo.styl'

const state = reactive({
  size: 'normal',
  show: false,
  footer: true,
  forceSheet: false,
  noSheet: false,
  close: true,
  title: 'title',
  header: 'header',
  allowCancel: true,
})

const { width, height } = useWindowSize()
</script>

<template>
  <p class="oui-modal-demo">
    Window width={{ width }}, height={{ height }},
    media=<span class="_mobile">mobile</span><span class="_desktop">desktop</span>
  </p>

  <div style="height:8px; width: 888px; position: absolute; top: 0; left: 0; background: red;">
    <!--  -->
  </div>

  <OuiButton @click="state.show = !state.show">
    Click to show modal
  </OuiButton>

  <template v-for="i in 100" :key="i">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam possimus aut omnis perspiciatis consequuntur at accusantium? Voluptas ab ex quo, omnis, quidem, officiis corporis nostrum perspiciatis ea recusandae reprehenderit fugiat!</p>
  </template>

  <OuiModal
    v-model="state.show"
    :close="state.close"
    :title="state.title"
    :no-sheet="state.noSheet"
    :force-sheet="state.forceSheet"
    :size="state.size as any"
    :allow-cancel="state.allowCancel"
  >
    <template v-if="state.header" #header>
      {{ state.header }}
    </template>
    <template #default>
      <OuiText>
        <p>Some text upfront.</p>
        <p><OuiInput v-model="state.title" /></p>
        <template v-for="i in 100" :key="i">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam possimus aut omnis perspiciatis consequuntur at accusantium? Voluptas ab ex quo, omnis, quidem, officiis corporis nostrum perspiciatis ea recusandae reprehenderit fugiat!</p>
        </template>
      </OuiText>
    </template>
    <template v-if="state.footer" #footer>
      <OuiButton mode="neutral" @click="state.show = false">
        Cancel
      </OuiButton>
      <OuiButton mode="primary" @click="state.show = false">
        OK
      </OuiButton>
    </template>
  </OuiModal>
  <OuiDemo :state="state">
    <OuiCheckbox
      v-model="state.show"
      switch
      title="show"
      description="Actually make the dialog visible"
    />
    <OuiCheckbox
      v-model="state.noSheet"
      switch
      title="noSheet"
      description="Does not switch to sheet-look on mobile"
    />
    <OuiCheckbox
      v-model="state.forceSheet"
      switch
      title="forceSheet"
      description="Forces sheet-look on desktop"
    />
    <OuiCheckbox
      v-model="state.close"
      switch
      title="close"
      description="Shows the close button on top right"
    />
    <OuiCheckbox
      v-model="state.allowCancel"
      switch
      title="allowCancel"
      description="Allows to close the dialog by clicking outside of it or pressing ESC key"
    />
    <OuiInput
      v-model="state.title"
      title="title"
      description="Title is a bold headline on top of the dialog that does not scroll"
    />
    <OuiInput
      v-model="state.header"
      title="header"
      description="Header is like title, but not bold. It may be used for descriptive content."
    />
    <OuiCheckbox
      v-model="state.footer"
      switch
      title="footer"
      description="Show the footer part for demonstration"
    />
    <OuiSelect
      v-model="state.size"
      title="size"
      :options="['small', 'normal', 'large', 'max']"
      description="Three size presets"
    />
  </OuiDemo>
</template>
