import { useKy } from '/@/plugins/ky'
import { DEPTH } from '/@/api/zaif/entrypoint'
import type { getDepth } from 'zaif-client'

type Pair = Parameters<typeof getDepth>[number]

export default () => {
  const { $http } = useKy()

  return {
    get: (pair: Pair) =>
      $http
        .get(DEPTH, {
          searchParams: {
            pair,
          },
        })
        .json<ReturnType<typeof getDepth>>(),
  }
}
