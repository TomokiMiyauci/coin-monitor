<template>
  <base-rate-table :items="items">
    <template #header>
      <th class="w-1/2"></th>
      <th></th>
      <th
        v-for="{ class: className, value, text, tooltipText } in headers"
        :key="value"
        :class="className"
      >
        <text-icon v-if="text" :text="text">
          <base-tooltip v-if="tooltipText" class-content="px-4 py-2 right-0">
            <mdi-mdi-help-circle class="w-4 align-top h-4" />

            <template #content>
              <span class="whitespace-nowrap">{{ tooltipText }}</span>
            </template>
          </base-tooltip>
        </text-icon>
      </th>
    </template>

    <template #td-symbol="{ symbol }">
      <td class="p-2">
        <slot name="default" :symbol="symbol"> {{ symbol }}</slot>
      </td>
    </template>

    <template #expand-td="{ item }">
      <td v-for="value in headerValues" :key="value" class="text-right pr-3">
        <text-loader
          v-flash
          :value="item[value]"
          skelton-style="min-width: 3rem"
        >
          <span>
            <percentage :value="isNumber(item[value])" />
          </span>
        </text-loader>
      </td>
    </template>
  </base-rate-table>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

import BaseTooltip from '/@/components/base/BaseTooltip.vue'
import MdiMdiHelpCircle from '/@/components/base/icons/mdi/MdiHelpCircle.vue'
import TextIcon from '/@/components/base/icons/TextIcon.vue'
import TextLoader from '/@/components/base/loaders/TextLoader.vue'
import Percentage from '/@/components/base/Percentage.vue'
import BaseRateTable from '/@/components/rate/BaseRateTable.vue'
import { isNumber } from '/@/utils/assert'

const props = defineProps<{
  headers: {
    value: string | number
    text?: string
    tooltipText?: string
    class?: string
  }[]
  items: { symbol: string; rate?: number; ratio?: number }[]
}>()

const headerValues = computed(() => props.headers.map(({ value }) => value))
</script>
