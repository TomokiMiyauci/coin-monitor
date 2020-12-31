import { curry } from 'rambda'
import {
  Markets,
  zaif as _zaif,
  coincheck as _coincheck,
} from '/@/types/market'
import {
  baseGetApi,
  kyInstance,
  Pairs,
  makeParameters,
  makeParseJson,
  receiverFactory,
} from '/@/api/base'
import { ResponseBody } from '/@/api/coincheck/ticker'

// type Ticker = {
//   ask: number
//   bid: number
//   high: number
//   low: number
// }

const curriedBaseGetApi = curry(baseGetApi)
const _baseTicker = curriedBaseGetApi('api/src/coincheck/ticker')

const recieve = receiverFactory((key, value) => {
  if (key === 'string') {
    return value
  }

  return value
})

const baseTickerFactory = <T extends Markets>(market: T, pairs: Pairs<T>) => {
  switch (market) {
    case _coincheck: {
      return _baseTicker(makeParameters(market)(pairs))
    }

    case _zaif: {
      return _baseTicker({
        ...makeParameters(market)(pairs),
        ...makeParseJson(recieve),
      })
    }
  }
}

type ResponseTicker<T extends Markets> = T extends 'coincheck'
  ? ResponseBody
  : number

const tick = <T extends Markets>(
  market: T,
  pair: Pairs<T>,
  kyInstance: kyInstance
): Promise<ResponseTicker<T>> => {
  return baseTickerFactory(market, pair)(kyInstance)
}

const tickerFactory = <T extends Markets>(market: T) => (
  kyInstance: kyInstance,
  pair: Pairs<T>
) => tick(market, pair, kyInstance)

const coincheck = tickerFactory(_coincheck)
const zaif = tickerFactory(_zaif)

type Factory = typeof coincheck | typeof zaif

export { coincheck, zaif, Factory }
