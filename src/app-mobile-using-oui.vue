<script lang="ts" setup>
import { ref } from 'vue'
import { tt } from '@/basic/i18n'
import { emitNotification, emitNotificationError, emitNotificationWarn, ouiAlert, OuiButton, ouiConfirm, OuiMobileActivator, OuiNotice, OuiNotificationActivator, OuiPassword, ouiPrompt, OuiText } from '@/lib'
import OuiInput from '../lib/basic/oui-input.vue'
import './app-mobile-using-oui.styl'

const showPasswordNotice = ref(false)
const password = ref('')
const text = ref('')
const result = ref<string | undefined>()

async function doAlert() {
  await ouiAlert('Hello from Oui!')
  result.value = 'Alert dismissed'
}

async function doConfirm() {
  const ok = await ouiConfirm('Are you sure you want to continue?')
  result.value = ok ? 'Confirmed ✓' : 'Cancelled ✗'
}

async function doPrompt() {
  const value = await ouiPrompt('Enter your name:')
  result.value = value != null ? `Name entered: ${value}` : 'Prompt cancelled'
}

function doPasswordNotice() {
  password.value = ''
  showPasswordNotice.value = true
}

function doPasswordSubmit() {
  result.value = `Password accepted (length: ${password.value.length})`
  showPasswordNotice.value = false
}

function doNotification() {
  emitNotification({
    title: 'Info',
    message: 'This is a test notification that disappears after 3 seconds.',
    timeout: 3000,
  })
}

function doNotificationWarn() {
  emitNotificationWarn('Warning', 'Something needs your attention!', 4000)
}

function doNotificationError() {
  emitNotificationError('Error', 'Something went wrong.')
}
</script>

<template>
  <OuiMobileActivator />
  <OuiNotificationActivator />
  <!-- Password notice overlay – auto-focuses the password field -->
  <OuiNotice
    v-if="showPasswordNotice"
    cover
    :title="tt('Authentication Required', 'oui.appMobileUsingOui.noticeTitle')"
  >
    <OuiText>
      <p>{{ tt('Please enter your password to continue.', 'oui.appMobileUsingOui.noticeMessage') }}</p>
      <OuiPassword
        v-model="password"
        class="_focus"
        :show-meter="false"
        :title="tt('Password', 'oui.appMobileUsingOui.passwordLabel')"
        @keypress.enter="doPasswordSubmit"
      />
      <div class="demo-notice-actions">
        <OuiButton mode="neutral" @click="showPasswordNotice = false">
          {{ tt('Cancel', 'oui.appMobileUsingOui.cancel') }}
        </OuiButton>
        <OuiButton mode="primary" @click="doPasswordSubmit">
          {{ tt('Unlock', 'oui.appMobileUsingOui.unlock') }}
        </OuiButton>
      </div>
    </OuiText>
  </OuiNotice>

  <div class="app-mobile">
    <!-- <div class="box">
&nbsp;
    </div> -->
    <header>
      {{ tt('Demo App', 'oui.appMobileUsingOui.header') }}
    </header>
    <main data-scroll="true">
      <!-- Dialogs -->
      <section class="demo-section">
        <h3>{{ tt('Dialogs', 'oui.appMobileUsingOui.dialogsSection') }}</h3>
        <div class="demo-buttons">
          <OuiButton @click="doAlert">
            {{ tt('Alert', 'oui.appMobileUsingOui.alertButton') }}
          </OuiButton>
          <OuiButton @click="doConfirm">
            {{ tt('Confirm', 'oui.appMobileUsingOui.confirmButton') }}
          </OuiButton>
          <OuiButton @click="doPrompt">
            {{ tt('Prompt (auto-focus)', 'oui.appMobileUsingOui.promptButton') }}
          </OuiButton>
        </div>
      </section>

      <!-- Notice overlay -->
      <section class="demo-section">
        <h3>{{ tt('Notice Overlay', 'oui.appMobileUsingOui.noticeSection') }}</h3>
        <div class="demo-buttons">
          <OuiButton @click="doPasswordNotice">
            {{ tt('Password (auto-focus)', 'oui.appMobileUsingOui.passwordButton') }}
          </OuiButton>
        </div>
      </section>

      <!-- Notifications -->
      <section class="demo-section">
        <h3>{{ tt('Notifications', 'oui.appMobileUsingOui.notificationsSection') }}</h3>
        <div class="demo-buttons">
          <OuiButton @click="doNotification">
            {{ tt('Info', 'oui.appMobileUsingOui.infoButton') }}
          </OuiButton>
          <OuiButton @click="doNotificationWarn">
            {{ tt('Warning', 'oui.appMobileUsingOui.warnButton') }}
          </OuiButton>
          <OuiButton @click="doNotificationError">
            {{ tt('Error', 'oui.appMobileUsingOui.errorButton') }}
          </OuiButton>
        </div>
      </section>

      <!-- Result display -->
      <section v-if="result" class="demo-section demo-result">
        <strong>{{ tt('Last result:', 'oui.appMobileUsingOui.lastResult') }}</strong>
        {{ result }}
      </section>

      <!-- Scrollable list (to test mobile scroll + input focus) -->
      <section class="demo-section">
        <h3>{{ tt('Scrollable List', 'oui.appMobileUsingOui.listSection') }}</h3>
        <ol>
          <template v-for="i in 30" :key="i">
            <li>
              <OuiInput v-model="text" />
              {{ i }} Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus at voluptatem, optio nihil
              facere dolorum, porro excepturi ducimus cupiditate, odio officiis laboriosam exercitationem tempore voluptas
              repellat corporis ex accusamus iste!
              <!-- <select>
                <option value="1">
                  1
                </option>
                <option value="2">
                  2
                </option>
                <option value="3">
                  3
                </option>
              </select> -->
            </li>
          </template>
        </ol>
      </section>
    </main>
    <footer>
      {{ tt('Footer', 'oui.appMobileUsingOui.footer') }}
    </footer>
  </div>
</template>
