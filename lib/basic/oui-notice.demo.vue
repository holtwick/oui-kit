<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiDemo, OuiInput, OuiNotice, OuiPassword, OuiText, OuiTextarea } from '@/lib'
import OuiButton from './oui-button.vue'
import OuiCheckbox from './oui-checkbox.vue'

const state = reactive({
  title: 'Notice',
  message: 'Lorem, ipsum dolor sit amet consectetur elit.\n\nFacilis ullam quis, nulla adipisci esse voluptate dolor aliquam architecto dignissimos necessitatibus quaerat, excepturi laborum, debitis alias veritatis enim fugiat exercitationem consectetur!',
  footer: 'Need help? <a href="#">Contact support</a>',
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  cover: false,
  demoInput: '',
  showNotice: true,
  showTitle: true,
  showIcon: true,
  showFooter: true,
  iconColor: 'red',
})

function doCover() {
  state.cover = true
  setTimeout(() => state.cover = false, 3000)
}
</script>

<template>
  <OuiNotice :title="state.showTitle ? state.title : undefined" :cover="state.cover" :style="{ '--notice-fg': state.iconColor }">
    <template v-if="state.showIcon" #icon>
      <div v-html="state.icon" />
    </template>
    <template v-if="state.showNotice" #default>
      <OuiText>
        <p>{{ state.message }}</p>
        <p>
          <OuiPassword v-model="state.demoInput" class="_focus" :show-meter="false" />
        </p>
      </OuiText>
    </template>
    <template v-if="state.showFooter" #footer>
      <OuiText><span v-html="state.footer" /></OuiText>
    </template>
  </OuiNotice>
  <OuiDemo :state="state">
    <OuiCheckbox v-model="state.showIcon" switch title="Show Icon" />
    <OuiCheckbox v-model="state.showTitle" switch title="Show Title" />
    <OuiCheckbox v-model="state.showNotice" switch title="Show Notice" />
    <OuiCheckbox v-model="state.showFooter" switch title="Show Footer" />
    <OuiInput v-model="state.title" title="Title" />
    <OuiTextarea v-model="state.message" title="Message" />
    <OuiTextarea v-model="state.icon" title="Icon" />
    <OuiButton @click="doCover">
      Cover for 3s
    </OuiButton>
    <OuiInput v-model="state.iconColor" title="iconColor" />
    <OuiInput v-model="state.footer" title="Footer (HTML)" />
  </OuiDemo>
</template>
