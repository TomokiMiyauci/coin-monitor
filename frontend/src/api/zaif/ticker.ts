import { useKy } from '/@/plugins/ky'
import { TICKER } from '/@/api/zaif/entrypoint'
import type { getTicker } from 'zaif-client'

export default () => {
  const { $http } = useKy()

  return {
    get: () => $http.get(TICKER).json<ReturnType<typeof getTicker>>(),
  }
}
