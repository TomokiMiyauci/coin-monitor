<template>
  <base-table :items="items" :headers="headersRef">
    <template #header="{ headers }">
      <slot name="header" :headers="headers">
        <th :class="header.class" v-for="header in headers">
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
  <!-- <table>
    <thead>
      <tr>
        <slot name="th-symbol">
          <th :class="classHdSymbol">
            <slot name="th-inner-symbol" />
          </th>
        </slot>
        <slot name="th-rate">
          <th :class="classHdRate">
            <slot name="th-inner-rate" />
          </th>
        </slot>
        <slot name="expand-th"> </slot>
      </tr>
    </thead>

    <tbody>
      <tr
        :class="classBodyTd || 'hover:bg-gray-100'"
        v-for="d in items"
        :key="d.symbol"
      >
        <slot :symbol="d.symbol" name="td-symbol">
          <td :class="classTdSymbol || 'p-2'">
            <slot :symbol="d.symbol" name="td-inner-symbol" />
          </td>
        </slot>

        <slot :rate="d.rate" name="td-rate">
          <td :class="classTdRate || 'text-right px-3'">
            <slot :rate="d.rate" name="td-inner-rate">
              <text-loader skelton-style="min-width: 6rem;" :value="d.rate">
                <comma-filter :value="d.rate" />
              </text-loader>
            </slot>
          </td>
        </slot>

        <slot :data="d" name="expand-td" />
      </tr>
    </tbody>
  </table> -->
</template>

<script setup lang="ts">
  import { defineProps, computed } from 'vue'
  import TextLoader from '/@/components/base/loaders/TextLoader.vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'
  import BaseTable from '/@/components/base/BaseTable.vue'
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
