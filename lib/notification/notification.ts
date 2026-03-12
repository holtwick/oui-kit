import type { Ref } from 'vue'
import type { LoggerInterface } from 'zeed'
import type { AppNotificationInfo, AppNotificationSetup } from './_types'
import { reactive, ref } from 'vue'
import { Logger, uname } from 'zeed'

const LIMIT = 6
const log: LoggerInterface = Logger('notification')

export const notifications: Ref<AppNotificationInfo[]> = ref([])

export function closeNotification(id?: string) {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index >= 0) {
    notifications.value[index]?.onClose?.()
    notifications.value.splice(index, 1)
  }
  else {
    log.warn(`Notification with id ${id} not found for closing`)
  }
}

export function _emitNotification(n: AppNotificationSetup): AppNotificationInfo {
  if (!n.id)
    n.id = uname('oui-notification')
  if (!n.active)
    n.active = true
  if (!n.icon)
    n.icon = 'info'
  if (!n.mode)
    n.mode = 'info'
  n.timeout ??= 5 * 1000

  if (n.timeout > 0) {
    log(`Notification ${n.id} will timeout after ${n.timeout}ms`)
    setTimeout(() => {
      log(`Notification ${n.id} timed out after ${n.timeout}ms`)
      n.active = false
      closeNotification(n.id)
    }, n.timeout)
  }

  const ni = n as AppNotificationInfo

  ni.action = () => {
    ni.onAction?.()
    closeNotification(ni.id)
  }

  ni.action2 = () => {
    ni.onAction2?.()
    closeNotification(ni.id)
  }

  ni.close = () => {
    ni.onCancel?.()
    closeNotification(ni.id)
  }

  // Delay a bit, so the focus is more on the new entry for now
  setTimeout(() => {
    if (notifications.value.length > LIMIT)
      notifications.value.pop()
  }, 1500)

  notifications.value.unshift(ni)
  return ni
}

export function emitNotification(n: AppNotificationSetup): AppNotificationInfo {
  return _emitNotification(n)
}

export function emitNotificationWarn(
  title: string,
  message?: string,
  timeout = -1,
): AppNotificationInfo {
  return emitNotification({
    icon: 'warning',
    mode: 'warn',
    title,
    message,
    timeout,
  })
}

export function emitNotificationError(
  title: string,
  message?: string,
  timeout = -1,
): AppNotificationInfo {
  return emitNotification({
    icon: 'warning',
    mode: 'error',
    title,
    message,
    timeout,
  })
}

export const developerLog = reactive<any[]>([])

export function emitNotificationInfo(
  title: string,
  message?: string,
  timeout = -1,
): AppNotificationInfo | undefined {
  // if (DEBUG) {
  developerLog.unshift({ title, message })
  return emitNotification({
    title,
    message,
    timeout,
  })
  // }
}

export function useNotification(
  n: AppNotificationSetup = {
    title: 'title is missing!',
  },
) {
  return (nn: AppNotificationInfo) => {
    emitNotification({ ...n, ...nn })
  }
}
