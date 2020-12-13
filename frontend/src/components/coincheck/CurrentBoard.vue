<template>
  <div class="grid grid-cols-4 gap-4">
    <latest-price class="col-span-2" :value="last" />
    <ask-bid :ask="ask" :bid="bid" />
  </div>

  <div class="grid grid-rows-3 grid-cols-4 mt-4 gap-4">
    <rates
      class="col-span-1 w-full row-span-3 hover:shadow-xl duration-200 transition bg-white mx-auto shadow rounded-md"
    />

    <order-books
      class="row-span-3 w-full col-span-1 bg-white rounded-md hover:shadow-xl duration-200 transition"
    />

    <trade-history
      class="bg-white rounded-md shad;ow row-span-3 col-span-2 hover:shadow-xl duration-200 transition"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import AskBid from '/@/components/base/AskBid.vue'
  import OrderBooks from '/@/components/coincheck/OrderBooks.vue'
  import TradeHistory from '/@/components/coincheck/TradeHistory.vue'
  import { useTicker } from '/@/components/coincheck/useTicker'
  import LatestPrice from '/@/components/base/LatestPrice.vue'
  import Rates from '/@/components/coincheck/Rates.vue'
  export default defineComponent({
    components: {
      LatestPrice,
      AskBid,
      OrderBooks,
      TradeHistory,
      Rates,
    },

    setup() {
      const { last, ask, bid } = useTicker()

      return {
        last,
        ask,
        bid,
      }
    },
  })
</script>
