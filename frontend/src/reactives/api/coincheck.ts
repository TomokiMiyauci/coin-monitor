import { kyInstance } from '/@/functions/pure/api'
import { useReactive } from '/@/core/reactive'
import {
  getOpenPrice,
  ResponseData,
  getRate,
  ResponseGetRate,
} from '/@/functions/effect/api/coincheck'
import { useFirestore } from '/@/plugins/firebase'
import { CoincheckPair } from '/@/types/pair'

const useOpenPrice = (pair: CoincheckPair) => {
  const { $firestore } = useFirestore()
  const { state, setState, resetState } = useReactive<
    (ResponseData & { pair: CoincheckPair }) | undefined
  >(undefined)

  const setData = async () => {
    setState({ ...(await getOpenPrice(pair, $firestore)), pair })
    console.log(state.value)
  }

  return {
    state,
    setData,
    resetState,
  }
}

const useRate = (kyInstance: kyInstance, pair: CoincheckPair) => {
  const { state, setState, resetState } = useReactive<
    (ResponseGetRate & { pair: CoincheckPair }) | undefined
  >(undefined)

  const setData = async () => {
    setState({ ...(await getRate(pair, kyInstance)), pair })
  }

  return {
    state,
    setData,
    resetState,
  }
}

export { useOpenPrice, useRate }
