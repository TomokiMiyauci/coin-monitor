<template>
  <base-table
    class-table="min-w-full overflow-x-scroll"
    :items="items"
    :headers="headersRef"
  >
    <template #header="{ headers }">
      <slot name="header" :headers="headers">
        <th v-for="header in headers" :key="header.value" :class="header.class">
          {{ header.text }}
        </th>
      </slot>
    </template>

    <template #item="{ item }">
      <slot name="item" :item="item">
        <slot name="td-symbol" :symbol="isString(item.symbol)">
          <td class="p-2">{{ item.symbol }}</td>
        </slot>

        <slot name="td-rate" :rate="isNumberOrUndefined(item.rate)">
          <td class="text-right p-2">
            <text-loader skelton-style="min-width: 6rem;" :value="item.rate">
              <comma-filter :value="isNumberOrUndefined(item.rate)" />
            </text-loader>
          </td>
        </slot>

        <slot name="expand-td" :item="item" />
      </slot>
    </template>
  </base-table>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

import BaseTable from '/@/components/base/BaseTable.vue'
import CommaFilter from '/@/components/base/CommaFilter.vue'
import TextLoader from '/@/components/base/loaders/TextLoader.vue'
import { isNumberOrUndefined, isString } from '/@/utils/assert'

type Header = {
  text?: string
  class?: string
  value: string | number
}

const props = defineProps<{
  items: {
    symbol: string
    rate?: number
  } & { [k in string]?: number | string }[]
  headers?: {
    text?: string
    class?: string
    value: string | number
  }[]

  classHdSymbol?: string
  classHdRate?: string
  classTdSymbol?: string
  classTdRate?: string
  classBodyTd?: string
}>()

const headersRef = computed<Header[]>(() =>
  props.headers ? props.headers : [{ value: 'symbol' }, { value: 'rate' }]
)
</script>
