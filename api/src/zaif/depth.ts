import { NowRequest, NowResponse } from '@vercel/node'
import { allowCors } from '../utils/cors'
import { getDepth } from 'zaif-client'

type Pair = Parameters<typeof getDepth>[number]

const fn = async ({ query }: NowRequest, res: NowResponse) => {
  const { pair } = query
  const result = await getDepth(pair as Pair)
  res.status(200).json(result)
}

export default allowCors(fn)
