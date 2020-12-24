import { NowApiHandler, NowRequest, NowResponse } from '@vercel/node'

export const allowCors = (fn: NowApiHandler) => async (
  req: NowRequest,
  res: NowResponse
): Promise<void> => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}
