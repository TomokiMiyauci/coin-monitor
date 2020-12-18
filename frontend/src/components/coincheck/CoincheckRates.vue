<template>
  <div>
    <div class="flex p-2 justify-between items-center">
      <h3 class="ml-2 text-lg text-gray-400">Coins</h3>

      <base-menu :value="base" @input="onChange" />
    </div>
    <base-rate class="mt-4" :rates="symbolMap">
      <template #default="{ symbol }">
        <base-svg-symbol :symbol="symbol">
          <coincheck-symbol :symbol="symbol" />
        </base-svg-symbol>
      </template>
    </base-rate>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRate, getPairs } from '/@/components/coincheck/useRate'
  import BaseRate from '/@/components/base/BaseRate.vue'
  import BaseMenu from '/@/components/base/BaseMenu.vue'
  import BaseSvgSymbol from '../base/BaseSvgSymbol.vue'
  import CoincheckSymbol from './CoincheckSymbol.vue'
  export default defineComponent({
    components: {
      BaseRate,
      BaseMenu,
      BaseSvgSymbol,
      CoincheckSymbol,
    },

    setup() {
      const base = ref('JPY')

      const onChange = (now: any) => {
        base.value = now
        const pairs = getPairs(now)
        console.log(pairs)
        const m = generateCoincheckPairs(pairs)
        coincheckPairs.forEach(
          ({ coincheckPair, symbol, baseSymbol }, index) => {
            symbol.value = m[index].symbol.value
            baseSymbol.value = now
            coincheckPair.value = m[index].coincheckPair.value
          }
        )
      }

      const generateCoincheckPairs = (
        pairs: {
          baseSymbol: string
          symbol: string
        }[]
      ) => {
        return pairs.map(({ baseSymbol, symbol }) => ({
          coincheckPair: ref(
            `${symbol.toLowerCase()}_${baseSymbol.toLowerCase()}`
          ),
          symbol: ref(symbol),
          baseSymbol: ref(baseSymbol),
        }))
      }

      const pairs = getPairs(base.value)
      const coincheckPairs = generateCoincheckPairs(pairs)

      const getRefRateMap = () => {
        return coincheckPairs.map(({ coincheckPair, symbol, baseSymbol }) => {
          const { rate, ratio } = useRate(coincheckPair)
          return {
            rate,
            ratio,
            symbol,
            baseSymbol,
          }
        })
      }
      const symbolMap = ref(getRefRateMap())

      type Rate = {
        symbol: string
        baseSymbol: string
        rate: number | undefined
        ratio: number | undefined
      }

      // const rates = computed(() =>
      //   Object.assign(
      //     {},
      //     ...symbolMap.value.map(({ rate, symbol, ratio }) => {
      //       return { [symbol]: { rate, ratio } }
      //     })
      //   )
      // )

      return {
        onChange,
        symbolMap,
        base,
      }
    },
  })
</script>
