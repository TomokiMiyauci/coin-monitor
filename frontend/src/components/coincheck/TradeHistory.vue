<template>
  <base-card>
    <h3 class="py-3 px-3 text-lg text-gray-400">Trade History</h3>

    <transition name="fade">
      <trade-historys v-if="data" class="w-full mt-2" :data="data" />
      <spin-loader v-else class="h-full" />
    </transition>
  </base-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import SpinLoader from '/@/components/base/loaders/SpinLoader.vue'
  import { useTrades } from '/@/components/coincheck/useTrades'
  import TradeHistorys from '/@/components/trade-history/TradeHistory.vue'
  import BaseCard from '/@/components/base/BaseCard.vue'

  export default defineComponent({
    components: {
      TradeHistorys,
      SpinLoader,
      BaseCard,
    },

    setup() {
      const { data } = useTrades()

      return { data }
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
