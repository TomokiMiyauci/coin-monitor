import ky from 'ky-universal'
import type { Options } from 'ky'

import { curry } from '@kahirokunn/ts-curry'
import { Markets } from '/@/types/market'
import { coincheckPair, Pairs } from '/@/types/pair'
import { orderBy, where, limit } from 'firebase/firestore/lite'
import { joinSlash } from '/@/utils/format'
import { CoincheckPair } from '/@/types/pair'
import { m } from '/@/functions/pure/options'
import { rate, depth } from '/@/functions/pure/path'

export type kyInstance = typeof ky

export const baseGetApi = (
  path: string,
  options: Options,
  kyInstance: kyInstance
) => {
  return kyInstance.get(path, options).json()
}

export const firstBaseGetApi = (
  kyInstance: kyInstance,
  path: string,
  options: Options
) => {
  return kyInstance.get(path, options).json()
}

export const curriedBaseGetApi = curry(baseGetApi)

export const getDepthApi = curriedBaseGetApi(depth)
export const baseGetRateApi = curriedBaseGetApi(rate)

const coincheckOption = m('coincheck')

export const run = <T, U extends Markets>(
  base: typeof baseGetRateApi,
  pair: Pairs<U>,
  kyInstance: kyInstance
): Promise<T> => {
  return base({ searchParams: coincheckPair(pair) })(kyInstance) as Promise<T>
}

export const curriedRun = <T, U extends Markets>(
  base: typeof baseGetRateApi
) => (pair: Pairs<U>, kyInstance: kyInstance) =>
  run(base, pair, kyInstance) as Promise<T>
export const curriedFirstBaseGetApi = curry(firstBaseGetApi)

// export const makeParameters = <T extends Markets>(market: T) => {
//   return (pair: Pairs<T>) => getSearchParams(market, pair)
// }

// export const receiverFactory = (fn: (key: string, value: any) => any) => {
//   return (key: string, value: any) => fn(key, value)
// }

const getCollectionPath = (
  root: 'markets',
  second: 'coincheck' | 'zaif',
  third: 'pairs',
  forth: CoincheckPair,
  fifth: 'rates' | '1H' | '5m' | '1D'
) => joinSlash(root, second, third, forth, fifth)

const curriedGetCollectionPath = curry(getCollectionPath)
const marketsPath = curriedGetCollectionPath('markets')
const coincheckPath = marketsPath('coincheck')
const zaifPath = marketsPath('zaif')
const coincheckPairsPath = coincheckPath('pairs')
const zaifPairsPath = zaifPath('pairs')

const curriedOrderBy = curry(orderBy)
const dateOrderBy = curriedOrderBy('date')
const curriedWhere = curry(where)
const dateWhere = curriedWhere('date')
const dateRatherThanWhere = dateWhere('>')
const dateLessThanWhere = dateWhere('<')
const limit1 = limit(1)
const limit12 = limit(12)

export {
  coincheckPairsPath,
  zaifPairsPath,
  dateOrderBy,
  dateRatherThanWhere,
  dateLessThanWhere,
  limit1,
  limit12,
}
