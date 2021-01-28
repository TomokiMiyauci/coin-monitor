import { getRate } from 'coincheck-client'

import { RATE } from '/@/api/coincheck/constant'
import { useKy } from '/@/plugins/ky'

export type Pair = Parameters<typeof getRate>[0]

export default () => {
  const { $http } = useKy()

  return {
    get: (pair: Pair): Promise<{ rate: number }> =>
      $http
        .get(RATE, {
          searchParams: {
            pair,
          },
        })
        .json(),
  }
}
