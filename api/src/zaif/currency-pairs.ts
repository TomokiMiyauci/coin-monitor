import { NowRequest, NowResponse } from '@vercel/node'
import { allowCors } from '../utils/cors'
import { getCurrencyPairs } from 'zaif-client'

const fn = async (_: NowRequest, res: NowResponse) => {
  const result = await getCurrencyPairs('btc_jpy')
  res.status(200).json(result)
}

export default allowCors(fn)
