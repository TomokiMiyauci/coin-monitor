import { NowRequest, NowResponse } from '@vercel/node'
import { allowCors } from '../../../packages/share/utils/cors'
import { getOderBooks } from 'coincheck-client'

const fn = async (_: NowRequest, res: NowResponse) => {
  const result = await getOderBooks()
  res.status(200).json(result)
}

export default allowCors(fn)
