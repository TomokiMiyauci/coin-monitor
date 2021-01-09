<template>
  <table>
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
        v-for="d in data"
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
  </table>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'
  import TextLoader from '/@/components/base/loaders/TextLoader.vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'

  defineProps<{
    data: {
      symbol: string
      rate?: number
      [k: string]: number | string | undefined
    }[]
    classHdSymbol?: string
    classHdRate?: string
    classTdSymbol?: string
    classTdRate?: string
    classBodyTd?: string
  }>()
</script>
