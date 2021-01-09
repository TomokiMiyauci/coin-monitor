<template>
  <base-rate-table :items="items">
    <template #header>
      <th class="w-1/3"></th>
      <th></th>

      <th class="text-right whitespace-nowrap px-3">
        <text-icon text="0:00">
          <base-tooltip class-content="px-4 py-2 right-0">
            <mdi-mdi-help-circle class="w-4 align-top h-4" />

            <template #content>
              <span class="whitespace-nowrap">Now / Initial Price</span>
            </template>
          </base-tooltip>
        </text-icon>
      </th>
      <th class="text-right px-3">
        <text-icon text="1D">
          <base-tooltip class-content="px-4 py-2 right-0">
            <mdi-mdi-help-circle class="w-4 align-top h-4" />

            <template #content>
              <span class="whitespace-nowrap">Now / Yesterday Now</span>
            </template>
          </base-tooltip>
        </text-icon>
      </th>
    </template>

    <template #td-symbol="{ symbol }">
      <td class="p-2">
        <base-svg-symbol :symbol="symbol">
          <slot name="symbol-icon" :symbol="symbol" />
        </base-svg-symbol>
      </td>
    </template>

    <template #expand-td="{ item }">
      <td class="text-right pr-3">
        <text-loader :value="item.ratioIp" skelton-style="min-width: 3rem">
          <flash-box :value="isNumber(item.ratioIp)">
            <percentage :value="isNumber(item.ratioIp)" />
          </flash-box>
        </text-loader>
      </td>
      <td class="text-right pr-3">
        <text-loader :value="item.ratio" skelton-style="min-width: 3rem">
          <flash-box :value="isNumber(item.ratio)">
            <percentage :value="isNumber(item.ratio)" />
          </flash-box>
        </text-loader>
      </td>
    </template>
  </base-rate-table>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'

  import BaseRateTable from '/@/components/rate/BaseRateTable.vue'
  import FlashBox from '/@/components/base/FlashBox.vue'
  import TextLoader from '/@/components/base/loaders/TextLoader.vue'
  import Percentage from '/@/components/base/Percentage.vue'
  import BaseSvgSymbol from '/@/components/base/BaseSvgSymbol.vue'
  import TextIcon from '/@/components/base/icons/TextIcon.vue'
  import MdiMdiHelpCircle from '/@/components/base/icons/mdi/MdiHelpCircle.vue'
  import BaseTooltip from '/@/components/base/BaseTooltip.vue'
  import { isNumber } from '/@/utils/assert'

  defineProps<{
    items: { symbol: string; rate?: number; ratio?: number; ratioIp?: number }[]
  }>()
</script>
