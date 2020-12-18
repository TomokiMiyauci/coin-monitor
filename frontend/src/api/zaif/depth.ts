import { useKy } from '/@/plugins/ky'
import { DEPTH } from '/@/api/zaif/entrypoint'
import type { getDepth } from 'zaif-client'

export default () => {
  const { $http } = useKy()

  return { get: () => $http.get(DEPTH).json<ReturnType<typeof getDepth>>() }
}
