import type { getAPITicker } from 'coincheck-client'
import { computed, ref } from 'vue'

import { getTicker } from '/@/api/coincheck'
import { useInterval } from '/@/core/interval'

type Data = ReturnType<typeof getAPITicker> extends Promise<infer data>
  ? data
  : never

type NumberOrUndefined = number | undefined
export const useTicker = () => {
  const state = ref<Data>()
  const { get } = getTicker()

  const setData = async () => {
    state.value = await get('')
  }

  const last = computed<NumberOrUndefined>(() => state.value?.last)
  const ask = computed<NumberOrUndefined>(() => state.value?.ask)
  const bid = computed<NumberOrUndefined>(() => state.value?.bid)
  const high = computed<NumberOrUndefined>(() => state.value?.high)
  const low = computed<NumberOrUndefined>(() => state.value?.low)
  const volume = computed<NumberOrUndefined>(() => state.value?.volume)

  setData()
  useInterval(setData, 10000)

  return { setData, last, ask, bid, high, low, volume }
}
