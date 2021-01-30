<template>
  <span class="whitespace-nowrap">
    <span class="pl-3">
      <component
        :is="baseSymbolComponent"
        width="24"
        height="24"
        class="inline-block w-7 h-7 left-3 top-0 bg-white shadow-sm border rounded-full"
      />
      <component
        :is="component"
        width="24"
        height="24"
        class="inline-block -ml-10 w-7 h-7 left-0 top-0 bg-white border shadow-sm rounded-full"
      />
    </span>
    <span class="align-middle ml-4">{{ pair }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

import type { ZaifBaseSymbol } from '/@/components/base/coin'
import { getComponent } from '/@/components/zaif/symbol'

const props = defineProps({
  symbol: {
    type: String as () => ZaifBaseSymbol,
    required: true,
  },

  baseSymbol: {
    type: String as () => ZaifBaseSymbol,
    required: true,
  },
})

const component = computed(() => getComponent(props.symbol))
const baseSymbolComponent = computed(() => getComponent(props.baseSymbol))
const pair = computed(() => `${props.symbol}${props.baseSymbol}`)
</script>
