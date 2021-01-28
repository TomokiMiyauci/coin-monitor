import type { getTicker as data, Pairs } from 'bitbank-client'
import { Ref, watch } from 'vue'
import { computed } from 'vue'

import { getTicker } from '/@/api/bitbank'
import { useInterval } from '/@/core/interval'
import { useReactive } from '/@/core/reactive'

type Data = ReturnType<typeof data> extends Promise<infer data> ? data : never

export const useTicker = (pair: Ref<Pairs>) => {
  const { get } = getTicker()
  const { state, setState } = useReactive<Data['data'] | undefined>(undefined)

  const setData = async () => {
    const { data } = await get(pair.value)
    setState(data)
  }

  const ask = computed(() => state.value?.sell)
  const bid = computed(() => state.value?.buy)
  const high = computed(() => state.value?.high)
  const last = computed(() => state.value?.last)
  const low = computed(() => state.value?.low)
  const volume = computed(() => state.value?.vol)

  setData()

  watch(pair, setData)
  useInterval(setData, 10000)

  return {
    ask,
    bid,
    high,
    low,
    volume,
    last,
  }
}
