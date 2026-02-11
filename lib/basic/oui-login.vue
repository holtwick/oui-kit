<script lang="ts" setup>
import { ref } from 'vue'
import { tt } from '@/basic/i18n'
import OuiButton from './oui-button.vue'
import OuiInput from './oui-input.vue'
import OuiNotice from './oui-notice.vue'
import OuiPassword from './oui-password.vue'

import './oui-login.styl'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  title?: string
}>()

defineEmits<{
  (e: 'login', username: string, password: string): void
}>()

const username = ref('')
const password = ref('')
</script>

<template>
  <OuiNotice :title="title ?? tt('Login', 'oui.login.title')">
    <template v-if="true" #default>
      <p>{{ tt('Welcome, please authorize.', 'oui.login.description') }}</p>
      <div class="oui-login">
        <div class="oui-login-username">
          <OuiInput v-model="username" class="_focus" placeholder="User" name="username" />
        </div>
        <div class="oui-login-password">
          <OuiPassword v-model="password" :show-meter="false" placeholder="Password" name="password" />
        </div>
        <div class="oui-login-button">
          <OuiButton mode="primary" @click="$emit('login', username, password)">
            Login
          </OuiButton>
        </div>
      </div>
    </template>
  </OuiNotice>
</template>
