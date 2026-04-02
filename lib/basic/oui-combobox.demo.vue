<script lang="ts" setup>
import { reactive } from 'vue'
import { OuiCheckbox, OuiCombobox, OuiDemo, OuiInput } from '../lib'

const fruits = [
  'Apple',
  'Banana',
  'Cherry',
  'Damson',
  'Elderberry',
  'Fig',
  'Guava',
  'Hawthorn',
  'Jackfruit',
  'Kumquat',
  'Lemon',
  'Mango',
  'Nectarine',
  'Olive',
  'Papaya',
  'Raspberry',
  'Strawberry',
  'Tangerine',
]

const items = fruits.map(title => ({ id: title.toLowerCase(), title }))

const state = reactive<any>({
  // Basic
  value: 'cherry',
  items: [...items],
  title: 'Fruit',
  placeholder: 'Search...',
  clearable: false,
  selectIcon: false,
  disabled: false,

  // addItemAction
  addValue: undefined,
  addItems: [...items],

  // formatValue / parseValue
  percent: 19,

  // clearOnSelection
  clearValue: undefined,
  lastSelected: '',
})

function doAddItem(title: string) {
  const id = title.toLowerCase().replace(/\s+/g, '-')
  state.addItems.push({ id, title })
  return id
}
</script>

<template>
  <!-- Basic -->
  <div>
    <OuiCombobox
      v-model="state.value"
      :title="state.title"
      :placeholder="state.placeholder"
      :items="state.items"
      :clearable="state.clearable"
      :select-icon="state.selectIcon"
      :disabled="state.disabled"
    />
    <div>Value: <code>{{ state.value }}</code></div>
  </div>

  <!-- Clearable with custom item slot -->
  <div>
    <OuiCombobox
      v-model="state.value"
      title="Custom item slot"
      :items="state.items"
      clearable
    >
      <template #item="{ item }">
        <strong>{{ item.title }}</strong>
      </template>
    </OuiCombobox>
  </div>

  <!-- addItemAction: type something not in the list -->
  <div>
    <OuiCombobox
      v-model="state.addValue"
      title="addItemAction (try typing 'Kiwi')"
      :items="state.addItems"
      :add-item-action="doAddItem"
      clearable
    />
    <div>Value: <code>{{ state.addValue }}</code> / Items: <code>{{ state.addItems.length }}</code></div>
  </div>

  <!-- clearOnSelection -->
  <div>
    <OuiCombobox
      v-model="state.clearValue"
      title="clearOnSelection"
      :items="state.items"
      clear-on-selection
      @change="(v: any) => state.lastSelected = v"
    />
    <div>Last selected: <code>{{ state.lastSelected }}</code></div>
  </div>

  <!-- formatValue / parseValue -->
  <div>
    <OuiCombobox
      v-model="state.percent"
      title="formatValue / parseValue"
      :items="[5, 7, 16, 19]"
      :format-value="(v: any) => (v == null ? '' : `${v} %`)"
      :parse-value="(v: any) => Number.parseInt(v, 10)"
      clearable
    />
    <div>Value: <code>{{ state.percent }}</code></div>
  </div>

  <!-- formatValue + named items -->
  <div>
    <OuiCombobox
      v-model="state.percent"
      title="Named items with format"
      :items="[
        { id: 7, title: '7 % - reduced' },
        { id: 19, title: '19 % - full' },
      ]"
      :format-value="(v: any) => (v == null ? '' : `${v} %`)"
      :parse-value="(v: any) => Number.parseInt(v, 10)"
      clearable
    />
  </div>

  <OuiDemo :state="state">
    <OuiInput v-model="state.title" title="title" />
    <OuiInput v-model="state.placeholder" title="placeholder" />
    <OuiCheckbox v-model="state.clearable" switch title="clearable" />
    <OuiCheckbox v-model="state.selectIcon" switch title="selectIcon" />
    <OuiCheckbox v-model="state.disabled" switch title="disabled" />
  </OuiDemo>
</template>
