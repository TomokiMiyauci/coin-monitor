import {
  get1HPrices,
  getOpenPrice,
  getYesterdayNowPrice,
} from '/@/functions/effect/api/share'
import { coincheckPairsPath } from '/@/functions/pure/api'
import { baseGetRateApi, curriedRun } from '/@/functions/pure/api'

const baseCoincheckGetOpenPrice = getOpenPrice(coincheckPairsPath)
const baseCoincheckGetYesterdayNowPrice = getYesterdayNowPrice(
  coincheckPairsPath
)
type ResponseGetRate = { rate: number }

const getRate = curriedRun<ResponseGetRate, 'coincheck'>(baseGetRateApi)
const get1HRates = get1HPrices(coincheckPairsPath)
export {
  baseCoincheckGetOpenPrice,
  baseCoincheckGetYesterdayNowPrice,
  get1HRates,
  getRate,
  ResponseGetRate,
}
