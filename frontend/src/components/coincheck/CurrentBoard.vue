<template>
  <div class="grid grid-flow-col gap-4">
    <latest-price v-if="last" :value="last" />
    <ask-bid v-if="ask" :ask="ask" :bid="bid" />
  </div>

  <div class="grid grid-rows-3 grid-flow-col mt-4 gap-4">
    <order-book class="row-span-3" :asks="asks" :bids="bids" />

    <trade-history
      class="bg-white rounded shadow row-span-2"
      style="display: table-inline"
      :data="data"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import LatestPrice from '/@/components/base/LatestPrice.vue'
  import AskBid from '/@/components/base/AskBid.vue'
  import OrderBook from '/@/components/base/OrderBook.vue'
  import TradeHistory from '/@/components/trade-history/TradeHistory.vue'
  import { useOrderBook } from '/@/components/coincheck/useOrderBooks'
  import { useTicker } from '/@/components/coincheck/useTicker'
  import { useTrades } from '/@/components/coincheck/useTrades'
  export default defineComponent({
    components: {
      LatestPrice,
      AskBid,
      OrderBook,
      TradeHistory,
    },

    setup() {
      const { asks, bids } = useOrderBook()
      const { last, ask, bid } = useTicker()
      const { data } = useTrades()

      return { last, ask, bid, asks, bids, data }
    },
  })
</script>
