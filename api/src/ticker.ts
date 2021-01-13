import { NowRequest, NowResponse } from '@vercel/node'
import { allowCors } from '../../packages/share/utils/cors'
import { getAPITicker } from 'coincheck-client'
import { getTicker } from 'zaif-client'
import { getTicker as bitbankGetTicker } from 'bitbank-client'
const fn = async ({ query }: NowRequest, res: NowResponse) => {
  const { market, pair } = query
  if (typeof market === 'object') return
  const tickerApi = factory(market)
  const result = await tickerApi(pair)
  res.status(200).json(result)
}

const factory = (market: string): any => {
  switch (market) {
    case 'coincheck':
    default: {
      return getAPITicker
    }
    case 'zaif': {
      return getTicker
    }

    case 'bitbank': {
      return bitbankGetTicker
    }
  }
}

export default allowCors(fn)
