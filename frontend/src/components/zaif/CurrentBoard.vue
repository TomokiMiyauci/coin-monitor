<template>
  <div class="2xl:grid grid-cols-2 grid-rows-2 gap-4">
    <latest-price
      class="col-span-full 2xl:mb-0 row-span-1 2xl:col-span-1"
      :value="lastPrice"
    />
    <zaif-ask-bid
      class="hidden my-4 sm:block col-span-full row-span-2 2xl:col-span-1"
    />
  </div>

  <div class="sm:hidden overflow-x-scroll whitespace-nowrap">
    <button
      class="p-1 focus:outline-none border hover:bg-gray-300"
      :class="{ 'bg-gray-200': ['chart', ''].includes(pathRef) }"
      @click="onClick('chart')"
    >
      <MdiChartBellCurveCumulative /><span class="ml-1 capitalize align-middle"
        >chart</span
      >
    </button>
    <button
      class="p-1 focus:outline-none border hover:bg-gray-300"
      :class="{ 'bg-gray-200': pathRef === 'order-book' }"
      @click="onClick('order-book')"
    >
      <mdi-book-open />
      <span class="ml-1 capitalize align-middle">order book</span>
    </button>
    <button
      class="p-1 focus:outline-none border hover:bg-gray-300"
      :class="{ 'bg-gray-200': pathRef === 'history' }"
      @click="onClick('history')"
    >
      <mdi-history />

      <span class="ml-1 capitalize align-middle">trade history</span>
    </button>
  </div>

  <div
    v-if="
      (sm === 'mobile' && ['chart', ''].includes(pathRef)) || sm !== 'mobile'
    "
    class="sm:col-span-1 card-none sm:card sm:my-4"
  >
    <h2 class="p-4 title hidden col-span-1 sm:flex justify-between">
      history
      <span class="flex gap-1 sm:gap-4">
        <span>
          <button
            v-for="{ text } in [{ text: '5m' }, { text: '1H' }, { text: '1D' }]"
            :key="text"
            class="p-2 shadow text-sm focus:outline-none focus:ring-inset border-t ring-gray-600 border-b focus:ring-2 hover:shadow-md btnn transition-all duration-200 bg-white hover:bg-gray-100"
            :class="{
              'bg-gray-700 text-white hover:bg-gray-900': value === text,
            }"
            @click="value = text"
          >
            {{ text }}
          </button>
        </span>
        <select-box-zaif-pair :value="pair" @input="onInput" />
      </span>
    </h2>
    <line-chart
      id="history"
      :data="d"
      :options="{
        low: lowValue,
        height: 400,
        fullWidth: true,
        chartPadding: {
          left: 40,
          right: 40,
          bottom: 0,
        },
        axisY: {
          labelInterpolationFnc: (value) => toComma(value),
        },

        axisX: {
          labelInterpolationFnc: (date) =>
            value === '1D'
              ? day(date).format('M/DD')
              : day(date).format('H:mm'),
        },

        showArea: true,
      }"
      :responsive-options="[
        [
          'screen and (max-width: 640px)',
          {
            showPoint: false,
            height: 300,
            axisX: {
              labelInterpolationFnc: function (date, index) {
                return index % 2 === 0
                  ? value === '1D'
                    ? day(date).format('M/DD')
                    : day(date).format('H:mm')
                  : null
              },
              showGrid: false,
            },
            axisY: {
              className: 'text-sm',
              labelInterpolationFnc: function (value, index) {
                return index % 2 === 0
                  ? value > 1000
                    ? `${toComma(value / 1000)}k`
                    : value
                  : null
              },
            },
            chartPadding: {
              left: 10,
              right: 4,
            },
          },
        ],
      ]"
    />

    <div class="overflow-x-scroll flex px-2 sm:hidden gap-3 whitespace-nowrap">
      <button
        class="rounded-md text-sm hover:text-white transition duration-200 hover:bg-green-400 px-2 py-1 focus:outline-none"
        :class="[value === '5m' ? 'bg-green-400 text-white' : 'text-green-400']"
        @click="value = '5m'"
      >
        5min
      </button>
      <button
        class="rounded-md text-sm hover:text-white transition duration-200 hover:bg-green-400 px-2 py-1 focus:outline-none"
        :class="[value === '1H' ? 'bg-green-400 text-white' : 'text-green-400']"
        @click="value = '1H'"
      >
        1Hour
      </button>
      <button
        class="rounded-md text-sm hover:text-white transition duration-200 hover:bg-green-400 px-2 py-1 focus:outline-none"
        :class="[value === '1D' ? 'bg-green-400 text-white' : 'text-green-400']"
        @click="value = '1D'"
      >
        1Day
      </button>
    </div>
  </div>

  <div class="grid grid-cols-6 gap-4">
    <zaif-order-book
      v-if="(sm === 'mobile' && pathRef === 'order-book') || sm !== 'mobile'"
      class="col-span-full sm:col-span-6 md:col-span-3 2xl:col-span-2"
    />

    <zaif-trade-history
      v-if="(sm === 'mobile' && pathRef === 'history') || sm !== 'mobile'"
      class="col-span-full sm:col-span-6 md:col-span-3 2xl:col-span-2"
    />

    <zaif-rates
      class="col-span-full h-60 sm:h-auto sm:col-span-6 overflow-y-scroll overflow-x-hidden md:col-span-3 2xl:col-span-2"
    />
  </div>
