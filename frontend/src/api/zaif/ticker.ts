import type { getTicker } from 'zaif-client'
export type ResponseBody = ReturnType<typeof getTicker> extends Promise<
  infer data
>
  ? data
  : never
import { useKy } from '/@/plugins/ky'
import { zaif } from '/@/api/ticker'
import { coincheck as _coincheck, zaif as _zaif } from '/@/types/market'
import { Pairs } from '/@/types/pair'

export default () => {
  const { $http } = useKy()

  return {
    get: (pair: Pairs<typeof _zaif>) => zaif($http, pair),
  }
}
