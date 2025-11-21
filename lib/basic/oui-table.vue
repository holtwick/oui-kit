<script lang="ts" setup generic="K extends string, T extends Record<K, any>">
import type { OuiTableColumn } from './_types'
import { computed } from 'vue'
import { parseOrderby } from 'zeed'

import './oui-table.styl'

const props = withDefaults(defineProps<{
  data: T[]
  columns?: OuiTableColumn<K>[]
  header?: boolean | undefined
  footer?: boolean | undefined
  selectable?: boolean
}>(), {
  columns: undefined,
  header: undefined,
  footer: false,
  selectable: true,
})

const emit = defineEmits<{
  context: [row: T, pos: number, event: Event]
}>()

const modelSort = defineModel<string>('sort')
const modelSelected = defineModel<number | undefined>()

const sortName = computed(() => parseOrderby(modelSort.value).field)
const sortAsc = computed(() => parseOrderby(modelSort.value).asc)

const cols = computed<OuiTableColumn<K>[]>(() => props.columns ?? (Object.keys(props.data?.[0] ?? {}) as any)?.map((name: string) => ({ name })))
const showHeader = computed(() => props.header ?? props.columns != null)

function doToggleSort(name: string) {
  if (sortName.value === name) {
    modelSort.value = `${name} ${!sortAsc.value ? 'asc' : 'desc'}`
    return
  }
  modelSort.value = `${name} asc`
}

function doSelect(pos: number) {
  if (modelSelected.value === pos)
    modelSelected.value = undefined
  else
    modelSelected.value = pos
}
</script>

<template>
  <table class="oui-table">
    <thead v-if="showHeader">
      <tr>
        <template v-for="col, pos in cols" :key="col.name">
          <th
            :class="{
              _sortable: col.sortable === true,
              _asc: sortName === col.name && sortAsc,
              _desc: sortName === col.name && !sortAsc,
              _active: sortName === col.name,
            }"
            :align="col.align ?? 'left'"
            @click="doToggleSort(col.name)"
          >
            <slot :name="`header-${col.name}`" v-bind="{ col, pos }">
              {{ col.title ?? col.name }}
              <template v-if="col.sortable === true && sortName === col.name" />
            </slot>
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <template v-for="item, rowPos in data" :key="item">
        <tr
          :class="{
            _selectable: selectable,
            _active: modelSelected === rowPos,
          }"
          @click="doSelect(rowPos)"
          @contextmenu.prevent="emit('context', item, rowPos, $event)"
        >
          <template v-for="col, pos in cols" :key="col.name">
            <td
              :align="col.align ?? 'left'"
              :valign="col.valign ?? 'top'"
            >
              <slot
                :name="`col-${col.name}`" v-bind="{
                  index: rowPos,
                  value: item[col.name],
                  col,
                  pos,
                  item }"
              >
                {{ item[col.name] }}
              </slot>
            </td>
          </template>
        </tr>
      </template>
    </tbody>
    <tfoot v-if="footer === true">
      <tr>
        <template v-for="col, pos in cols" :key="col.name">
          <td :align="col.align ?? 'left'" :valign="col.valign ?? 'top'">
            <slot :name="`footer-${col.name}`" v-bind="{ col, pos }">
              {{ col.footer ?? '' }}
            </slot>
          </td>
        </template>
      </tr>
    </tfoot>
  </table>
</template>
