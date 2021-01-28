import { curry } from '@kahirokunn/ts-curry'
import type { getTicker as BitbankPair } from 'bitbank-client'
import type { getRate } from 'coincheck-client'
import type { getTicker } from 'zaif-client'

import { bitbank, coincheck, Markets, zaif } from '/@/types/market'
type Arg<T extends (pair: any) => Promise<any>> = Parameters<T>[number]

export type ZaifPair = Arg<typeof getTicker>
export type CoincheckPair = Arg<typeof getRate>
export type BitbankPair = Arg<typeof BitbankPair>

export type Pairs<T extends Markets> = T extends typeof coincheck
  ? CoincheckPair
  : T extends typeof zaif
  ? ZaifPair
  : T extends typeof bitbank
  ? BitbankPair
  : never

const getMarket2Pair = <T extends Markets>(
  market: T,
  pair: Pairs<T>
): {
  market: T
  pair: Pairs<T>
} => ({ market, pair })
const curriedMarket2Pair = curry(getMarket2Pair)
const coincheckPair = curriedMarket2Pair(coincheck)
const zaifPair = curriedMarket2Pair(zaif)
const bitbankPair = curriedMarket2Pair(bitbank)

export { bitbankPair, coincheckPair, zaifPair }
