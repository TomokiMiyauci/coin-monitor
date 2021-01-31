<template>
  <div class="flex justify-between px-1 sm:px-0 sm:py-4 items-center">
    <h3 class="text-gray-700 text-3xl font-medium capitalize">Zaif</h3>

    <div class="flex gap-4">
      <div class="hidden sm:block">
        <input
          v-model.number="interval"
          min="1"
          class="appearance-none h-4 bg-blue-300 shadow p-px cursor-pointer outline-none rounded-xl"
          max="10"
          step="3"
          type="range"
        />

        <div class="flex justify-between px-1">
          <span>1</span><span class="ml-2">4</span><span class="ml-2">7</span
          ><span>10</span>
        </div>
      </div>
      <select-box-zaif-pair v-model="pair" />
    </div>

    <div class="hidden">
      <input
        v-model.number="interval"
        min="1"
        class="appearance-none bg-blue-300 shadow p-px cursor-pointer outline-none rounded-xl"
        max="10"
        step="1"
        type="range"
      />
      <div class="flex justify-between px-1">
        <span>1</span><span class="ml-2">4</span><span class="ml-2">7</span
        ><span>10</span>
      </div>
    </div>
  </div>
  <div class="px-1">
    <current-board />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { provide, ref, watch } from 'vue'

import CurrentBoard from '/@/components/zaif/CurrentBoard.vue'
import type { ZaifOrderBookPairs } from '/@/components/zaif/pair'
import SelectBoxZaifPair from '/@/components/zaif/SelectBoxZaifPair.vue'
import type {
  ResponseDepth,
  ResponseRate,
  ResponseTicker,
} from '/@/functions/effect/api/zaif'
import { getDepth, getRate, getTicker } from '/@/functions/effect/api/zaif'
import { resetInterval, useInterval } from '/@/functions/effect/interval'
import { multiplie1000 } from '/@/functions/pure/math'
import { depthKey, lastPriceKey, tickerKey } from '/@/provider'

useHead({
  title: 'Zaif | Coin Monitor',
})
const initPair = 'btc_jpy'
const pair = ref<ZaifOrderBookPairs>(initPair)
const historyPair = ref<ZaifOrderBookPairs>(initPair)
const tradeHistoryPair = ref<ZaifOrderBookPairs>(initPair)
const orderBookPair = ref<ZaifOrderBookPairs>(initPair)
const tickerPair = ref<ZaifOrderBookPairs>(initPair)
const askBidPair = ref<ZaifOrderBookPairs>(initPair)
const lastPricePair = ref<ZaifOrderBookPairs>(initPair)

const tickerRef = ref<ResponseTicker>()
const depthRef = ref<ResponseDepth>()
const rateRef = ref<ResponseRate>()

provide('historyPair', historyPair)
provide('tradeHistoryPair', tradeHistoryPair)
provide('orderBookPair', orderBookPair)
provide('askBidPair', askBidPair)

const interval = ref<number>(10)
const localInterval = ref(interval.value)
const localIntervalDepth = ref(interval.value)
const intervalLastPrice = ref(interval.value)
const { intervalId } = useInterval(() =>
  resetInterval(
    intervalId.value,
    async () => (tickerRef.value = await getTicker(pair.value)),
    multiplie1000(interval.value),
    true
  )
)

const { intervalId: intervalIdDepth } = useInterval(() =>
  resetInterval(
    intervalIdDepth.value,
    async () => (depthRef.value = await getDepth(orderBookPair.value)),
    multiplie1000(localIntervalDepth.value),
    true
  )
)

const { intervalId: intervalIdLastPrice } = useInterval(() =>
  resetInterval(
    intervalIdLastPrice.value,
    async () => (rateRef.value = await getRate(lastPricePair.value)),
    multiplie1000(intervalLastPrice.value),
    true
  )
)

provide(tickerKey, {
  interval: localInterval,
  intervalId,
  pairRef: tickerPair,
  stateRef: tickerRef,
})

provide(depthKey, {
  interval: localIntervalDepth,
  intervalId: intervalIdDepth,
  pairRef: orderBookPair,
  stateRef: depthRef,
})
provide(lastPriceKey, {
  interval: localIntervalDepth,
  intervalId: intervalIdDepth,
  pairRef: lastPricePair,
  stateRef: rateRef,
})

watch(interval, (now) => {
  localInterval.value = now
  localIntervalDepth.value = now
  intervalLastPrice.value = now
})

watch(pair, (now) => {
  ;[
    historyPair,
    tradeHistoryPair,
    orderBookPair,
    askBidPair,
    lastPricePair,
    tickerPair,
  ].forEach((v) => {
    v.value = now
  })
})
</script>
