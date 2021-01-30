<template>
  <div class="card-none sm:card flex flex-col pb-2 sm:pb-4 min-h-96">
    <div class="sm:flex hidden p-2 justify-between items-center">
      <h3 class="py-3 px-3 text-2xl text-gray-400">Trade History</h3>

      <slot name="menu" />
    </div>
    <transition name="fade" class="flex-grow" mode="out-in">
      <trade-historys v-if="data.length" class="w-full sm:mt-2" :data="data" />
      <div v-else class="flex justify-center h-full items-center">
        <spin-loader />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import SpinLoader from '/@/components/base/loaders/SpinLoader.vue'
import TradeHistorys from '/@/components/trade-history/TradeHistory.vue'

defineProps({
  data: {
    type: Array as () => {
      id: number
      date: Date
      type: 'SELL' | 'BUY'
      rate: number
      amount: number
    }[],
    default: () => [],
  },
})
</script>

<style lang="scss" src="/@/assets/styles/transitions.scss"></style>
