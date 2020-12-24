import { NowRequest, NowResponse } from '@vercel/node'
import { allowCors } from '../utils/cors'
import { getAPITicker } from 'coincheck-client'

const fn = async (_: NowRequest, res: NowResponse) => {
  const result = await getAPITicker()
  res.status(200).json(result)
}

export default allowCors(fn)
