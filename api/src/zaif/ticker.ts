import { NowRequest, NowResponse } from '@vercel/node'
import { allowCors } from '../utils/cors'
import { getTicker } from 'zaif-client'
type Pair = Parameters<typeof getTicker>[number]

const fn = async ({ query }: NowRequest, res: NowResponse) => {
  const { pair } = query
  const result = await getTicker(pair as Pair)
  res.status(200).json(result)
}

export default allowCors(fn)
