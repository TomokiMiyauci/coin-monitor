import { NowRequest, NowResponse } from '@vercel/node'
import { allowCors } from '../../../packages/share/utils/cors'
import { getTrades } from 'zaif-client'
type Pair = Parameters<typeof getTrades>[number]

const fn = async ({ query }: NowRequest, res: NowResponse) => {
  const { pair } = query
  const result = await getTrades(pair as Pair)
  res.status(200).json(result)
}

export default allowCors(fn)
