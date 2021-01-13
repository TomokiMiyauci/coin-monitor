import { NowRequest, NowResponse } from '@vercel/node'
import { allowCors } from '../../../packages/share/utils/cors'
import { getCurrencies } from 'zaif-client'

const fn = async (_: NowRequest, res: NowResponse) => {
  const result = await getCurrencies('btc')
  res.status(200).json(result)
}

export default allowCors(fn)
