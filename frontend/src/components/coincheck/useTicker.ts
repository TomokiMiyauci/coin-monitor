import { ref, computed } from 'vue'
import { getTicker } from '/@/api/coincheck'
import { useInterval } from '/@/core/interval'

export const useTicker = () => {
  const state = ref()
  const { get } = getTicker()

  const setData = async () => {
    state.value = await get()
  }

  const last = computed(() => state.value?.last)
  const ask = computed(() => state.value?.ask)
  const bid = computed(() => state.value?.bid)

  setData()
  useInterval(setData, 10000)

  return { setData, last, ask, bid }
}
