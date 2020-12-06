import { useKy } from '/@/plugins/ky'
import { RATE } from '/@/api/coincheck/constant'
import { getRate } from 'coincheck-client'

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
