import { FirebaseFirestore } from 'firebase/firestore/lite'

import { useReactive } from '/@/core/reactive'
import { baseCoincheckGetOpenPrice } from '/@/functions/effect/api/coincheck'
import { ResponseData } from '/@/functions/effect/api/share'

const baseUsePrice = <T>(fn: typeof baseCoincheckGetOpenPrice) => (
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

export { baseUsePrice }
