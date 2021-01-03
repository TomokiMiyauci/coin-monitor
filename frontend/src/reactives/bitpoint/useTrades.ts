import { useInterval } from '/@/core/interval'
import { trades } from '/@/reactives/api/bitpoint'
import { ComputedRef, computed } from 'vue'
import { sort } from 'rambda'

export type OrUndefined<T> = T | undefined
export type ComputedRefOrUndefined<T> = ComputedRef<OrUndefined<T>>

export type CommonData = {
  id: number
  date: Date
  rate: number
  amount: number
}

const computeTrades = (state: ReturnType<typeof trades>['state']) => {
  const trades = computed(() => {
    if (!state.value) return
    return sort((a, b) => (a.id < b.id ? 1 : -1), state.value)
  })

  return {
    trades,
  }
}

const computedPropsCommon = (state: ReturnType<typeof trades>['state']) => {
  const data = computed(() =>
    state.value?.map(({ id, time, price, qty }) => {
      return {
        id,
        date: new Date(time),
        rate: price,
        amount: qty,
      }
    })
  )

  return {
    data,
  }
}

export const useTrades = () => {
  const { state, setData } = trades()

  setData()
  useInterval(setData, 10000)
  const { trades: _trades } = computeTrades(state)

  return {
    ...computedPropsCommon(_trades),
  }
}
