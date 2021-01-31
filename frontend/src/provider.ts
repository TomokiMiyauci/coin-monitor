import type { InjectionKey, Ref } from 'vue'

import type { ZaifOrderBookPairs } from '/@/components/zaif/pair'
import type {
  ResponseDepth,
  ResponseRate,
  ResponseTicker,
} from '/@/functions/effect/api/zaif'

type ReactiveUnit<T> = {
  interval: Ref<number>
  intervalId: Ref<number | undefined>
  pairRef: Ref<ZaifOrderBookPairs>
  stateRef: Ref<T>
}
type TickerUnit = ReactiveUnit<ResponseTicker | undefined>
type DepthUnit = ReactiveUnit<ResponseDepth | undefined>
type LastPriceUnit = ReactiveUnit<ResponseRate | undefined>

const tickerKey: InjectionKey<TickerUnit> = Symbol('ticker')
const depthKey: InjectionKey<DepthUnit> = Symbol('depth')
const lastPriceKey: InjectionKey<LastPriceUnit> = Symbol('lastPrice')

export { depthKey, lastPriceKey, tickerKey }
