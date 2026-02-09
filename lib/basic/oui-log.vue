<script lang="ts" setup>
import type { LogMessage } from 'zeed'
import type { OuiTableColumn } from './_types'
import type { LogOui } from './log'
import { computed, ref, watch } from 'vue'
import { browserSelectColorByName, formatMilliseconds, isArray, isString, logMessageFromCompact, Uint8ArrayToHexDump } from 'zeed'
import OuiTableview from './oui-tableview.vue'

import './oui-log.styl'

const props = withDefaults(defineProps<{
  log: LogOui
  showTime?: boolean
  showTag?: boolean
}>(), {
  showTime: true,
  showTag: true,
})

const selected = ref<number>()

interface RenderMessagesOptions {
  trace?: boolean // = true
  pretty?: boolean // = true
}

function formatMessages(
  messages: any[],
  opt: RenderMessagesOptions = {},
): any[] {
  const { trace = true, pretty = true } = opt
  return messages.map((obj) => {
    if (obj && typeof obj === 'object') {
      if (pretty && (obj instanceof Uint8Array || obj instanceof ArrayBuffer))
        return `\n${Uint8ArrayToHexDump(obj)}\n`
      if (obj instanceof Error) {
        if (!trace)
          return `${obj.name || 'Error'}: ${obj.message}`
        return `${obj.name || 'Error'}: ${obj.message}\n${obj.stack}`
      }
      return obj
    }
    return String(obj)
  })
}

function renderMessages(
  messages: any[],
  opt: RenderMessagesOptions = {},
): any[] {
  return formatMessages(messages, opt) ?? '?'
}

function handlerLogInfo(msg: LogMessage) {
  const name = msg.name || ''
  const color = browserSelectColorByName(name)
  const message = renderMessages(isArray(msg.messages) ? msg.messages : [msg.messages], { pretty: true })
  // const message = msg.messages
  return {
    ...msg,
    name,
    color,
    background: {
      1: '#d4f4ff',
      2: '#ffedbd',
      3: '#ffaab0',
      4: '#ffbbe9',
    }[msg.level] ?? 'transparent',
    message,
  }
}

const logs = ref<any>([])

function updateLogs() {
  const ll: LogMessage[] = [...props.log.messages]
  const first = ll[0]
  const compact = isArray(first)
  let timestamp = (compact ? first[0] : first?.timestamp) ?? 0
  // const date = new Date(timestamp).toLocaleString()
  logs.value = ll.map((_info: any) => {
    const info = compact ? logMessageFromCompact(_info) : _info
    const { name, message, color, background } = handlerLogInfo(info)
    const diff = Math.abs(timestamp - (info.timestamp ?? 0))
    timestamp = (info.timestamp ?? 0)
    const timeDiffString = diff && `+${formatMilliseconds(diff)}`
    const datetime = new Date(info.timestamp).toLocaleString('de')
    return {
      ...info,
      diff,
      datetime,
      timeDiffString,
      name,
      message,
      color,
      background,
    }
  })
}

watch(() => props.log.messages.length, updateLogs)

updateLogs()

const columns = computed(() => {
  const cols: OuiTableColumn[] = []
  if (props.showTime)
    cols.push({ title: 'Time', name: 'time', sortable: false, width: 96, align: 'right' })
  if (props.showTag)
    cols.push({ title: 'Tag', name: 'tag', sortable: false })
  cols.push({ title: 'Message', name: 'message', sortable: false })
  return cols
})

// const selectedItem = computed(() => list.value[selected.value ?? -1])
</script>

<template>
  <OuiTableview
    v-model="selected"
    class="oui-log"
    name="log-table"
    selectable
    :data="logs"
    :columns="columns"
    :row-height="23"
    :row-attrs="(item: any) => ({ style: `background: ${item.background}` })"
    :header="false"
    :scroll-to-end="true"
    :resizeable="false"
  >
    <template #col-time="{ item }">
      <span style="color: #888; white-space:pre">
        {{ item.diff ? item.timeDiffString : '' }}
      </span>
    </template>
    <template #col-tag="{ item }">
      <span :style="{ color: item.color, whiteSpace: 'pre', fontWeight: 600 }">
        {{ item.name }}
      </span>
    </template>
    <template #col-message="{ item }">
      <span>
        <template v-for="(o, i) in item.message" :key="i">
          <template v-if="isString(o)">
            <b v-if="+i % 2 !== 0" style="font-weight:600;">{{ o.slice(0, 255) }}</b>
            <span v-else>{{ o.slice(0, 255) }}</span>
          </template>
          <template v-else>
            <!-- <b>{{ JSON.stringify(o) }}</b> -->
            <span class="code">&lt;{{ o?.__class ?? typeof o }}&gt;</span>
            <!-- <OuiObject :value="o" /> -->
          </template>
          {{ ' ' }}
        </template>
      </span>
    </template>
  </OuiTableview>
</template>
