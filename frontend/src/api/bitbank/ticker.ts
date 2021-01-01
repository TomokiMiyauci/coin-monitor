import type { getTicker } from 'bitbank-client'
export type ResponseBody = ReturnType<typeof getTicker> extends Promise<
  infer data
>
  ? data
  : never
import { useKy } from '/@/plugins/ky'
import { bitbank } from '/@/api/ticker'
import { bitbank as _bitbank } from '/@/types/market'
import { Pairs } from '/@/types/pair'

export default () => {
  const { $http } = useKy()

  return {
    get: (pair: Pairs<typeof _bitbank>) => bitbank($http, pair),
  }
}
