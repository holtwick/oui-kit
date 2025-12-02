<script lang="ts" setup>
import type { OuiTableColumn } from '../lib'
import { computed, reactive } from 'vue'
import { sortedOrderby } from 'zeed'
import { OuiCheckbox, OuiDemo, OuiInput, OuiInputNumber, OuiTable, useMenu } from '../lib'

const state = reactive({
  sort: '',
  footer: true,
  selectable: true,
  selected: -1,
})

const columns: OuiTableColumn[] = [
  { title: '#', name: 'id', sortable: false },
  { title: 'One', name: 'one', sortable: true, grow: true },
  { title: 'Two', name: 'two', sortable: true, align: 'right', footer: 'Two feet' },
  { title: '', name: 'action', align: 'right' },
]

const _data = [
  { id: 1, one: 1, two: 2 },
  { id: 2, one: 11, two: 22 },
  { id: 3, one: 111 }, // missing one
]

const data = computed(() => sortedOrderby(_data, state.sort))

const menu = useMenu(row => [
  {
    title: row.one ?? '-',
    // eslint-disable-next-line no-alert
    action: () => alert('Hello World'),
  },
  {},
  {
    title: row.two ?? '-',
    // eslint-disable-next-line no-alert
    action: () => alert('Hello World'),
  },
])
</script>

<template>
  <h2>Complex example</h2>
  <div>
    <OuiTable
      v-model="state.selected"
      v-model:sort="state.sort"
      :columns="columns"
      :data="data"
      :footer="state.footer"
      :selectable="state.selectable"
      @context="menu"
    >
      <template #col-one="{ value, col }">
        {{ col.name }} {{ value }}
      </template>
      <template #col-action="{ value, col }">
        <button class="oui-button" size="small" @click="console.log(value, col)">
          Action
        </button>
      </template>
      <template #footer-one>
        One foot
      </template>
      <template #header-one>
        ONE-LONG-Title with break
      </template>
    </OuiTable>
  </div>

  <h2>Without columns definitions - super simple</h2>
  <div>
    <OuiTable :data="data" />
  </div>
  <OuiDemo :state="state">
    <OuiInput v-model="state.sort" title="Sort" />
    <OuiInputNumber v-model="state.selected" title="Selected" />
    <OuiCheckbox v-model="state.footer" title="Show footer" />
    <OuiCheckbox v-model="state.selectable" title="Selectable" />
  </OuiDemo>
</template>
