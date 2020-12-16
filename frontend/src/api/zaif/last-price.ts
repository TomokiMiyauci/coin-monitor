import { useKy } from '/@/plugins/ky'
import { LAST_PRICE } from '/@/api/zaif/entrypoint'
import type { getLastPrice } from 'zaif-client'

export default () => {
  const { $http } = useKy()

  return {
    get: () => $http.get(LAST_PRICE).json<ReturnType<typeof getLastPrice>>(),
  }
}
