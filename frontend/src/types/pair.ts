import { zaif, coincheck, bitbank } from '/@/types/market'
import type { getTicker } from 'zaif-client'
import type { getTicker as BitbankPair } from 'bitbank-client'
type Arg<T extends (pair: any) => {}> = Parameters<T>[number]

export type ZaifPair = Arg<typeof getTicker>
export type CoincheckPair = ''
export type BitbankPair = Arg<typeof BitbankPair>

export type Pairs<T> = T extends typeof coincheck
  ? CoincheckPair
  : T extends typeof zaif
  ? ZaifPair
  : T extends typeof bitbank
  ? BitbankPair
  : never
