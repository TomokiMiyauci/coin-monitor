import { NowRequest, NowResponse } from '@vercel/node'
import { allowCors } from '../utils/cors'
import { getRate } from 'coincheck-client'

const fn = async (req: NowRequest, res: NowResponse) => {
  console.log(req.query)
  const pair = req.query.pair

  if (!pair || Array.isArray(pair)) {
    res.status(404).send(Error('hoge'))
    return
  }

  const result = await getRate(pair)
  res.status(200).json(result)
}

export default allowCors(fn)
