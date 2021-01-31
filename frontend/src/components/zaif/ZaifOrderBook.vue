<template>
  <div class="flex flex-col">
    <order-book class="hidden sm:block" :asks="asks" :bids="bids">
      <template #menu>
        <select-box-zaif-pair v-model="pair" />
      </template>
    </order-book>

    <line-chart
      id="line"
      class="card-none mt-4 sm:card p-2"
      :data="{
        labels: prices,
        series: [
          {
            name: 'series-1',
            data: asksReduce,
            className: 'fill-current text-red-500 stroke-current',
          },
          {
            name: 'series-2',
            data: bid,
            className: 'fill-current text-green-500 stroke-current',
          },
        ],
      }"
      :options="{
        fullWidth: true,
        chartPadding: {
          right: 10,
        },
        className: 'fill-current text-green-500',
        height: 300,

        series: {
          'series-1': {
            showPoint: false,
            showArea: true,
            lineSmooth: Interpolation.step(),
          },

          'series-2': {
            lineSmooth: Interpolation.step(),
            showPoint: false,
            showArea: true,
          },
        },
        axisX: {
          labelInterpolationFnc: function (value, index) {
            return index % 4 === 0 ? toComma(value) : null
          },
        },

        axisY: {
          labelInterpolationFnc: function (value, index) {
            return index % 2 === 0 ? toComma(value) : null
          },
        },
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { Interpolation } from 'chartist'
import type { Ref } from 'vue'
import { computed, inject } from 'vue'

import LineChart from '/@/components/chart/LineChart.vue'
import OrderBook from '/@/components/order-book/OrderBook.vue'
import type { ZaifOrderBookPairs } from '/@/components/zaif/pair'
import SelectBoxZaifPair from '/@/components/zaif/SelectBoxZaifPair.vue'
import { useDepth } from '/@/components/zaif/useDepth'
import { toComma } from '/@/utils/format'

const pair = inject('orderBookPair') as Ref<ZaifOrderBookPairs>

const { asks, bids } = useDepth(pair)

const asksNumber = computed<number[]>(() =>
  asks.value.map(([, askNumber]) => askNumber)
)

const asksPrices = computed<number[]>(() =>
  asks.value.map(([askPrice]) => askPrice)
)

const bidsPrices = computed<number[]>(() =>
  bids.value.map(([bidPrice]) => bidPrice)
)

const prices = computed<number[]>(() => {
  return [...asksPrices.value, ...bidsPrices.value]
})

const bidsNumber = computed<number[]>(() =>
  bids.value.map(([, bidsNumber]) => bidsNumber)
)
const asksReduce = computed<number[]>(() =>
  asksNumber.value.reduce(reducer, [] as number[]).reverse()
)

const bidsReduce = computed<number[]>(() =>
  bidsNumber.value.reduce(reducer, [] as number[])
)

const bid = computed(() => {
  const num = Array(asksReduce.value.length ? bidsReduce.value.length : 0).fill(
    null
  )
  return [...num, ...bidsReduce.value]
})

const reducer = (acc: number[], cur: number, index: number): number[] => {
  return [...acc, cur + (acc[index - 1] || 0)]
}
</script>
