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

  <div class="my-4 card">
    <h2 class="title p-4">history</h2>
    <line-chart
      id="chart"
      :data="{
        labels,
        series: [data],
      }"
      :options="{
        low: lowValue,
        height: 500,
        fullWidth: true,
        chartPadding: {
          left: 50,
          right: 70,
        },
      }"
    />
  </div>

  <div class="grid grid-rows-3 grid-cols-6 mt-4 gap-4">
    <coincheck-rates
      class="col-span-full md:col-span-3 xl:col-span-3 2xl:col-span-2 w-full row-span-3 hover:shadow-xl duration-200 transition bg-white mx-auto shadow rounded-md"
    />

    <order-books
      class="row-span-3 sm:col-span-3 xl:col-span-3 2xl:col-span-2 w-full col-span-full bg-white rounded-md hover:shadow-xl duration-200 transition"
    />

    <trade-history
      class="bg-white rounded-md shadow sm:col-span-3 row-span-2 xl:col-span-3 2xl:col-span-2 col-span-full hover:shadow-xl duration-200 transition"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue'

import AskBid from '/@/components/base/AskBid.vue'
import LineChart from '/@/components/chart/LineChart.vue'
import CoincheckRates from '/@/components/coincheck/CoincheckRates.vue'
import OrderBooks from '/@/components/coincheck/OrderBooks.vue'
import TradeHistory from '/@/components/coincheck/TradeHistory.vue'
import { useTicker } from '/@/components/coincheck/useTicker'
import LatestPrice from '/@/components/last-price/LastPrice.vue'
import { get1HPrices } from '/@/functions/effect/api/share'
import { coincheckPairsPath } from '/@/functions/pure/api'
import { useFirestore } from '/@/plugins/firebase'
import { min } from '/@/utils/math'

export default defineComponent({
  components: {
    LatestPrice,
    AskBid,
    OrderBooks,
    TradeHistory,
    CoincheckRates,
    LineChart,
  },

  setup() {
    const { last, ask, bid, high, low, volume } = useTicker()
    const { firestore } = useFirestore()
    const data = ref<number[]>([])
    const labels = ref<string[]>([])

    onBeforeMount(() =>
      get1HPrices(coincheckPairsPath)('btc_jpy', new Date(), firestore).then(
        (e) => {
          data.value = e.map((a) => a.value)
          labels.value = e.map((a) => a.date.toLocaleTimeString())
        }
      )
    )

    const lowValue = computed(() => min(data.value))

    // const data = ref<number[]>([])
    // const get = useHistorycal()
    // onBeforeMount(() => {
    //   get().then((e) => {
    //     data.value = e.map(({ value }) => value)
    //   })
    // })

    const askBidAttrs = computed(() => ({
      ask: ask.value,
      bid: bid.value,
      high: high.value,
      low: low.value,
      volume: volume.value,
    }))

    return {
      data,
      labels,
      last,
      lowValue,
      askBidAttrs,
    }
  },
})
</script>
