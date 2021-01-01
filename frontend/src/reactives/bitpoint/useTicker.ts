import { useInterval } from '/@/core/interval'
import { depth } from '/@/reactives/api/bitpoint'
import { ComputedRef, computed } from 'vue'
import { ResponseDepth } from '/@/functions/effect/api/bitpoint'

export const useTicker = () => {
  const { state: ticker, setData } = depth()
  setData()
  useInterval(setData, 10000)

  return {
    ...compute(ticker),
  }
}

const compute = (state: ComputedRef<ResponseDepth | undefined>) => {
  const ask = computed(() => state.value?.asks[0])
  const bid = computed(() => state.value?.bids[9])

  return {
    ask,
    bid,
  }
}
