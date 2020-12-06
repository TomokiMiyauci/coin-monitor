import { ref, computed, onBeforeMount } from 'vue'
import { getOrderBooks } from '/@/api/coincheck'

export const useOrderBook = () => {
  const state = ref()
  const { get } = getOrderBooks()

  const asks = computed(() => {
    return state.value ? state.value.asks : []
  })

  const bids = computed(() => {
    return state.value ? state.value.bids : []
  })

  const setOrderBooks = async () => {
    state.value = await get()
  }

  onBeforeMount(() => {
    setInterval(setOrderBooks, 10000)
  })

  setOrderBooks()

  return { asks, bids, setOrderBooks }
}
