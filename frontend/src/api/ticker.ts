import { curry } from 'rambda'
import {
  Markets,
  zaif as _zaif,
  coincheck as _coincheck,
  bitbank as _bitbank,
} from '/@/types/market'
import {
  baseGetApi,
  kyInstance,
  makeParameters,
  makeParseJson,
  receiverFactory,
} from '/@/api/base'
import { ResponseBody } from '/@/api/coincheck/ticker'
import { ResponseBody as ZaifResponseBoby } from '/@/api/zaif/ticker'
import { ResponseBody as BitbankResponseBoby } from '/@/api/bitbank/ticker'
import { Pairs } from '/@/types/pair'

// type Ticker = {
//   ask: number
//   bid: number
//   high: number
//   low: number
// }

const curriedBaseGetApi = curry(baseGetApi)
const _baseTicker = curriedBaseGetApi('api/src/ticker')

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
      })
    }

    case _bitbank: {
      return _baseTicker(makeParameters(market)(pairs))
    }
  }
}

type ResponseTicker<T extends Markets> = T extends typeof _coincheck
  ? ResponseBody
  : T extends typeof _zaif
  ? ZaifResponseBoby
  : T extends typeof _bitbank
  ? BitbankResponseBoby
  : never

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
const bitbank = tickerFactory(_bitbank)

type Factory = typeof coincheck | typeof zaif | typeof bitbank

export { coincheck, zaif, Factory, bitbank }
