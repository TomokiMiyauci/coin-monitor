import ky from 'ky-universal'
import type { Options } from 'ky'

import { curry } from '@kahirokunn/ts-curry'
import { Markets } from '/@/types/market'
import { Pairs } from '/@/types/pair'

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
export const getDepthApi = curriedBaseGetApi('api/src/depth')

export const curriedFirstBaseGetApi = curry(firstBaseGetApi)
export const makePair = <T extends Markets>(pair: Pairs<T>) => ({ pair })
export const makeMarket = (market: Markets) => ({ market })

export const makeSearchParams = (
  searchParams: Options['searchParams']
): Options => ({
  searchParams,
})

const getSearchParams = <T extends Markets>(
  market: T,
  pair: Pairs<T>
): Options => ({
  searchParams: {
    ...makePair(pair),
    ...makeMarket(market),
  },
})

export const curriedGetSearchParams = curry(getSearchParams)

export const makeParameters = <T extends Markets>(market: T) => {
  return (pair: Pairs<T>) => getSearchParams(market, pair)
}

type Reciever = Parameters<JSON['parse']>[1]

export const makeParseJson = (reciever: Reciever): Options => ({
  parseJson: (text: string) => {
    JSON.parse(text, reciever)
  },
})

export const receiverFactory = (fn: (key: string, value: any) => any) => {
  return (key: string, value: any) => fn(key, value)
}
