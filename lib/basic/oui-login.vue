<script lang="ts" setup>
import { ref, watch } from 'vue'
import { tt } from './i18n'
import OuiAlert from './oui-alert.vue'
import OuiButton from './oui-button.vue'
import OuiInput from './oui-input.vue'
import OuiNotice from './oui-notice.vue'
import OuiPassword from './oui-password.vue'
import OuiWait from './oui-wait.vue'

import './oui-login.styl'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  title?: string
  /** Show a loading spinner and disable the form while the login is being verified. */
  checking?: boolean
  /** Error message to display when login fails. Triggers a shake animation. */
  error?: string
}>()

const emit = defineEmits<{
  (e: 'login', username: string, password: string): void
}>()

const username = ref('')
const password = ref('')
const shake = ref(false)

watch(() => props.error, (val) => {
  if (val) {
    shake.value = true
    setTimeout(() => (shake.value = false), 600)
  }
})

function handleLogin() {
  if (!props.checking)
    emit('login', username.value, password.value)
}
</script>

<template>
  <OuiNotice :title="title ?? tt('Login', 'oui.login.title')">
    <p>{{ tt('Welcome, please authorize.', 'oui.login.description') }}</p>
    <div class="oui-login" :class="{ _shake: shake }">
      <div class="oui-login-username">
        <OuiInput
          v-model="username"
          class="_focus"
          :placeholder="tt('User', 'oui.login.userPlaceholder')"
          name="username"
          :disabled="checking"
          @keyup.enter="handleLogin"
        />
      </div>
      <div class="oui-login-password">
        <OuiPassword
          v-model="password"
          :show-meter="false"
          :placeholder="tt('Password', 'oui.login.passwordPlaceholder')"
          name="password"
          :disabled="checking"
          @keyup.enter="handleLogin"
        />
      </div>
      <OuiAlert v-if="error && !checking" mode="error">
        {{ error }}
      </OuiAlert>
      <div class="oui-login-button">
        <OuiButton mode="primary" :disabled="checking" @click="handleLogin">
          <OuiWait v-if="checking" />
          <span v-else>{{ tt('Login', 'oui.login.button') }}</span>
        </OuiButton>
      </div>
    </div>
  </OuiNotice>
</template>
