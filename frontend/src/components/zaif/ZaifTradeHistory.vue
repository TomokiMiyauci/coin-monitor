<template>
  <div class="flex flex-col">
    <trade-history class="hidden mb-4 sm:block" :data="data20">
      <template #menu>
        <select-box-zaif-pair :value="pair" @input="onInput" />
      </template>
    </trade-history>

    <pie-chart
      id="number"
      class="card-none sm:card"
      :data="chartData"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
import { IPieChartOptions } from 'chartist'
import type { Ref } from 'vue'
import { computed, inject } from 'vue'

import TradeHistory from '/@/components/base/TradeHistory.vue'
import PieChart from '/@/components/chart/PieChart.vue'
import type { ZaifOrderBookPairs } from '/@/components/zaif/pair'
import SelectBoxZaifPair from '/@/components/zaif/SelectBoxZaifPair.vue'
import { useTrades } from '/@/components/zaif/useTrades'

const pair = inject('historyPair') as Ref<ZaifOrderBookPairs>

const { data } = useTrades(pair)
const buys = computed(() =>
  data.value.filter((tradeData) => tradeData.type === 'BUY')
)
const sells = computed(() =>
  data.value.filter((tradeData) => tradeData.type === 'SELL')
)

const chartData = computed(() => ({
  series: [
    {
      data: [buys.value.length],
      className: 'text-red-500 fill-current',
    },
    {
      data: [sells.value.length],
      className: 'text-green-500 fill-current',
    },
  ],
}))

const options = computed<IPieChartOptions>(() => ({
  height: 200,
  labelInterpolationFnc: (value: number, index: number) => {
    return index === 0 ? `Asks:${value}` : `Bids:${value}`
  },
  startAngle: 270,
  total: data.value.length * 2,
  chartPadding: 20,
}))

const data20 = computed(() => data.value.slice(0, 20))

const onInput = (payload: ZaifOrderBookPairs) => {
  pair.value = payload
}
</script>
