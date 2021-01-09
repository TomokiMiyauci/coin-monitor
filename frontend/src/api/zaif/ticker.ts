import type { getTicker } from 'zaif-client'
export type ResponseBody = ReturnType<typeof getTicker> extends Promise<
  infer data
>
  ? data
  : never
import { useKy } from '/@/plugins/ky'
import { zaif } from '/@/api/ticker'
import { ZaifPair } from '/@/types/pair'

export default () => {
  const { $http } = useKy()

  return {
    get: (pair: ZaifPair) => zaif($http, pair),
  }
}
