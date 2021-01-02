<template>
  <div class="2xl:grid grid-cols-2 grid-rows-2 gap-4">
    <latest-price
      class="col-span-full row-span-1 2xl:col-span-1"
      :value="last"
    />
    <ask-bid
      class="col-span-full row-span-2 2xl:col-span-1"
      v-bind="askBidAttrs"
    />
  </div>

  <base-card class="my-4">
    <base-title class="p-4">history</base-title>
    <chart-line
      class="stroke-8 md:stroke-4"
      width="100%"
      height="100%"
      :data="data"
    />
  </base-card>

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
  import { defineComponent, computed, ref } from 'vue'
  import AskBid from '/@/components/base/AskBid.vue'
  import OrderBooks from '/@/components/coincheck/OrderBooks.vue'
  import TradeHistory from '/@/components/coincheck/TradeHistory.vue'
  import { useTicker } from '/@/components/coincheck/useTicker'
  import LatestPrice from '/@/components/last-price/LastPrice.vue'
  import CoincheckRates from '/@/components/coincheck/CoincheckRates.vue'
  import { useHistory } from '/@/composites/rate'
  import { useHistorycal } from '/@/utils/firestore'
  import ChartLine from '/@/components/chart/ChartLine.vue'
  import BaseCard from '/@/components/base/BaseCard.vue'
  import BaseTitle from '/@/components/base/BaseTitle.vue'

  export default defineComponent({
    components: {
      BaseCard,
      ChartLine,
      LatestPrice,
      AskBid,
      OrderBooks,
      TradeHistory,
      CoincheckRates,
      BaseTitle,
    },

    setup() {
      const { last, ask, bid, high, low, volume } = useTicker()
      const historycalLast = useHistory(last, 10)

      const data = ref<number[]>([])
      const get = useHistorycal()
      get().then((e) => {
        data.value = e.map(({ value }) => value)
      })

      const askBidAttrs = computed(() => ({
        ask: ask.value,
        bid: bid.value,
        high: high.value,
        low: low.value,
        volume: volume.value,
      }))

      return {
        data,
        last,
        historycalLast,
        askBidAttrs,
      }
    },
  })
</script>
