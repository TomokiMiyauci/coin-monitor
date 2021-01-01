import { useReactive } from '/@/core/reactive'
import { getDepth, ResponseDepth } from '/@/functions/effect/api/bitpoint'

const depth = () => {
  const { state, setState } = useReactive<ResponseDepth | undefined>(undefined)
  const setData = async () => {
    setState(await getDepth('BTCJPY'))
  }

  return {
    state,
    setData,
  }
}

export { depth }
