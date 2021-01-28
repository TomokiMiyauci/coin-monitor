import type { getTicker } from 'zaif-client'
export type ResponseBody = ReturnType<typeof getTicker> extends Promise<
  infer data
>
  ? data
  : never
import { zaif } from '/@/api/ticker'
import { useKy } from '/@/plugins/ky'
import { ZaifPair } from '/@/types/pair'

export default () => {
  const { $http } = useKy()

  return {
    get: (pair: ZaifPair) => zaif($http, pair),
  }
}
