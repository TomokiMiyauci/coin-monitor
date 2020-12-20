import { useKy } from '/@/plugins/ky'
import { TRADE } from '/@/api/zaif/entrypoint'
import type { getTrades } from 'zaif-client'

export default () => {
  const { $http } = useKy()

  return {
    get: () =>
      $http
        .get(TRADE, {
          parseJson: (text) => {
            return JSON.parse(text, (key, value) => {
              if (key === 'date') {
                return new Date(value)
              }
              return value
            })
          },
        })
        .json<ReturnType<typeof getTrades>>(),
  }
}
