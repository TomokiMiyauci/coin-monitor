import { curry } from '@kahirokunn/ts-curry'
import { limit, orderBy, where } from 'firebase/firestore/lite'
import type { Options } from 'ky'
import ky from 'ky-universal'

import { m } from '/@/functions/pure/options'
import { depth, rate } from '/@/functions/pure/path'
import { Markets } from '/@/types/market'
import { coincheckPair, Pairs } from '/@/types/pair'
import { CoincheckPair } from '/@/types/pair'
import { joinSlash } from '/@/utils/format'

export type Ky = typeof ky

export const baseGetApi = <T extends unknown>(
  path: string,
  options: Options,
  ky: Ky
): Promise<T> => ky.get(path, options).json<T>()

export const firstBaseGetApi = (Ky: Ky, path: string, options: Options) => {
  return Ky.get(path, options).json()
}

export const curriedBaseGetApi = curry(baseGetApi)

export const getDepthApi = curriedBaseGetApi(depth)
export const baseGetRateApi = curriedBaseGetApi(rate)

const coincheckOption = m('coincheck')

export const run = <T, U extends Markets>(
  base: typeof baseGetRateApi,
  pair: Pairs<U>,
  Ky: Ky
): Promise<T> => {
  return base({ searchParams: coincheckPair(pair) })(Ky) as Promise<T>
}

export const curriedRun = <T, U extends Markets>(
  base: typeof baseGetRateApi
) => (pair: Pairs<U>, Ky: Ky) => run(base, pair, Ky) as Promise<T>
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
  dateLessThanWhere,
  dateOrderBy,
  dateRatherThanWhere,
  limit1,
  limit12,
  zaifPairsPath,
}
