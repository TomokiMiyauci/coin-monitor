import { NowRequest, NowResponse } from '@vercel/node'
import { allowCors } from '../../../packages/share/utils/cors'
import { getAPITrades } from 'coincheck-client'

const fn = async (_: NowRequest, res: NowResponse) => {
  const result = await getAPITrades('btc_jpy')
  res.status(200).json(result)
}

export default allowCors(fn)
