<template>
  <base-menu
    :value="value"
    title="Symbol Pair"
    class-button="w-48 sm:w-40 lg:w-52"
    :candidates="zaifOrderBookPairs"
    @input="$emit('input', $event)"
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
  import { zaifOrderBookPairs } from '/@/components/zaif/pair'
  import BaseMenu from '/@/components/menu/BaseMenu.vue'

  defineProps<{ value: string }>()

  const format = (payload: string) => {
    const [symbol, baseSymbol] = payload.split('_')
    return {
      symbol: symbol.toUpperCase(),
      baseSymbol: baseSymbol.toUpperCase(),
    }
  }
</script>
