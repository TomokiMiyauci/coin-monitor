import { ref, computed, onBeforeMount } from 'vue'
import { getTrades } from '/@/api/coincheck'

export const useTrades = () => {
  const state = ref<{
    data: {
      rate: number
      created_at: string
      amount: number
      order_type: 'sell' | 'buy'
    }[]
  }>()
  const { get } = getTrades()

  const data = computed(() => {
    if (!state.value) return

    return state.value.data.map(({ rate, created_at, order_type, amount }) => {
      return {
        date: new Date(Date.parse(created_at)),
        type: order_type === 'sell' ? 'SELL' : 'BUY',
        rate,
        amount,
      }
    })
  })

  const setData = async () => {
    state.value = await get()
  }

  onBeforeMount(() => {
    setInterval(setData, 10000)
  })

  setData()

  return { setData, data }
}
