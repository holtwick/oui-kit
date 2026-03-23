# oui-login

A login form built on `OuiNotice`. Handles three visual states: idle, checking (loading), and failed (error + shake animation).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'Login'` | Title shown at the top of the notice. |
| `checking` | `boolean` | `undefined` | Disables the form and shows a loading spinner inside the button while the login is being verified. |
| `error` | `string` | `undefined` | Error message shown when login fails. Setting this triggers a shake animation on the form. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `login` | `(username: string, password: string)` | Emitted when the user clicks the button or presses Enter in any field. |

## Example

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { OuiLogin } from 'oui-kit'

const checking = ref(false)
const error = ref<string | undefined>()

async function handleLogin(username: string, password: string) {
  checking.value = true
  error.value = undefined
  try {
    await authenticate(username, password)
  }
  catch {
    error.value = 'Invalid username or password.'
  }
  finally {
    checking.value = false
  }
}
</script>

<template>
  <OuiLogin
    title="Sign In"
    :checking="checking"
    :error="error"
    @login="handleLogin"
  />
</template>
```

## States

| State | How to trigger | What happens |
|-------|---------------|--------------|
| Idle | default | Form is interactive |
| Checking | `:checking="true"` | Inputs + button disabled, spinner shown in button |
| Failed | `:error="'…'"` | Error message appears, form shakes once |

## CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--oui-login-error-fg` | `var(--p1-fg)` | Error text colour |
| `--oui-login-error-bg` | `#fef2f2` | Error box background |
| `--oui-login-error-border` | `#fca5a5` | Error box border colour |
