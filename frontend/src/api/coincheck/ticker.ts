import { useKy } from '/@/plugins/ky'
import type { getAPITicker } from 'coincheck-client'
type Data = ReturnType<typeof getAPITicker> extends Promise<infer data>
  ? data
  : never

export default () => {
  const { $http } = useKy()

  return {
    get: () => $http.get('api/src/coincheck/ticker').json<Data>(),
  }
}
