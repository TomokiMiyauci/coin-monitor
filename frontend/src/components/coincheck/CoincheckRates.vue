<template>
  <div class="card overflow-scroll">
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

    <rate-table-ratio
      class="w-full"
      :headers="[
        { value: 'ratioIp', text: '0:00', tooltipText: 'Now / Initial Price' },
        { value: 'ratio', text: '1D', tooltipText: 'Now / Yesterday Now' },
      ]"
      :items="ccc"
    >
      <template #default="{ symbol }">
        <base-svg-symbol :symbol="symbol">
          <coincheck-symbol :symbol="symbol" />
        </base-svg-symbol>
      </template>
    </rate-table-ratio>
  </div>
</template>

<script setup lang="ts">
import type { FirebaseFirestore } from 'firebase/firestore/lite'
import { computed, ref } from 'vue'

import BaseSvgSymbol from '/@/components/base/BaseSvgSymbol.vue'
import CoincheckSymbol from '/@/components/coincheck/CoincheckSymbol.vue'
import { getPairs } from '/@/components/coincheck/useRate'
import RateTableRatio from '/@/components/rate/RateTableRatio.vue'
import { useInterval } from '/@/core/interval'
import { useFirestore } from '/@/plugins/firebase'
import { useKy } from '/@/plugins/ky'
import { useRate } from '/@/reactives/api/coincheck'
import { useOpenPrice, useYesterdayNowPrice } from '/@/reactives/api/coincheck'
import { getLowercasePair } from '/@/utils/format'
const { $http } = useKy()
const { firestore } = useFirestore()
const now = new Date()

const base = ref<'JPY'>('JPY')

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

const pairs = getPairs(base.value)
const convertor = (
  pairs: {
    baseSymbol: string
    symbol: string
  }[]
) => pairs.map(({ baseSymbol, symbol }) => getLowercasePair(symbol, baseSymbol))
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

const activator = (
  pair: string,
  fn: typeof useOpenPrice,
  date: Date,
  firestore: FirebaseFirestore
) => {
  const { state, setData } = fn(pair, date, firestore)
  setData()

  return {
    state,
    setData,
  }
}

const b = lowerPairs.value.map((pair) =>
  activator(pair, useOpenPrice, now, firestore)
)
const c = lowerPairs.value.map((pair) =>
  activator(pair, useYesterdayNowPrice, now, firestore)
)

const reducer = (acc: any, cur: ReturnType<typeof activator>) => {
  if (!cur.state.value) return acc

  acc[cur.state.value.pair] = cur.state.value.value
  return acc
}

const bbbb = computed(() =>
  a.reduce((acc, cur) => {
    if (!cur.state.value) return acc

    acc[cur.state.value.pair] = cur.state.value.rate
    return acc
  }, {})
)
const bbb = computed(() => b.reduce(reducer, {}))
const eee = computed(() => c.reduce(reducer, {}))

const ccc = computed(() => {
  return pairs.map(({ baseSymbol, symbol }) => {
    const p = getLowercasePair(symbol, baseSymbol)
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
</script>