</template>

<script setup lang="ts">
import day from 'dayjs'
import type { Ref } from 'vue'
import { computed, defineEmit, inject, onBeforeMount, ref, watch } from 'vue'

import MdiBookOpen from '/@/components/base/icons/mdi/MdiBookOpen.vue'
import MdiChartBellCurveCumulative from '/@/components/base/icons/mdi/MdiChartBellCurveCumulative.vue'
import MdiHistory from '/@/components/base/icons/mdi/MdiHistory.vue'
import LineChart from '/@/components/chart/LineChart.vue'
import LatestPrice from '/@/components/last-price/LastPrice.vue'
import type { ZaifOrderBookPairs } from '/@/components/zaif/pair'
import SelectBoxZaifPair from '/@/components/zaif/SelectBoxZaifPair.vue'
import { useLastPrice } from '/@/components/zaif/useLastPrice'
import ZaifAskBid from '/@/components/zaif/ZaifAskBid.vue'
import ZaifOrderBook from '/@/components/zaif/ZaifOrderBook.vue'
import ZaifRates from '/@/components/zaif/ZaifRates.vue'
import ZaifTradeHistory from '/@/components/zaif/ZaifTradeHistory.vue'
import {
  get1DRates,
  get1HRates,
  get5mRates,
} from '/@/functions/effect/api/zaif'
import { useFirestore } from '/@/plugins/firebase'
import { toComma } from '/@/utils/format'
import { min } from '/@/utils/math'

defineEmit(['click'])

const useResizeable = () => {
  sm.value = getWindowWidth(window.innerWidth)

  window.addEventListener('resize', () => {
    sm.value = getWindowWidth(window.innerWidth)
  })
}

const sm = ref('')

const getWindowWidth = (width: number): string => {
  if (width <= 640) {
    return 'mobile'
  } else if (width <= 1280) {
    return 'sm'
  } else {
    return 'xl'
  }
}

const { lastPrice } = useLastPrice()
const data = ref<number[]>([])
const labels = ref<Date[]>([])
const pair = inject('tradeHistoryPair') as Ref<ZaifOrderBookPairs>
const value = ref<'1H' | '5m' | '1D'>('1H')
const { firestore } = useFirestore()

const pathRef = ref<'chart' | '' | 'order-book' | 'history'>('')

const getPrice = (pair: ZaifOrderBookPairs) => {
  const g = intervalFactory(value.value)
  g(pair, new Date(), firestore).then((e) => {
    data.value = e.map(({ value }) => value)
    labels.value = e.map(({ date }) => date)
  })
}

const onClick = (payload: 'chart' | 'order-book' | 'history') => {
  pathRef.value = payload
}

const intervalFactory = (payload: '1H' | '5m' | '1D') => {
  switch (payload) {
    case '1H': {
      return get1HRates
    }

    case '5m': {
      return get5mRates
    }

    case '1D': {
      return get1DRates
    }
  }
}
const onInput = (payload: ZaifOrderBookPairs) => {
  pair.value = payload
}

watch(pair, (now) => {
  getPrice(now)
})

watch(value, () => {
  getPrice(pair.value)
})

onBeforeMount(() => {
  useResizeable()
  getPrice(pair.value)
})

const d = computed(() => ({
  labels: labels.value,
  series: [
    {
      data: data.value,
      className: 'fill-current text-red-500 stroke-current',
    },
  ],
}))
const lowValue = computed(() => min(data.value))
</script>

<style scoped lang="scss">
.btnn {
  &:nth-child(1) {
    @apply rounded-l-xl border-t border-b border-l;
  }

  &:nth-last-child(1) {
    @apply rounded-r-xl border-t border-b border-r;
  }
}
</style>
