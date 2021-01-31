<template>
  <div class="sm:col-span-1 card-none sm:card sm:my-4">
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
        <select-box-zaif-pair v-model="pair" />
      </span>
    </h2>
    <line-chart v-bind="lineChart" id="history" />

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
</template>
<script setup lang="ts">
import day from 'dayjs'
import type { Ref } from 'vue'
import { computed, inject, onBeforeMount, ref, watch } from 'vue'

import LineChart from '/@/components/chart/LineChart.vue'
import type { ZaifOrderBookPairs } from '/@/components/zaif/pair'
import SelectBoxZaifPair from '/@/components/zaif/SelectBoxZaifPair.vue'
import {
  get1DRates,
  get1HRates,
  get5mRates,
} from '/@/functions/effect/api/zaif'
import { useFirestore } from '/@/plugins/firebase'
import { toComma } from '/@/utils/format'
import { min } from '/@/utils/math'

const data = ref<number[]>([])
const labels = ref<Date[]>([])
const pair = inject('tradeHistoryPair') as Ref<ZaifOrderBookPairs>

const lineChart = computed(() => ({
  data: {
    labels: labels.value,
    series: [
      {
        data: data.value,
        className: 'fill-current text-green-400 stroke-current',
      },
    ],
  },
  options: {
    low: lowValue.value,
    height: 400,
    fullWidth: true,
    chartPadding: {
      left: 40,
      right: 40,
      bottom: 0,
    },
    axisY: {
      labelInterpolationFnc: (value: number) => toComma(value),
    },

    axisX: {
      labelInterpolationFnc: (date: Date) =>
        value.value === '1D'
          ? day(date).format('M/DD')
          : day(date).format('H:mm'),
    },

    showArea: true,
  },
  responsiveOptions: [
    [
      'screen and (max-width: 640px)',
      {
        showPoint: false,
        height: 300,
        axisX: {
          labelInterpolationFnc: (date: Date, index: number) => {
            return index % 2 === 0
              ? value.value === '1D'
                ? day(date).format('M/DD')
                : day(date).format('H:mm')
              : null
          },
          showGrid: false,
        },
        axisY: {
          className: 'text-sm',
          labelInterpolationFnc: (value: number, index: number) => {
            return index % 2 === 0
              ? value > 1000
                ? `${toComma(value / 1000)}k`
                : value
              : null
          },
        },
        chartPadding: {
          left: 10,
          right: 30,
        },
      },
    ],
  ],
}))

const value = ref<'1H' | '5m' | '1D'>('1H')
const { firestore } = useFirestore()

const getPrice = (pair: ZaifOrderBookPairs) => {
  const g = intervalFactory(value.value)
  g(pair, new Date(), firestore).then((e) => {
    data.value = e.map(({ value }) => value)
    labels.value = e.map(({ date }) => date)
  })
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

watch(pair, (now) => {
  getPrice(now)
})

watch(value, () => {
  getPrice(pair.value)
})

onBeforeMount(() => {
  getPrice(pair.value)
})

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
