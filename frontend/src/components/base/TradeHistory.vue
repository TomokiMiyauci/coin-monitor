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

<script lang="ts">
import { defineComponent } from 'vue'

import SpinLoader from '/@/components/base/loaders/SpinLoader.vue'
import TradeHistorys from '/@/components/trade-history/TradeHistory.vue'
type Data = {
  id: number
  date: Date
  type: 'SELL' | 'BUY'
  rate: number
  amount: number
}

export default defineComponent({
  components: {
    TradeHistorys,
    SpinLoader,
  },

  props: {
    data: {
      type: Array as () => Data[],
      default: () => [],
    },
  },
})
</script>

<style lang="scss" src="/@/assets/styles/transitions.scss"></style>
