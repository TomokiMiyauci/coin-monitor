<template>
  <div class="2xl:grid grid-cols-2 grid-rows-2 gap-4">
    <latest-price
      class="col-span-full 2xl:mb-0 row-span-1 2xl:col-span-1"
      :value="lastPriceRef?.last_price"
    >
      <template #header>
        <div class="flex gap-4 items-center">
          <div>
            <input
              v-model.number="intervalLastPrice"
              min="1"
              class="appearance-none h-4 bg-blue-300 shadow p-px cursor-pointer outline-none rounded-xl"
              max="10"
              step="3"
              type="range"
            />

            <div class="flex justify-between px-1">
              <span>1</span><span class="ml-2">4</span
              ><span class="ml-2">7</span><span>10</span>
            </div>
          </div>

          <select-box-zaif-pair v-model="pairLastPrice" />
        </div>
      </template>
    </latest-price>
    <zaif-ask-bid
      class="hidden my-4 2xl:my-0 sm:block col-span-full row-span-2 2xl:col-span-1"
    />
  </div>

  <div class="sm:hidden flex gap-2 overflow-x-scroll whitespace-nowrap">
    <button
      class="p-1 focus:outline-none rounded-t border-t border-l border-r shadow"
      :class="
        ['chart', ''].includes(pathRef)
          ? 'bg-white text-green-400'
          : 'bg-gray-200 '
      "
      @click="onClick('chart')"
    >
      <MdiChartBellCurveCumulative /><span class="ml-1 capitalize align-middle"
        >chart</span
      >
    </button>
    <button
      class="p-1 focus:outline-none shadow rounded-t border-t border-l border-r"
      :class="
        ['order-book'].includes(pathRef)
          ? 'bg-white text-green-400'
          : 'bg-gray-200'
      "
      @click="onClick('order-book')"
    >
      <mdi-book-open />
      <span class="ml-1 capitalize align-middle">order book</span>
    </button>
    <button
      class="p-1 focus:outline-none shadow rounded-t border-t border-l border-r"
      :class="
        ['history'].includes(pathRef)
          ? 'bg-white text-green-400'
          : 'bg-gray-200 '
      "
      @click="onClick('history')"
    >
      <mdi-history />

      <span class="ml-1 capitalize align-middle">trade history</span>
    </button>
  </div>

  <zaif-history-chart
    v-if="(isMobile && ['chart', ''].includes(pathRef)) || !isMobile"
  />

  <div class="grid grid-cols-6 gap-4">
    <zaif-order-book
      v-if="(isMobile && pathRef === 'order-book') || !isMobile"
      class="col-span-full sm:col-span-6 md:col-span-3 2xl:col-span-2"
    />

    <zaif-trade-history
      v-if="(isMobile && pathRef === 'history') || !isMobile"
      class="col-span-full sm:col-span-6 md:col-span-3 2xl:col-span-2"
    />

    <zaif-rates
      class="col-span-full h-60 sm:h-auto sm:col-span-6 overflow-y-scroll overflow-x-hidden md:col-span-3 2xl:col-span-2"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, inject, ref, watch } from 'vue'

import MdiBookOpen from '/@/components/base/icons/mdi/MdiBookOpen.vue'
import MdiChartBellCurveCumulative from '/@/components/base/icons/mdi/MdiChartBellCurveCumulative.vue'
import MdiHistory from '/@/components/base/icons/mdi/MdiHistory.vue'
import LatestPrice from '/@/components/last-price/LastPrice.vue'
import SelectBoxZaifPair from '/@/components/zaif/SelectBoxZaifPair.vue'
import ZaifAskBid from '/@/components/zaif/ZaifAskBid.vue'
import ZaifHistoryChart from '/@/components/zaif/ZaifHistoryChart.vue'
import ZaifOrderBook from '/@/components/zaif/ZaifOrderBook.vue'
import ZaifRates from '/@/components/zaif/ZaifRates.vue'
import ZaifTradeHistory from '/@/components/zaif/ZaifTradeHistory.vue'
import { getDepth, getRate } from '/@/functions/effect/api/zaif'
import { resetInterval } from '/@/functions/effect/interval'
import { multiplie1000 } from '/@/functions/pure/math'
import { depthKey, lastPriceKey } from '/@/provider'

defineProps<{
  isMobile: boolean
}>()

const {
  intervalId: intervalIdDepth,
  interval: intervalDepth,
  stateRef: depthRef,
  pairRef: pairDepthRef,
} = inject(depthKey)!
const {
  interval: intervalLastPrice,
  intervalId: intervalIdLastPrice,
  stateRef: lastPriceRef,
  pairRef: pairLastPrice,
} = inject(lastPriceKey)!

watch(intervalDepth, (now) => {
  intervalIdDepth.value = resetInterval(
    intervalIdDepth.value,
    async () => (depthRef.value = await getDepth(pairDepthRef.value)),
    multiplie1000(now)
  )
})

watch(intervalLastPrice, (now) => {
  intervalIdLastPrice.value = resetInterval(
    intervalIdLastPrice.value,
    async () => (lastPriceRef.value = await getRate(pairLastPrice.value)),
    multiplie1000(now)
  )
})

watch(pairLastPrice, (now) => {
  lastPriceRef.value = undefined
  getRate(now).then((result) => (lastPriceRef.value = result))
  intervalIdLastPrice.value = resetInterval(
    intervalIdLastPrice.value,
    async () => (lastPriceRef.value = await getRate(now)),
    multiplie1000(intervalLastPrice.value)
  )
})

const pathRef = ref<'chart' | '' | 'order-book' | 'history'>('')

const onClick = (payload: 'chart' | 'order-book' | 'history') => {
  pathRef.value = payload
}
</script>
