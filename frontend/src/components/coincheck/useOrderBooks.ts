import { ref, computed } from 'vue'
import { getOrderBooks } from '/@/api/coincheck'
import { useInterval } from '/@/core/interval'

export const useOrderBook = () => {
  const state = ref()
  const { get } = getOrderBooks()

  const asks = computed(() => {
    return state.value ? state.value.asks.slice(0, 10) : []
  })

  const bids = computed(() => {
    return state.value ? state.value.bids.slice(0, 10) : []
  })

  const setOrderBooks = async () => {
    state.value = await get()
  }

  setOrderBooks()
  useInterval(setOrderBooks, 10000)

  return { asks, bids, setOrderBooks }
}
