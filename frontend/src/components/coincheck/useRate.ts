import { ref, computed, ComputedRef, watch } from 'vue'
import { getRate, Pair } from '/@/api/coincheck'
import { useInterval } from '/@/core/interval'
import { useReactive } from '/@/core/reactive'

type UseRate = {
  setData: () => Promise<void>
  rate: ComputedRef<number | undefined>
  ratio: ComputedRef<number | undefined>
  changeInterval: (newInterval: number) => void
}

export const useRate = (pair: Pair): UseRate => {
  const state = ref<{ rate: number }>()
  const { get } = getRate()

  const setData = async () => {
    state.value = await get(pair)
  }

  const { stateRef, setState } = useReactive<number | undefined>(undefined)

  const rate = computed(() => state.value?.rate)
  const hoge = watch(rate, (now) => {
    setState(now)
    hoge()
  })

  const ratio = computed(() => {
    if (!stateRef.value || !rate.value) return 1
    return rate.value / stateRef.value - 1
  })

  setData()
  const { changeInterval } = useInterval(setData, 10000)

  return { setData, rate, changeInterval, ratio }
}

export const useRates = <T extends Pair>(...pairs: T[]) => {
  const rr = ref<
    (UseRate & {
      symbol: T
    })[]
  >([])

  rr.value = pairs.map((pair) => {
    return {
      symbol: pair,
      ...useRate(pair),
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
