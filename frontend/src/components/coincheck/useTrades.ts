import { computed, ref } from 'vue'

import { getTrades } from '/@/api/coincheck'
import { useInterval } from '/@/core/interval'

export const useTrades = () => {
  const state = ref<{
    data: {
      id: number
      rate: number
      created_at: string
      amount: number
      order_type: 'sell' | 'buy'
    }[]
  }>()
  const { get } = getTrades()

  const data = computed(() => {
    if (!state.value) return

    return state.value.data.map(
      ({ id, rate, created_at, order_type, amount }) => {
        return {
          id,
          date: new Date(Date.parse(created_at)),
          type: order_type === 'sell' ? ('SELL' as const) : ('BUY' as const),
          rate,
          amount,
        }
      }
    )
  })

  const setData = async () => {
    state.value = await get()
  }

  setData()
  useInterval(setData, 10000)

  return { setData, data }
}
