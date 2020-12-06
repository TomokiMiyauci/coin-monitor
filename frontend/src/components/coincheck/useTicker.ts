import { ref, computed, onBeforeMount } from 'vue'
import { getTicker } from '/@/api/coincheck'

export const useTicker = () => {
  const state = ref()
  const { get } = getTicker()

  const setData = async () => {
    state.value = await get()
  }

  const last = computed(() => state.value?.last)
  const ask = computed(() => state.value?.ask)
  const bid = computed(() => state.value?.bid)

  onBeforeMount(() => {
    setInterval(setData, 10000)
  })

  setData()

  return { setData, last, ask, bid }
}
