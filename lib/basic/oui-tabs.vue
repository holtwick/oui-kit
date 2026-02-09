<script lang="ts" setup generic="K extends string">
import type { OuiTab } from './_types'
import { computed } from 'vue'
import OuiSlider from './oui-slider.vue'
import './oui-tabs.styl'

const props = defineProps<{
  tabs: OuiTab<K>[]
  className?: string
}>()

const model = defineModel<K>({ required: false })

const name = computed<string>(() => model.value ?? props.tabs?.[0]?.value ?? 'default')
</script>

<template>
  <div class="oui-tabs">
    <OuiSlider
      v-model="model"
      :options="tabs"
      class="oui-tabs-nav _nav"
    >
      <template #default="{ options, updateModelValue }">
        <template v-for="tab in options" :key="tab.value">
          <button :class="{ _active: model === tab.value }" @click="updateModelValue(tab.value)">
            <slot :name="`tab-${tab.value}`" v-bind="{ tab }">
              <template v-if="tab.icon">
                <component :is="tab.icon" />
              </template>
              {{ tab.title ?? tab.value }}
            </slot>
          </button>
        </template>
      </template>
    </OuiSlider>

    <div>
      <slot :key="name" :name="name">
        <slot />
      </slot>
    </div>
  </div>
</template>
