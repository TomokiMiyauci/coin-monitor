<template>
  <div class="grid grid-cols-4 gap-4">
    <latest-price v-if="last" class="col-span-2" :value="last" />
    <ask-bid v-if="ask" :ask="ask" :bid="bid" />
  </div>

  <div class="grid grid-rows-3 grid-cols-4 mt-4 gap-4">
    <rates
      class="col-span-1 w-full row-span-3 hover:shadow-xl duration-200 transition bg-white mx-auto shadow rounded-md"
    />

    <order-book
      class="row-span-3 w-full col-span-1"
      :asks="asks"
      :bids="bids"
    />

    <trade-history
      class="bg-white rounded shad;ow row-span-3 col-span-2"
      style="display: table-inline"
      :data="data"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import AskBid from '/@/components/base/AskBid.vue'
  import OrderBook from '/@/components/base/OrderBook.vue'
  import TradeHistory from '/@/components/trade-history/TradeHistory.vue'
  import { useOrderBook } from '/@/components/coincheck/useOrderBooks'
  import { useTicker } from '/@/components/coincheck/useTicker'
  import { useTrades } from '/@/components/coincheck/useTrades'
  import LatestPrice from '/@/components/base/LatestPrice.vue'
  import Rates from '/@/components/coincheck/Rates.vue'
  export default defineComponent({
    components: {
      LatestPrice,
      AskBid,
      OrderBook,
      TradeHistory,
      Rates,
    },

    setup() {
      const { asks, bids } = useOrderBook()
      const { last, ask, bid } = useTicker()
      const { data } = useTrades()

      return {
        last,
        ask,
        bid,
        asks,
        bids,
        data,
      }
    },
  })
</script>
