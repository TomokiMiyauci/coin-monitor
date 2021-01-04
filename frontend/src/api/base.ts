import ky from 'ky-universal'
import type { Options } from 'ky'

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

export const makePair = (pair: string) => ({ pair })
export const makeMarket = (market: Markets) => ({ market })

const getSearchParams = <T extends Markets>(
  market: T,
  pair: string
): Options => ({
  searchParams: {
    ...makePair(pair),
    ...makeMarket(market),
  },
})

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
