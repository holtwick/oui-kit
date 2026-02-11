<script lang="ts" setup>
import type { LoggerInterface } from 'zeed'
import { useDropZone, useFileDialog } from '@vueuse/core'
import { ref } from 'vue'
import { createPromise, Logger } from 'zeed'
import { tt } from './i18n'
import OuiClose from './oui-close.vue'
import OuiFormItem from './oui-form-item.vue'

import './oui-file.styl'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  title?: string
  titleChoose?: string
  description?: string

  accept?: string
  // multiple?: boolean
  // preview?: boolean

  disabled?: boolean
  required?: boolean
  id?: string

  openFileDialog?: (options: {
    accept?: string
    multiple?: boolean
  }) => Promise<undefined | {
    dataUri: string
    filename: string
  }>
}>(), {
  accept: 'image/*',
  multiple: false,
  disabled: false,
})

// const emit = defineEmits<{
//   delete: []
// }>()

const log: LoggerInterface = Logger('oui-file')

const dropZoneRef = ref<HTMLDivElement>()

const model = defineModel<string | undefined>({ required: true })
const modelFilename = defineModel<string | undefined>('filename', { required: false })

async function fileToDataURI(file: File): Promise<string | undefined> {
  const [promise, resolve] = createPromise<string | undefined>()
  const fileReader = new FileReader()
  fileReader.addEventListener('error', resolve)
  fileReader.addEventListener('abort', resolve)
  fileReader.addEventListener('loadend', e => resolve(fileReader.result))
  fileReader.readAsDataURL(file)
  const datauri = await promise
  if (datauri) {
    modelFilename.value = file.name
  }
  return datauri
}

async function onDrop(files: File[] | null) {
  if (props.disabled)
    return

  const file = files?.[0]
  if (file) {
    model.value = await fileToDataURI(file)
  }
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: [props.accept],
  multiple: false, // props.multiple,
  preventDefaultForUnhandled: false,
})

const { files, open, reset, onChange } = useFileDialog({
  accept: props.accept,
  multiple: false, // props.multiple,
})

onChange(async () => {
  if (props.disabled)
    return

  const file = files.value?.[0]
  if (file) {
    const url = await fileToDataURI(file)
    log('url', url)
    model.value = url
    reset()
  }
})

async function doSelect() {
  if (props.disabled)
    return

  if (props.openFileDialog) {
    const response = await props.openFileDialog({ accept: props.accept, multiple: false })
    if (response) {
      model.value = response.dataUri
      modelFilename.value = response.filename
    }
  }
  else {
    open()
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    doSelect()
  }
}

function doClear() {
  if (props.disabled)
    return

  model.value = undefined
  modelFilename.value = undefined
}
</script>

<template>
  <OuiFormItem :id="id" :title="title" :description="description" :required="required">
    <!-- Conditionally pass the title slot -->
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>

    <!-- Conditionally pass the description slot -->
    <template v-if="$slots.description" #description>
      <slot name="description" />
    </template>

    <div ref="dropZoneRef" class="oui-input oui-input-container oui-file" :disabled="disabled ? true : undefined" :class="{ _over: isOverDropZone }" :tabindex="disabled ? -1 : 0" @click.prevent="doSelect" @keydown="onKeydown">
      <div class="_content">
        <template v-if="!model || model?.length <= 0">
          <div class="_message">
            <slot>{{ titleChoose ?? tt('Choose file...', 'oui.file.choose') }}</slot>
          </div>
        </template>
        <template v-else>
          <div class="_message">
            <slot name="preview" :filename="modelFilename">
              {{ modelFilename ?? tt('File available', 'oui.file.placeholder') }}
            </slot>
          </div>
          <OuiClose v-if="!disabled" @click.stop.prevent="doClear" />
        </template>
      </div>
    </div>
  </OuiFormItem>
</template>
