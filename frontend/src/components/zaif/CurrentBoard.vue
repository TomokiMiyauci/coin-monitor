<template>
  <div class="2xl:grid grid-cols-2 grid-rows-2 gap-4">
    <latest-price
      class="col-span-full mb-6 2xl:mb-0 row-span-1 2xl:col-span-1"
      :value="lastPrice"
    />

    <zaif-ask-bid class="col-span-full row-span-2 2xl:col-span-1" />
  </div>

  <base-card class="my-4">
    <base-title class="p-4 flex justify-between"
      >history
      <select-box-zaif-pair :value="pair" @input="onInput" />
    </base-title>
    <line-chart
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
  </base-card>

  <div class="grid mt-6 grid-cols-6 gap-6">
    <zaif-rates
      class="col-span-full sm:col-span-3 md:col-span-3 2xl:col-span-2"
    />

    <zaif-order-book class="col-span-full sm:col-span-3 2xl:col-span-2" />

    <zaif-trade-history
      class="col-span-full sm:col-span-6 xl:col-span-3 2xl:col-span-2"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, onBeforeMount, inject, watch } from 'vue'
  import type { Ref } from 'vue'

  import LatestPrice from '/@/components/last-price/LastPrice.vue'
  import { useLastPrice } from '/@/components/zaif/useLastPrice'
  import SelectBoxZaifPair from '/@/components/zaif/SelectBoxZaifPair.vue'

  import ZaifRates from '/@/components/zaif/ZaifRates.vue'
  import ZaifOrderBook from '/@/components/zaif/ZaifOrderBook.vue'
  import ZaifTradeHistory from '/@/components/zaif/ZaifTradeHistory.vue'
  import ZaifAskBid from '/@/components/zaif/ZaifAskBid.vue'
  import BaseCard from '/@/components/base/BaseCard.vue'
  import BaseTitle from '/@/components/base/BaseTitle.vue'
  import LineChart from '/@/components/chart/LineChart.vue'
  import { min } from '/@/utils/math'
  import { get1HRates } from '/@/functions/effect/api/zaif'
  import { useFirestore } from '/@/plugins/firebase'
  import type { ZaifOrderBookPairs } from '/@/components/zaif/pair'

  const { lastPrice } = useLastPrice()
  const data = ref<number[]>([])
  const labels = ref<string[]>([])
  const pair = inject('tradeHistoryPair') as Ref<ZaifOrderBookPairs>

  const { $firestore } = useFirestore()

  const getPrice = (pair: ZaifOrderBookPairs) => {
    get1HRates(pair, new Date(), $firestore).then((e) => {
      data.value = e.map((a) => a.value)
      labels.value = e.map((a) => a.date.toLocaleTimeString())
    })
  }

  const onInput = (payload: ZaifOrderBookPairs) => {
    pair.value = payload
  }

  watch(pair, (now) => {
    getPrice(now)
  })

  onBeforeMount(() => getPrice(pair.value))
  const lowValue = computed(() => min(data.value))
</script>
