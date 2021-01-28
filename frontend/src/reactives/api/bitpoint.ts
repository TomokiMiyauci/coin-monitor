import { useReactive } from '/@/core/reactive'
import {
  getDepth,
  getPrice,
  getTrades,
  ResponseDepth,
  ResponsePrice,
  ResponseTrades,
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

const trades = () => {
  const { state, setState } = useReactive<ResponseTrades | undefined>(undefined)
  const setData = async () => {
    setState(await getTrades('BTCJPY'))
  }

  return {
    state,
    setData,
  }
}

export { depth, price, trades }
