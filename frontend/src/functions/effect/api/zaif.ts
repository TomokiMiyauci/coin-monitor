import type {
  getDepth as GetDepthResponse,
  getLastPrice as GetLastPriceResponse,
  getTicker as GetTickerResponse,
} from 'zaif-client'

import {
  baseGetDepth,
  baseGetRate,
  baseGetTicker,
  get1DPrices,
  get1HPrices,
  get5mPrices,
  getOpenPrice,
} from '/@/functions/effect/api/share'
import { zaifPairsPath } from '/@/functions/pure/api'
import { m } from '/@/functions/pure/options'

const zaif = m('zaif')
type PromiseInner<
  T extends (...args: never) => unknown
> = ReturnType<T> extends Promise<infer data> ? data : never

type ResponseTicker = PromiseInner<typeof GetTickerResponse>
type ResponseDepth = PromiseInner<typeof GetDepthResponse>
type ResponseRate = PromiseInner<typeof GetLastPriceResponse>
const getTicker = (pair: string): Promise<ResponseTicker> =>
  baseGetTicker<ResponseTicker>({
    searchParams: {
      ...zaif(pair),
    },
  })
const getDepth = (pair: string): Promise<ResponseDepth> =>
  baseGetDepth<ResponseDepth>({
    searchParams: {
      ...zaif(pair),
    },
  })

const getRate = (pair: string): Promise<ResponseRate> =>
  baseGetRate<ResponseRate>({
    searchParams: {
      ...zaif(pair),
    },
  })

const baseZaifGetOpenPrice = getOpenPrice(zaifPairsPath)
const get1HRates = get1HPrices(zaifPairsPath)
const get5mRates = get5mPrices(zaifPairsPath)
const get1DRates = get1DPrices(zaifPairsPath)

export {
  baseZaifGetOpenPrice,
  get1DRates,
  get1HRates,
  get5mRates,
  getDepth,
  getRate,
  getTicker,
  ResponseDepth,
  ResponseRate,
  ResponseTicker,
}
