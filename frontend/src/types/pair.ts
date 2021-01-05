import { zaif, coincheck, bitbank, Markets } from '/@/types/market'
import type { getTicker } from 'zaif-client'
import type { getTicker as BitbankPair } from 'bitbank-client'
import { curry } from '@kahirokunn/ts-curry'
type Arg<T extends (pair: any) => Promise<any>> = Parameters<T>[number]

export type ZaifPair = Arg<typeof getTicker>
export type CoincheckPair = ''
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

export { coincheckPair, zaifPair, bitbankPair }
