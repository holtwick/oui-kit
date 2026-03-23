<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiCheckbox, OuiDemo, OuiInput, OuiLogin } from '@/lib'

const state = reactive({
  title: 'Sign In',
  checking: false,
  error: '',
  username: '',
  password: '',
  loggedInAs: '',
})

async function handleLogin(username: string, password: string) {
  state.username = username
  state.password = password
  state.checking = true
  state.error = ''
  state.loggedInAs = ''

  await new Promise(r => setTimeout(r, 1500))

  if (username === 'admin' && password === 'admin') {
    state.loggedInAs = username
  }
  else {
    state.error = 'Invalid username or password.'
  }

  state.checking = false
}

function handleLogout() {
  state.loggedInAs = ''
  state.error = ''
}
</script>

<template>
  <OuiDemo :state="state">
    <OuiInput v-model="state.title" title="title" />
    <OuiInput v-model="state.error" title="error" />
    <OuiCheckbox v-model="state.checking" title="checking" switch />
  </OuiDemo>

  <div v-if="state.loggedInAs" style="padding: 1rem; text-align: center;">
    <p>Logged in as <strong>{{ state.loggedInAs }}</strong></p>
    <button @click="handleLogout">
      Logout
    </button>
  </div>
  <OuiLogin
    v-else
    :title="state.title"
    :checking="state.checking"
    :error="state.error || undefined"
    @login="handleLogin"
  />
</template>
