import { coincheckPairsPath } from '/@/functions/pure/api'
import {
  getOpenPrice,
  getYesterdayNowPrice,
} from '/@/functions/effect/api/share'
import { curriedRun, baseGetRateApi } from '/@/functions/pure/api'

const baseCoincheckGetOpenPrice = getOpenPrice(coincheckPairsPath)
const baseCoincheckGetYesterdayNowPrice = getYesterdayNowPrice(
  coincheckPairsPath
)
type ResponseGetRate = { rate: number }

const getRate = curriedRun<ResponseGetRate, 'coincheck'>(baseGetRateApi)

export {
  ResponseGetRate,
  getRate,
  baseCoincheckGetOpenPrice,
  baseCoincheckGetYesterdayNowPrice,
}
