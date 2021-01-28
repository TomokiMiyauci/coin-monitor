import { useReactive } from '/@/core/reactive'
import {
  baseCoincheckGetOpenPrice,
  baseCoincheckGetYesterdayNowPrice,
  getRate,
  ResponseGetRate,
} from '/@/functions/effect/api/coincheck'
import { kyInstance } from '/@/functions/pure/api'
import { baseUsePrice } from '/@/reactives/api/share'
import { CoincheckPair } from '/@/types/pair'

const useOpenPrice = baseUsePrice<CoincheckPair>(baseCoincheckGetOpenPrice)
const useYesterdayNowPrice = baseUsePrice<CoincheckPair>(
  baseCoincheckGetYesterdayNowPrice
)

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

export { useOpenPrice, useRate, useYesterdayNowPrice }
