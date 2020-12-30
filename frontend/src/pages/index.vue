<template>
  <default title="dashboard">
    <base-card class="p-4 w-2/5">
      <table class="capitalize mx-auto">
        <tr>
          <th>market</th>
          <th>ask</th>
          <th>bid</th>
          <th>tick</th>
        </tr>

        <tr
          v-for="[key, [ask, bid, tick]] of Object.entries(tickers)"
          :key="key"
        >
          <td class="p-3">
            <svg-text :callback="getComponent" :value="key" />
          </td>
          <td class="p-3">
            {{ toComma(ask) }}
          </td>
          <td class="p-3">{{ toComma(bid) }}</td>
          <td class="p-3">{{ toComma(tick) }}</td>
        </tr>
      </table>
    </base-card>
  </default>
</template>

<script lang="ts">
  import { defineComponent, computed, ref } from 'vue'

  import Default from '/@/layouts/default.vue'
  import { useTicker } from '/@/components/coincheck/useTicker'
  import { useTicker as useTickerZaif } from '/@/components/zaif/useTicker'
  import { useTicker as useTickerBitbank } from '/@/composites/bitbank/useTicker'

  import BaseCard from '../components/base/BaseCard.vue'
  import FlashBox from '/@/components/base/FlashBox.vue'
  import { toComma } from '/@/utils/format'
  import { getComponent } from '/@/components/market/symbol'
  import SvgText from '/@/components/base/SvgText.vue'
  import { useKy } from '/@/plugins/ky'
  import ky from 'ky'
  import Abc from '/@/components/base/img/Abc.vue'

  type NumberOrUndefined = number | undefined
  type AskBidTupple = [NumberOrUndefined, NumberOrUndefined]
  type Market = 'coincheck' | 'zaif' | 'bitbank'
  type AskBidTickTupple = [
    NumberOrUndefined,
    NumberOrUndefined,
    NumberOrUndefined
  ]
  type Tickers<T> = {
    coincheck: T
    zaif: T
  }

  export default defineComponent({
    components: {
      Default,
      BaseCard,
      FlashBox,
      SvgText,
      Abc,
    },

    setup() {
      const { ask, bid } = useTicker()

      type Bitpoint = {
        asks: { price: number; qty: number }[]
        bids: { price: number; qty: number }[]
      }
      const bitpoint = ref<Bitpoint>()
      ky(
        'https://smartapi.bitpoint.co.jp/bpj-smart-api/api/depth?symbol=BTCJPY'
      )
        .then(async (e) => {
          const result = await e.text()

          const json: Bitpoint = JSON.parse(result, (key, value) => {
            if (['asks', 'bids'].includes(key)) {
              const _value = value as {
                price: string
                qty: string
                ignore: false
              }[]
              return _value.map(({ price, qty }) => ({
                price: Number(price),
                qty: Number(qty),
              }))
            }

            return value
          })
          console.log(json)
          return json
        })
        .then((e) => (bitpoint.value = e))

      const askBitpoint = computed(() => bitpoint.value?.asks[0])
      const bidBitpoint = computed(() => bitpoint.value?.bids[9])
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
        zaif: [
          zaif.ask.value,
          zaif.bid.value,
          culc(zaif.ask.value, zaif.bid.value),
        ],
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

      // const t = computed(() => {
      //   console.log(Object.entries(tickers.value))
      //   return Object.entries(tickers.value).reduce((acc, cur) => {
      //     const _key = cur[0] as Market
      //     acc[_key] = cur[1]
      //   }, {} as { zaif: AskBidTupple; coincheck: AskBidTupple })
      // })

      return {
        getComponent,
        tickers,
        toComma,
      }
    },
  })
</script>
