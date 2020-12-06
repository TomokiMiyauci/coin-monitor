import { ref, computed, onBeforeMount } from 'vue'
import { getRate, Pair } from '/@/api/coincheck'

export const useRate = (pair: Pair) => {
  const state = ref<{ rate: number }>()
  const { get } = getRate()

  const setData = async () => {
    state.value = await get(pair)
  }

  const rate = computed(() => state.value?.rate)

  onBeforeMount(() => {
    setInterval(setData, 10000)
  })

  setData()

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
