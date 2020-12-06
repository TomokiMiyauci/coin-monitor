<template>
  <div class="p-2 grid grid-flow-col gap-4">
    <latest-price v-if="last" :value="last" />
    <ask-bid v-if="ask" :ask="ask" :bid="bid" />
  </div>

  <order-book :asks="asks" :bids="bids" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import LatestPrice from '/@/components/base/LatestPrice.vue'
  import AskBid from '/@/components/base/AskBid.vue'
  import OrderBook from '/@/components/base/OrderBook.vue'
  import { useOrderBook } from '/@/components/coincheck/useOrderBooks'
  import { useTicker } from '/@/components/coincheck/useTicker'
  export default defineComponent({
    components: {
      LatestPrice,
      AskBid,
      OrderBook,
    },

    setup() {
      const { asks, bids } = useOrderBook()
      const { last, ask, bid } = useTicker()

      return { last, ask, bid, asks, bids }
    },
  })
</script>
