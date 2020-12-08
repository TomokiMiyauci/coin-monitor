import { ref, computed } from 'vue'
import { getRate, Pair } from '/@/api/coincheck'
import { useInterval } from '/@/core/interval'

export const useRate = (pair: Pair) => {
  const state = ref<{ rate: number }>()
  const { get } = getRate()

  const setData = async () => {
    state.value = await get(pair)
  }

  const rate = computed(() => state.value?.rate)

  setData()
  useInterval(setData, 10000)

  return { setData, rate }
}

export const useRates = <T extends Pair>(...pairs: T[]) => {
  const rates = ref<{ T: number }>()

  rates.value = Object.assign(
    {},
    ...pairs.map((pair) => {
      const { rate } = useRate(pair)
      return { [pair]: rate }
    })
  )

  return {
    rates,
  }
}
