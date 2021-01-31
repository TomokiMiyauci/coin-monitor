<template>
  <base-menu
    :value="modelValue"
    title="Symbol Pair"
    class-button="w-48 sm:w-40 lg:w-52"
    :candidates="zaifOrderBookPairs"
    @input="$emit('update:modelValue', $event)"
  >
    <template #buttonContent="{ value }">
      <base-svg-pair v-bind="format(value)" />
    </template>

    <template #candidate="{ candidate }">
      <base-svg-pair v-bind="format(candidate)" />
    </template>
  </base-menu>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import BaseSvgPair from '/@/components/base/BaseSvgPair.vue'
import BaseMenu from '/@/components/menu/BaseMenu.vue'
import { zaifOrderBookPairs } from '/@/components/zaif/pair'

defineProps<{ modelValue: string }>()

const format = (payload: string) => {
  const [symbol, baseSymbol] = payload.split('_')
  return {
    symbol: symbol.toUpperCase(),
    baseSymbol: baseSymbol.toUpperCase(),
  }
}
</script>
