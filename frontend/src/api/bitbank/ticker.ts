import { useKy } from '/@/plugins/ky'
import { TICKER } from '/@/api/bitbank/entrypoint'
import type { getTicker, Pairs } from 'bitbank-client'

export default () => {
  const { $http } = useKy()

  return {
    get: (pair: Pairs) =>
      $http
        .get(TICKER, {
          searchParams: {
            pair,
          },
        })
        .json() as ReturnType<typeof getTicker>,
  }
}
