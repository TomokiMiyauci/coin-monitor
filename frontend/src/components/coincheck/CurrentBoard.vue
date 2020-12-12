<template>
  <div class="grid grid-cols-4 gap-4">
    <latest-price v-if="last" class="col-span-2" :value="last" />
    <ask-bid v-if="ask" :ask="ask" :bid="bid" />
  </div>

  <div class="grid grid-rows-3 grid-cols-4 mt-4 gap-4">
    <div
      class="shadow col-span-1 w-full row-span-3 p-5 bg-white mx-auto rounded"
    >
      <div class="flex justify-between items-center">
        <h3 class="ml-2 text-gray-400">Coins</h3>

        <base-menu :value="base" @input="onChange" />
      </div>
      <rate class="mt-4" :rates="rates" />
    </div>

    <order-book
      class="row-span-3 w-full col-span-1"
      :asks="asks"
      :bids="bids"
    />

    <trade-history
      class="bg-white rounded shadow row-span-3 col-span-2"
      style="display: table-inline"
      :data="data"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref, watch, computed } from 'vue'
  import AskBid from '/@/components/base/AskBid.vue'
  import OrderBook from '/@/components/base/OrderBook.vue'
  import TradeHistory from '/@/components/trade-history/TradeHistory.vue'
  import { useOrderBook } from '/@/components/coincheck/useOrderBooks'
  import { useTicker } from '/@/components/coincheck/useTicker'
  import { useTrades } from '/@/components/coincheck/useTrades'
  import { getRateMap, useRate } from '/@/components/coincheck/useRate'
  import Rate from '/@/components/base/Rate.vue'
  import BaseMenu from '/@/components/base/BaseMenu.vue'
  import LatestPrice from '/@/components/base/LatestPrice.vue'
  export default defineComponent({
    components: {
      LatestPrice,
      AskBid,
      OrderBook,
      TradeHistory,
      Rate,
      BaseMenu,
    },

    setup() {
      const { asks, bids } = useOrderBook()
      const { last, ask, bid } = useTicker()
      const { data } = useTrades()

      const base = ref('JPY')

      const rateMap = getRateMap(base.value)
      const refRateMap = ref(rateMap.map((pair) => ref(pair)))

      const onChange = (now: any) => {
        base.value = now
        const map = getRateMap(now)
        refRateMap.value.forEach((r, index) => (r.value = map[index]))
      }

      const getRefRateMap = () => {
        return refRateMap.value.map((pair) => {
          const { rate, ratio } = useRate(pair)
          return { rate, ratio, symbol: pair }
        })
      }
      const symbolMap = ref(getRefRateMap())

      const rates = computed(() =>
        Object.assign(
          {},
          ...symbolMap.value.map(({ rate, symbol, ratio }) => {
            return { [symbol]: { rate, ratio } }
          })
        )
      )

      return {
        onChange,
        last,
        ask,
        bid,
        asks,
        bids,
        data,
        base,
        rates,
      }
    },
  })
</script>
