import { useKy } from '/@/plugins/ky'

export default () => {
  const { $http } = useKy()

  const get = () => $http.get('api/src/coincheck/order-books').json()

  return { get }
}
