import { inject } from 'vue'

// Requires `provide('t', ...)` to be set up in the parent component or app.

/// This is a helper function for cases where we want to directly use the translation key as the default string. The first argument is the translation key, and if no translation is found, it will return the key itself as the default string. Requires `provide('t', ...)` to be set up in the parent component or app.
export function t(id: string, ...args: any): string {
  return (inject('t', (s: string) => String(s)) as any)(id, ...args)
}

/// This is a helper function for cases where we want to provide a default string directly in the code, but still allow for translation. The first argument is the default string, and the second argument is the translation key. Requires `provide('t', ...)` to be set up in the parent component or app.
export function tt(defaultString: string, id: string, ...args: any): string {
  const value = (inject('t', () => String(defaultString)) as any)(id, ...args)
  return value === id ? defaultString : value
}
