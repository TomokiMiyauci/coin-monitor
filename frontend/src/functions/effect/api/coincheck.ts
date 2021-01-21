import { coincheckPairsPath } from '/@/functions/pure/api'
import {
  getOpenPrice,
  getYesterdayNowPrice,
  get1HPrices,
} from '/@/functions/effect/api/share'
import { curriedRun, baseGetRateApi } from '/@/functions/pure/api'

const baseCoincheckGetOpenPrice = getOpenPrice(coincheckPairsPath)
const baseCoincheckGetYesterdayNowPrice = getYesterdayNowPrice(
  coincheckPairsPath
)
type ResponseGetRate = { rate: number }

const getRate = curriedRun<ResponseGetRate, 'coincheck'>(baseGetRateApi)
const get1HRates = get1HPrices(coincheckPairsPath)
export {
  ResponseGetRate,
  getRate,
  get1HRates,
  baseCoincheckGetOpenPrice,
  baseCoincheckGetYesterdayNowPrice,
}
