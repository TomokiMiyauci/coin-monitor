import { computed, Ref, watch } from 'vue'
import { getTrades } from '/@/api/zaif'
import { useInterval } from '/@/core/interval'
import { useReactive } from '/@/core/reactive'
import type { getTrades as data } from 'zaif-client'
import { ZaifPairs } from '/@/components/zaif/pair'
type Data = ReturnType<typeof data> extends Promise<infer data> ? data : never

type TradeData = {
  id: number
  date: Date
  type: 'SELL' | 'BUY'
  rate: number
  amount: number
}

export const useTrades = (pair: Ref<ZaifPairs>) => {
  const { state, setState } = useReactive<Data>([])

  const { get } = getTrades()

  const data = computed<TradeData[]>(() => {
    return state.value.map(({ price, tid, trade_type, ...rest }) => {
      return {
        id: tid,
        rate: price,
        type: trade_type === 'ask' ? 'SELL' : 'BUY',
        ...rest,
      }
    })
  })

  const setData = async () => {
    setState(await get(pair.value))
  }

  watch(pair, () => {
    setState([])
    setData()
  })

  setData()
  useInterval(setData, 10000)

  return { setData, data }
}
