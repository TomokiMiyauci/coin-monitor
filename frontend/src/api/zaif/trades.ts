import { useKy } from '/@/plugins/ky'
import { TRADE } from '/@/api/zaif/entrypoint'
import type { getTrades } from 'zaif-client'

export default () => {
  const { $http } = useKy()

  return { get: () => $http.get(TRADE).json<ReturnType<typeof getTrades>>() }
}
