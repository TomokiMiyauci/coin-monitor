import { useReactive } from '/@/core/reactive'
import {
  getDepth,
  ResponseDepth,
  getPrice,
  ResponsePrice,
} from '/@/functions/effect/api/bitpoint'

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

const price = () => {
  const { state, setState } = useReactive<ResponsePrice | undefined>(undefined)
  const setData = async () => {
    setState(await getPrice('BTCJPY'))
  }

  return {
    state,
    setData,
  }
}

export { depth, price }
