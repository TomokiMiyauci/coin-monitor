import { getTicker } from '/@/api/zaif'
import { useReactive } from '/@/core/reactive'
import { useInterval } from '/@/core/interval'
import type { getTicker as data } from 'zaif-client'
import { computed } from 'vue'

type Data = ReturnType<typeof data> extends Promise<infer data> ? data : never

export const useTicker = () => {
  const { get } = getTicker()
  const { state, setState } = useReactive<Data | undefined>(undefined)

  const setData = async () => {
    setState(await get())
  }

  const ask = computed(() => state.value?.ask)
  const bid = computed(() => state.value?.bid)
  const high = computed(() => state.value?.high)
  const last = computed(() => state.value?.last)
  const low = computed(() => state.value?.low)
  const volume = computed(() => state.value?.volume)
  const vwap = computed(() => state.value?.vwap)

  setData()
  useInterval(setData, 10000)

  return {
    ask,
    bid,
    high,
    low,
    volume,
    last,
    vwap,
  }
}
