import { Ref, watch } from 'vue'
import { getTicker } from '/@/api/zaif'
import { useReactive } from '/@/core/reactive'
import { useInterval } from '/@/core/interval'
import type { getTicker as data } from 'zaif-client'
import { computed } from 'vue'
import { ZaifPair } from '/@/types/pair'

type Data = ReturnType<typeof data> extends Promise<infer data> ? data : never

export const useTicker = (pair: Ref<ZaifPair>) => {
  const { get } = getTicker()
  const { state, setState } = useReactive<Data | undefined>(undefined)

  const setData = async () => {
    setState(await get(pair.value))
  }

  const ask = computed(() => state.value?.ask)
  const bid = computed(() => state.value?.bid)
  const high = computed(() => state.value?.high)
  const last = computed(() => state.value?.last)
  const low = computed(() => state.value?.low)
  const volume = computed(() => state.value?.volume)
  const vwap = computed(() => state.value?.vwap)

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
    vwap,
  }
}
