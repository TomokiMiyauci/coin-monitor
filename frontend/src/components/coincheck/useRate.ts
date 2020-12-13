import { ref, computed, ComputedRef, watch, Ref, watchEffect } from 'vue'
import { getRate, Pair } from '/@/api/coincheck'
import { useInterval } from '/@/core/interval'
import { useReactive } from '/@/core/reactive'

type UseRate = {
  setData: () => Promise<void>
  rate: ComputedRef<number | undefined>
  ratio: ComputedRef<number | undefined>
  changeInterval: (newInterval: number) => void
}

export const useRate = (pair: Ref<Pair>): UseRate => {
  const { state, setState: setRate } = useReactive<
    { rate: number } | undefined
  >(undefined)
  const { get } = getRate()

  const setData = async () => {
    setRate(await get(pair.value))
  }

  const { stateRef, setState } = useReactive<number | undefined>(undefined)

  const rate = computed(() => state.value?.rate)
  const stop = watch(rate, (now) => {
    setState(now)
    stop()
  })

  watchEffect(() => setData())

  const ratio = computed(() => {
    if (!stateRef.value || !rate.value) return undefined
    return rate.value / stateRef.value - 1
  })

  const { changeInterval } = useInterval(setData, 10000)

  return { setData, rate, changeInterval, ratio }
}

export const useRates = <T extends Pair>(pairs: Ref<T[]>) => {
  const rr = ref<
    (UseRate & {
      symbol: T
    })[]
  >([])

  rr.value = pairs.value.map((pair) => {
    return {
      symbol: pair,
      ...useRate(ref(pair)),
    }
  })

  const rates = computed(() =>
    Object.assign(
      {},
      ...rr.value.map(({ rate, symbol, ratio }) => {
        return { [symbol]: { rate, ratio } }
      })
    )
  )

  const change = (interval: number) => {
    rr.value.forEach((r) => {
      r.changeInterval(interval)
    })
  }

  return {
    change,
    rates,
  }
}

export const getRateMap = (symbol: 'JPY' | 'BTC') => {
  const candidates = [
    'JPY',
    'BTC',
    'ETC',
    'BAT',
    'BCH',
    'QTUM',
    'IOST',
    'FCT',
    'MONA',
    'ETH',
    'LSK',
    'XEM',
    'XLM',
    'XRP',
    'LTC',
  ]

  return candidates
    .filter((candidate) => candidate !== symbol)
    .map((candidate) => `${candidate.toLowerCase()}_${symbol.toLowerCase()}`)
}

export const getPairs = (
  symbol: 'JPY' | 'BTC'
): { baseSymbol: string; symbol: string }[] => {
  const candidates = [
    'JPY',
    'BTC',
    'ETC',
    'BAT',
    'BCH',
    'QTUM',
    'IOST',
    'FCT',
    'MONA',
    'ETH',
    'LSK',
    'XEM',
    'XLM',
    'XRP',
    'LTC',
  ]

  return candidates
    .filter((candidate) => candidate !== symbol)
    .map((candidate) => ({ symbol: candidate, baseSymbol: symbol }))
}
