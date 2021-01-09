<template>
  <base-card>
    <div class="flex p-2 justify-between items-center">
      <h3 class="ml-2 text-lg text-gray-400">Coins</h3>

      <!-- <base-menu
        min-width="136"
        :value="base"
        :symbols="coincheckSymbols"
        @input="onChange"
      >
        <template #default="{ symbol }">
          <base-svg-symbol :symbol="symbol">
            <coincheck-symbol :symbol="symbol" />
          </base-svg-symbol>
        </template>
      </base-menu> -->
    </div>

    <rate-table-ratio-ip class="w-full" :items="ccc">
      <template #symbol-icon="{ symbol }">
        <coincheck-symbol :symbol="symbol" />
      </template>
    </rate-table-ratio-ip>
  </base-card>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import { getPairs } from '/@/components/coincheck/useRate'
  import BaseCard from '/@/components/base/BaseCard.vue'

  import { coincheckSymbols } from '/@/components/base/coin'
  import CoincheckSymbol from '/@/components/coincheck/CoincheckSymbol.vue'

  import { useRate } from '/@/reactives/api/coincheck'
  import { useKy } from '/@/plugins/ky'
  import { useInterval } from '/@/core/interval'
  import {
    useOpenPrice,
    useYesterdayNowPrice,
  } from '/@/reactives/api/coincheck'
  import RateTableRatioIp from '/@/components/rate/RateTableRatioIp.vue'
  import { useFirestore } from '/@/plugins/firebase'

  export default defineComponent({
    components: {
      BaseCard,
      RateTableRatioIp,
      CoincheckSymbol,
    },

    setup() {
      const { $http } = useKy()
      const { $firestore } = useFirestore()
      const now = new Date()

      const base = ref('JPY')

      // const onChange = (now: any) => {
      //   base.value = now
      //   const pairs = getPairs(now)
      //   console.log(pairs)
      //   const m = generateCoincheckPairs(pairs)
      //   coincheckPairs.forEach(
      //     ({ coincheckPair, symbol, baseSymbol }, index) => {
      //       symbol.value = m[index].symbol.value
      //       baseSymbol.value = now
      //       coincheckPair.value = m[index].coincheckPair.value
      //     }
      //   )
      // }

      // const generateCoincheckPairs = (
      //   pairs: {
      //     baseSymbol: string
      //     symbol: string
      //   }[]
      // ) => {
      //   return pairs.map(({ baseSymbol, symbol }) => ({
      //     coincheckPair: ref(
      //       `${symbol.toLowerCase()}_${baseSymbol.toLowerCase()}`
      //     ),
      //     symbol: ref(symbol),
      //     baseSymbol: ref(baseSymbol),
      //   }))
      // }

      const lowerPair = (baseSymbol: string, symbol: string): string =>
        `${symbol.toLowerCase()}_${baseSymbol.toLowerCase()}`

      const pairs = getPairs(base.value)
      const convertor = (
        pairs: {
          baseSymbol: string
          symbol: string
        }[]
      ) => pairs.map(({ baseSymbol, symbol }) => lowerPair(baseSymbol, symbol))
      const lowerPairs = computed(() => convertor(pairs))

      const a = lowerPairs.value.map((pair) => {
        const { setData, state } = useRate($http, pair)
        setData()

        useInterval(setData, 10000)

        return {
          state,
          setData,
        }
      })

      const b = lowerPairs.value.map((pair) => {
        const { state, setData } = useOpenPrice(pair, now, $firestore)
        setData()

        return {
          state,
          setData,
        }
      })

      const c = lowerPairs.value.map((pair) => {
        const { state, setData } = useYesterdayNowPrice(pair, now, $firestore)
        setData()

        return {
          state,
          setData,
        }
      })

      const bbbb = computed(() => {
        return a.reduce((acc, { state }) => {
          if (!state.value) return acc

          acc[state.value.pair] = state.value.rate
          return acc
        }, {})
      })

      const bbb = computed(() => {
        return b.reduce((acc, { state }) => {
          if (!state.value) return acc

          acc[state.value.pair] = state.value.value
          return acc
        }, {})
      })

      const eee = computed(() => {
        return c.reduce((acc, { state }) => {
          if (!state.value) return acc

          acc[state.value.pair] = state.value.value
          return acc
        }, {})
      })

      const ccc = computed(() => {
        return pairs.map(({ baseSymbol, symbol }) => {
          const p = lowerPair(baseSymbol, symbol)
          const a = (bbb.value[p] as any) as number
          const e = (eee.value[p] as any) as number
          const b = (bbbb.value[p] as any) as number

          const ratioIp = !!a && !!b ? (b / a - 1) * 100 : undefined
          const ratio = !!e && !!b ? (b / e - 1) * 100 : undefined

          return {
            baseSymbol,
            symbol,
            rate: bbbb.value[p],
            ratio,
            ratioIp,
          }
        })
      })

      // const coincheckPairs = generateCoincheckPairs(pairs)

      // const getRefRateMap = () => {
      //   return coincheckPairs.map(({ coincheckPair, symbol, baseSymbol }) => {
      //     const { rate, ratio } = useRate(coincheckPair)
      //     return {
      //       rate,
      //       ratio,
      //       symbol,
      //       baseSymbol,
      //     }
      //   })
      // }
      // const symbolMap = ref(getRefRateMap())

      // type Rate = {
      //   symbol: string
      //   baseSymbol: string
      //   rate: number | undefined
      //   ratio: number | undefined
      // }

      // const rates = computed(() =>
      //   Object.assign(
      //     {},
      //     ...symbolMap.value.map(({ rate, symbol, ratio }) => {
      //       return { [symbol]: { rate, ratio } }
      //     })
      //   )
      // )

      return {
        ccc,
        bbb,
        // onChange,
        bbbb,
        base,
        coincheckSymbols,
      }
    },
  })
</script>
