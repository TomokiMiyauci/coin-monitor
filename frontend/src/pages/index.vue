<template>
  <h3 class="text-gray-700 text-3xl mb-8 font-medium capitalize">dashboard</h3>

  <div class="card p-4 w-full md:w-3/5">
    <table class="capitalize mx-auto">
      <tr>
        <th>market</th>
        <th>ask</th>
        <th>bid</th>
        <th>tick</th>
      </tr>

      <!-- <span v-flash>{{ ask }}</span> -->
      <!-- <span v-flash>{{ bid }}</span> -->

      <tr v-for="[key, [ask, bid, tick]] of Object.entries(tickers)" :key="key">
        <td class="p-3">
          <market-icon-text :value="key" />
        </td>
        <td class="p-3">
          {{ toComma(ask) }}
        </td>
        <td class="p-3">{{ toComma(bid) }}</td>
        <td class="p-3">{{ toComma(tick) }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed, ref } from 'vue'

import MarketIconText from '/@/components/base/icons/markets/MarketIconText.vue'
import { useTicker } from '/@/components/coincheck/useTicker'
import { useTicker as useTickerZaif } from '/@/components/zaif/useTicker'
import { useTicker as useTickerBitbank } from '/@/composites/bitbank/useTicker'
import { useTicker as useTickerBitpoint } from '/@/reactives/bitpoint/useTicker'
import { toComma } from '/@/utils/format'

useHead({
  title: 'Dashboard | Coin Monitor',
  meta: [
    {
      name: `description`,
      content: `Currypto currency mornitoring`,
    },
  ],
})
type NumberOrUndefined = number | undefined

type AskBidTickTupple = [
  NumberOrUndefined,
  NumberOrUndefined,
  NumberOrUndefined
]
type Tickers<T> = {
  coincheck: T
  zaif: T
}

const { ask, bid } = useTicker()

const { ask: askBitpoint, bid: bidBitpoint } = useTickerBitpoint()

const pair = ref<'btc_jpy'>('btc_jpy')
const zaif = useTickerZaif(pair)
const bitbank = useTickerBitbank(pair)
const culc = (
  val1: number | undefined,
  val2: number | undefined
): number | undefined => {
  if (typeof val1 === 'undefined' || typeof val2 === 'undefined') return
  return val1 - val2
}
const tickers = computed<Tickers<AskBidTickTupple>>(() => ({
  coincheck: [ask.value, bid.value, culc(ask.value, bid.value)],
  zaif: [zaif.ask.value, zaif.bid.value, culc(zaif.ask.value, zaif.bid.value)],
  bitbank: [
    bitbank.ask.value,
    bitbank.bid.value,
    culc(bitbank.ask.value, bitbank.bid.value),
  ],
  bitpoint: [
    askBitpoint.value?.price,
    bidBitpoint.value?.price,
    culc(askBitpoint.value?.price, bidBitpoint.value?.price),
  ],
}))
</script>
