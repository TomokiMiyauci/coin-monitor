import { useKy } from '/@/plugins/ky'

export default () => {
  const { $http } = useKy()

  return { get: () => $http.get('api/src/coincheck/trades').json() }
}
