import { useKy } from '/@/plugins/ky'
import { TICKER } from '/@/api/zaif/entrypoint'
import type { getTicker } from 'zaif-client'
type Pair = Parameters<typeof getTicker>[number]

export default () => {
  const { $http } = useKy()

  return {
    get: (pair: Pair) =>
      $http
        .get(TICKER, {
          searchParams: {
            pair,
          },
        })
        .json<ReturnType<typeof getTicker>>(),
  }
}
