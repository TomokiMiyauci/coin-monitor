<template>
  <div class="grid grid-cols-4 gap-4">
    <latest-price
      class="col-span-full 2xl:col-span-2"
      :data="historycalLast"
      :value="last"
    />
    <ask-bid class="col-span-full 2xl:col-span-2" :ask="ask" :bid="bid" />
  </div>

  <div class="grid grid-rows-3 grid-cols-6 mt-4 gap-4">
    <coincheck-rates
      class="col-span-full sm:col-span-3 xl:col-span-2 w-full row-span-3 hover:shadow-xl duration-200 transition bg-white mx-auto shadow rounded-md"
    />

    <order-books
      class="row-span-3 sm:col-span-3 xl:col-span-4 w-full col-span-full bg-white rounded-md hover:shadow-xl duration-200 transition"
    />

    <trade-history
      class="bg-white rounded-md shadow row-span-3 xl:col-span-4 2xl:col-span-2 col-span-full hover:shadow-xl duration-200 transition"
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
  import CoincheckRates from '/@/components/coincheck/CoincheckRates.vue'
  import ChartLine from '/@/components/chart/ChartLine.vue'
  import { useHistory } from '/@/composites/rate'

  export default defineComponent({
    components: {
      LatestPrice,
      ChartLine,
      AskBid,
      OrderBooks,
      TradeHistory,
      CoincheckRates,
    },

    setup() {
      const { last, ask, bid } = useTicker()
      const historycalLast = useHistory(last, 10)

      return {
        last,
        ask,
        bid,
        historycalLast,
      }
    },
  })
</script>
