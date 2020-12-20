import { ref, computed, ComputedRef, watch, Ref, watchEffect, isRef } from 'vue'
import { getLastPrice } from '/@/api/zaif'
import { useInterval } from '/@/core/interval'
import { useReactive } from '/@/core/reactive'
import { getLastPrice as g } from 'zaif-client'
import { toLowerCase } from '/@/utils/format'
import { ZaifSymbol } from '/@/components/base/coin'

type Pair = Parameters<typeof g>[number]

type UseRate = {
  setData: () => Promise<void>
  rate: ComputedRef<number | undefined>
  ratio: ComputedRef<number | undefined>
  changeInterval: (newInterval: number) => void
}

export const useRate = (pair: Ref<'bch_jpy'>) => {
  const { get } = getLastPrice()
  const { state, setState: setRate } = useReactive<number | undefined>(
    undefined
  )

  const setData = async () => {
    const { last_price } = await get(isRef(pair) ? pair.value : pair)
    setRate(last_price)
  }

  const { stateRef, setState } = useReactive<number | undefined>(undefined)

  const s = watch(state, (now) => {
    setState(now)
    stop()
  })

  watchEffect(() => {
    console.log(111)
    setData()
  })

  const ratio = computed(() => {
    if (!state.value || !stateRef.value) return undefined
    return state.value / stateRef.value - 1
  })

  const { changeInterval, resetInterval } = useInterval(setData, 10000)

  return { setData, rate: state, changeInterval, ratio, stop: resetInterval }
}

export const useR = (pair: Pair) => {
  const { get } = getLastPrice()
  const { state, setState: setRate } = useReactive<number | undefined>(
    undefined
  )

  const setData = async () => {
    const { last_price } = await get(pair)
    setRate(last_price)
  }

  const { stateRef, setState } = useReactive<number | undefined>(undefined)

  const s = watch(state, (now) => {
    setState(now)
    s()
  })

  watchEffect(() => {
    setData()
  })

  const ratio = computed(() => {
    if (!state.value || !stateRef.value) return undefined
    return state.value / stateRef.value - 1
  })

  return { setData, rate: state, ratio }
}

export const useRates = <T extends Pair>(pairs: Ref<T[]>) => {
  const { state, setState: setRate } = useReactive<
    {
      setData: () => Promise<void>
      rate: ComputedRef<number | undefined>
      ratio: ComputedRef<number | undefined>
      symbol: Pair
      baseSymbol: Pair
    }[]
  >([])

  const getUsePair = (pairs: Pair[]) => {
    return pairs.map((pair) => {
      const [symbol, baseSymbol] = pair.split('_')
      return {
        symbol: symbol.toUpperCase() as Pair,
        baseSymbol: baseSymbol as Pair,
        ...useR(pair),
      }
    })
  }

  setRate(getUsePair(pairs.value))

  watch(pairs, (now) => {
    setRate(getUsePair(now))
  })

  const dataSetter = () => {
    state.value.forEach(({ setData }) => {
      setData()
    })
  }

  const rates = computed(() => {
    return state.value.map(({ rate, symbol, ratio, baseSymbol }) => ({
      rate,
      symbol,
      ratio,
      baseSymbol,
    }))
  })

  useInterval(dataSetter, 10000)

  return {
    rates,
    state,
  }
}

export const usePair = (baseSymgbol: Ref<ZaifSymbol>) => {
  const { state: pairs, setState: setPairs } = useReactive(
    getPair(baseSymgbol.value)
  )

  const setData = (baseSymgbol: ZaifSymbol) => {
    setPairs(getPair(baseSymgbol))
  }

  watch(baseSymgbol, (now) => {
    setData(now)
  })
  return {
    pairs,
  }
}

export const zaifPairs = [
  'cszaif_zaif',
  'csbtc_btc',
  'btc_jpy',
  'zaif_btc',
  'bch_jpy',
  'cscmseth_erc20.cms',
  'erc20.cms_jpy',
  'cicc_btc',
  'ncxc_jpy',
  'cscmsxem_mosaic.cms',
  'fscc_btc',
  'cseth_eth',
  'xcp_jpy',
  'mona_btc',
  'ncxc_btc',
  'mosaic.cms_btc',
  'xem_btc',
  'cicc_jpy',
  'csxem_xem',
  'eth_jpy',
  'mona_jpy',
  'bch_btc',
  'xcp_btc',
  'fscc_jpy',
  'eth_btc',
  'mosaic.cms_jpy',
  'jpyz_jpy',
  'zaif_jpy',
  'xem_jpy',
  'erc20.cms_btc',
] as const

const getPair = (baseSymbol: ZaifSymbol) =>
  zaifPairs.filter((pair) => pair.endsWith(`_${toLowerCase(baseSymbol)}`))
