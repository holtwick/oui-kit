<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { computed, ref } from 'vue'
import { Logger } from 'zeed'
import { tt } from '@/basic/i18n'
import OuiButton from './oui-button.vue'
import OuiInput from './oui-input.vue'
import OuiNotice from './oui-notice.vue'
import OuiInputPasswordMeter from './oui-password-meter.vue'
import OuiPassword from './oui-password.vue'

import './oui-login-create.styl'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  title?: string
  requireConfirmation?: boolean
}>()

const emit = defineEmits<{
  (e: 'create', username: string, password: string): void
}>()

const log: LoggerInterface = Logger('oui-login-create')

const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const isPasswordMatch = computed(() => {
  if (!props.requireConfirmation)
    return true
  return password.value === confirmPassword.value
})

const isFormValid = computed(() => {
  return username.value.length > 0
    && password.value.length > 0
    && isPasswordMatch.value
})

function handleCreate() {
  if (isFormValid.value) {
    log.info('Creating account for user:', username.value)
    emit('create', username.value, password.value)
  }
}
</script>

<template>
  <OuiNotice :title="title || tt('Create Account', 'oui.loginCreate.title')">
    <template #default>
      <p>{{ tt('Please create your account credentials.', 'oui.loginCreate.description') }}</p>
      <div class="oui-login-create">
        <div class="oui-login-create-username">
          <OuiInput
            v-model="username"
            class="_focus"
            :placeholder="tt('Username', 'oui.loginCreate.usernamePlaceholder')"
            name="username"
          />
        </div>
        <div class="oui-login-create-password">
          <OuiPassword
            v-model="password"
            :placeholder="tt('Password', 'oui.loginCreate.passwordPlaceholder')"
            :show-meter="false"
            name="password"
          />
        </div>
        <div v-if="requireConfirmation" class="oui-login-create-confirm">
          <OuiPassword
            v-model="confirmPassword"
            :placeholder="tt('Confirm Password', 'oui.loginCreate.confirmPasswordPlaceholder')"
            name="confirmPassword"
            :show-meter="false"
          />
          <div v-if="confirmPassword && !isPasswordMatch" class="oui-login-create-error">
            {{ tt('Passwords do not match', 'oui.loginCreate.passwordMismatch') }}
          </div>
        </div>
        <div>
          <OuiInputPasswordMeter :value="password" />
        </div>
        <div class="oui-login-create-button">
          <OuiButton
            mode="primary"
            :disabled="!isFormValid"
            @click="handleCreate"
          >
            {{ tt('Create Account', 'oui.loginCreate.createButton') }}
          </OuiButton>
        </div>
      </div>
    </template>
  </OuiNotice>
</template>
