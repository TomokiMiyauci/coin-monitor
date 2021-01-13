import { NowRequest, NowResponse } from '@vercel/node'
import { allowCors } from '../../packages/share/utils/cors'
import { getRate } from 'coincheck-client'
import { getLastPrice } from 'zaif-client'
import { getTicker as bitbankGetTicker } from 'bitbank-client'
const fn = async ({ query }: NowRequest, res: NowResponse) => {
  const { market, pair } = query
  if (typeof market === 'object') return
  const rateApi = factory(market)
  const result = await rateApi(pair)
  res.status(200).json(result)
}

export const factory = (market: string): any => {
  switch (market) {
    case 'coincheck': {
      return getRate
    }
    case 'zaif': {
      return getLastPrice
    }

    case 'bitbank': {
      return bitbankGetTicker
    }
  }
}

export default allowCors(fn)
