import { coincheckPairsPath } from '/@/functions/pure/api'
import {
  getOpenPrice,
  getYesterdayNowPrice,
  getPrices,
} from '/@/functions/effect/api/share'
import { curriedRun, baseGetRateApi } from '/@/functions/pure/api'

const baseCoincheckGetOpenPrice = getOpenPrice(coincheckPairsPath)
const baseCoincheckGetYesterdayNowPrice = getYesterdayNowPrice(
  coincheckPairsPath
)
type ResponseGetRate = { rate: number }

const getRate = curriedRun<ResponseGetRate, 'coincheck'>(baseGetRateApi)
const get1HRates = getPrices(coincheckPairsPath)
export {
  ResponseGetRate,
  getRate,
  get1HRates,
  baseCoincheckGetOpenPrice,
  baseCoincheckGetYesterdayNowPrice,
}
