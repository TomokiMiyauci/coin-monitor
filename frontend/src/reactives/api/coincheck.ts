import { kyInstance } from '/@/functions/pure/api'
import { useReactive } from '/@/core/reactive'
import {
  getRate,
  ResponseGetRate,
  baseCoincheckGetOpenPrice,
  baseCoincheckGetYesterdayNowPrice,
} from '/@/functions/effect/api/coincheck'
import { CoincheckPair } from '/@/types/pair'
import { baseUsePrice } from '/@/reactives/api/share'

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

export { useOpenPrice, useYesterdayNowPrice, useRate }
