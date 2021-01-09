import { kyInstance } from '/@/functions/pure/api'
import { useReactive } from '/@/core/reactive'
import {
  getOpenPrice,
  getYesterdayNowPrice,
  baseGetPrice,
  ResponseData,
  getRate,
  ResponseGetRate,
} from '/@/functions/effect/api/coincheck'
import { FirebaseFirestore } from 'firebase/firestore/lite'
import { CoincheckPair } from '/@/types/pair'

const baseUsePrice = <T>(fn: typeof baseGetPrice) => (
  pair: T,
  date: Date,
  firestore: FirebaseFirestore
) => {
  const { state, setState, resetState } = useReactive<
    (ResponseData & { pair: T }) | undefined
  >(undefined)

  const setData = async () => {
    setState({ ...(await fn(pair, date, firestore)), pair })
  }

  return {
    state,
    setData,
    resetState,
  }
}

const useOpenPrice = baseUsePrice<CoincheckPair>(getOpenPrice)
const useYesterdayNowPrice = baseUsePrice<CoincheckPair>(getYesterdayNowPrice)

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

export { useOpenPrice, useYesterdayNowPrice, useRate }
