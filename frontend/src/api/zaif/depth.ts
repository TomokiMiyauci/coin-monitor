import type { getDepth } from 'zaif-client'

import { DEPTH } from '/@/api/zaif/entrypoint'
import { useKy } from '/@/plugins/ky'

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
