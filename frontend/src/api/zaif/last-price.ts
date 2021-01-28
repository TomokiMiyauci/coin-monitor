import ky from 'ky-universal'
import type { getLastPrice } from 'zaif-client'

import { LAST_PRICE } from '/@/api/zaif/entrypoint'
import { useKy } from '/@/plugins/ky'

const k = ky.create({
  prefixUrl: 'https://coin-monitor-api.tomoki-miyauci.vercel.app',
})
type Pair = Parameters<typeof getLastPrice>[number]

export default () => {
  return {
    get: (pair: Pair) =>
      k
        .get(LAST_PRICE, {
          searchParams: {
            pair,
          },
        })
        .json<ReturnType<typeof getLastPrice>>(),
  }
}
