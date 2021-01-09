import type { Options } from 'ky'
import { Markets } from '/@/types/market'
import { Pairs } from '/@/types/pair'
import { curry } from '@kahirokunn/ts-curry'

type Reviver = Parameters<JSON['parse']>[1]
const makeParseJson = (reviver: Reviver): Options => ({
  parseJson: (text: string) => {
    JSON.parse(text, reviver)
  },
})

const makeSearchParams = (searchParams: Options['searchParams']): Options => ({
  searchParams,
})

const makePair = <T extends Markets>(pair: Pairs<T>) => ({ pair })
const makeMarket = (market: Markets) => ({ market })

const make = <T extends Markets>(market: Markets, pair: Pairs<T>) => ({
  ...makeMarket(market),
  ...makePair(pair),
})

const m = curry(make)

export { makeSearchParams, Reviver, makeParseJson, make, m }
