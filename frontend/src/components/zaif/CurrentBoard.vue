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
      <span class="flex gap-1 sm:gap-4">
        <span>
          <button
            v-for="{ text } in [{ text: '5m' }, { text: '1H' }]"
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
          left: 40,
          right: 40,
        },
        axisY: {
          labelInterpolationFnc: (value) => toComma(value),
        },
        axisX: {
          ticks: [1],
        },
        ticks: [1],
        showArea: true,
      }"
      :responsive-options="[
        [
          'screen and (max-width: 640px)',
          {
            showPoint: false,
            axisX: {
              labelInterpolationFnc: function (value, index) {
                return index % 4 === 0 ? value : null
              },
              showGrid: false,
            },
            axisY: {
              className: 'text-sm',
              labelInterpolationFnc: function (value, index) {
                return index % 4 === 0
                  ? value > 1000
                    ? `${toComma(value / 1000)}k`
                    : value
                  : null
              },
            },
            chartPadding: {
              left: 20,
              right: 10,
            },
          },
        ],
      ]"
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
  import { get1HRates, get5mRates } from '/@/functions/effect/api/zaif'
  import { useFirestore } from '/@/plugins/firebase'
  import type { ZaifOrderBookPairs } from '/@/components/zaif/pair'
  import day from 'dayjs'
  import { toComma } from '/@/utils/format'
  const { lastPrice } = useLastPrice()
  const data = ref<number[]>([])
  const labels = ref<string[]>([])
  const pair = inject('tradeHistoryPair') as Ref<ZaifOrderBookPairs>
  const value = ref<'1H'>('1H')
  const { $firestore } = useFirestore()

  const getPrice = (pair: ZaifOrderBookPairs) => {
    const g = intervalFactory(value.value)
    g(pair, new Date(), $firestore).then((e) => {
      data.value = e.map(({ value }) => value)
      labels.value = e.map(({ date }) => day(date).format('H:mm'))
    })
  }

  const intervalFactory = (payload: '1H' | '5m') => {
    switch (payload) {
      case '1H': {
        return get1HRates
      }

      case '5m': {
        return get5mRates
      }
    }
  }
  const onInput = (payload: ZaifOrderBookPairs) => {
    pair.value = payload
  }

  watch(pair, (now) => {
    console.log(2)

    getPrice(now)
  })

  watch(value, () => {
    console.log(1)
    getPrice(pair.value)
  })

  onBeforeMount(() => getPrice(pair.value))
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
