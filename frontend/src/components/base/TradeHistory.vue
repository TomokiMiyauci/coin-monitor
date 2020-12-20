<template>
  <base-card>
    <div class="flex p-2 justify-between items-center">
      <h3 class="py-3 px-3 text-lg text-gray-400">Trade History</h3>

      <slot name="menu" />
    </div>
    <transition name="fade">
      <trade-historys v-if="data.length" class="w-full mt-2" :data="data" />
      <spin-loader v-else class="h-full" />
    </transition>
  </base-card>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import SpinLoader from '/@/components/base/loaders/SpinLoader.vue'
  import TradeHistorys from '/@/components/trade-history/TradeHistory.vue'
  import BaseCard from '/@/components/base/BaseCard.vue'
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
      BaseCard,
    },

    props: {
      data: {
        type: Array as PropType<Data[]>,
        default: () => [],
      },
    },
  })
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    @apply transition-opacity duration-100;
  }

  .fade-enter-from,
  .fade-leave-to {
    @apply opacity-0;
  }
</style>
