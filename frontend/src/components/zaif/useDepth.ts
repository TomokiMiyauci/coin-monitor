import { computed, Ref, watch } from 'vue'
import { getDepth } from '/@/api/zaif'
import { useInterval } from '/@/core/interval'
import { useReactive } from '/@/core/reactive'
import type { getDepth as data } from 'zaif-client'

type Data = ReturnType<typeof data> extends Promise<infer data> ? data : never
type Pair = Parameters<typeof data>[number]
export const useDepth = (pair: Ref<Pair>) => {
  const { state, setState } = useReactive<Data | undefined>(undefined)

  const { get } = getDepth()

  const asks = computed(() => {
    return state.value ? state.value.asks.slice(0, 10) : []
  })

  const bids = computed(() => {
    return state.value ? state.value.bids.slice(0, 10) : []
  })

  const setDepth = async () => {
    setState(await get(pair.value))
  }

  watch(pair, () => {
    setState(undefined)
    setDepth()
  })

  setDepth()
  useInterval(setDepth, 10000)

  return { asks, bids, setDepth }
}
