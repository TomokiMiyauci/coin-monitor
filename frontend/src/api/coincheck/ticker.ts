import type { getAPITicker } from 'coincheck-client'
export type ResponseBody = ReturnType<typeof getAPITicker> extends Promise<
  infer data
>
  ? data
  : never
import { coincheck } from '/@/api/ticker'
import { useKy } from '/@/plugins/ky'
import { coincheck as _coincheck } from '/@/types/market'
import { Pairs } from '/@/types/pair'

export default () => {
  const { $http } = useKy()

  return {
    get: (pair: Pairs<typeof _coincheck>) => coincheck($http, pair),
  }
}

// const f = (callback: Factory) => {
//   const { $http } = useKy()

//   type aaa = typeof callback extends typeof coincheck ? 'coincheck' : 'zaif'

//   return {
//     get: (pair: Pairs<aaa>) => callback($http, pair),
//   }
// }

// export default f(coincheck).get('')
