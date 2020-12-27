<template>
  <div class="grid grid-cols-2">
    <div>
      <h3 class="ml-2 p-2 mt-1 text-lg text-gray-400">Order Book</h3>

      <template v-if="asks.length">
        <div class="flex mt-4 justify-around uppercase">
          <span>rate</span><span>amount</span>
        </div>
        <div class="bg-gradient-to-b to-red-400 from-white">
          <div class="uppercase text-center text-red-400">buy</div>
          <div
            v-for="ask in asks"
            :key="ask"
            class="flex px-10 pt-1 justify-between"
          >
            <comma-filter :value="ask[0]" />
            <comma-filter :value="ask[1]" />
          </div>
        </div>

        <div class="p-2 text-center bg-gradient-to-b from-red-400 to-green-400">
          <comma-filter :value="tick" />
        </div>

        <div class="bg-gradient-to-t to-green-400 from-white">
          <div
            v-for="bid in bids"
            :key="bid"
            class="flex px-10 pt-1 justify-between"
          >
            <comma-filter :value="bid[0]" />

            <comma-filter :value="bid[1]" />
          </div>
          <div class="uppercase text-center text-green-400">sell</div>
        </div>
      </template>
      <template v-else>
        <spin-loader class="h-full" />
      </template>
    </div>

    <div class="py-16">
      <chart-border :leftPadding="10" :data="d" />
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useOrderBook } from '/@/components/coincheck/useOrderBooks'
  import CommaFilter from '/@/components/base/CommaFilter.vue'
  import SpinLoader from '/@/components/base/loaders/SpinLoader.vue'
  import ChartBorder from '../chart/ChartBorder.vue'

  export default defineComponent({
    components: {
      CommaFilter,
      SpinLoader,
      ChartBorder,
    },
    setup() {
      const { asks, bids } = useOrderBook()

      const tick = computed(() => {
        if (
          !!asks.value.length &&
          !!asks.value[9] &&
          !!bids.value.length &&
          !!bids.value[0]
        ) {
          return asks.value[9][0] - bids.value[0][0]
        }
        return
      })

      const d = computed(() => {
        return bids.value.map((bid) => bid[1])
      })

      return { asks, bids, tick, d }
    },
  })
</script>
