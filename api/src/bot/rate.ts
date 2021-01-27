import admin from 'firebase-admin'
import type { ServiceAccount } from 'firebase-admin/lib/credential'
import { NowRequest, NowResponse } from '@vercel/node'
import { factory } from '../rate'
const createApp = (
  cert: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n')
  }
): admin.app.App => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(cert)
    })
  }

  return admin.app()
}

const postRate = async ({ query }: NowRequest, res: NowResponse) => {
  const { pair, market, path } = query

  if (
    Array.isArray(pair) ||
    !pair ||
    Array.isArray(market) ||
    !market ||
    Array.isArray(path) ||
    !path
  ) {
    return res.status(400).send('Invalid Parameters')
  }

  const getRate = factory(market)
  const date = new Date()

  const result = await getRate(pair).catch(async () => {
    return await getRate(pair)
  })

  if (!result) {
    console.error('Error')
    return
  }
  const rate = mapper(market, result)
  if (!rate) return

  await saveRate({ date, pair, rate, market, collectionPath: path })

  return res.status(200).send('OK')
}

const mapper = <T extends 'coincheck' | 'zaif'>(
  market: T,
  data: T extends 'coincheck'
    ? { rate: number }
    : T extends 'zaif'
    ? { last_price: number }
    : never
): number => {
  switch (market) {
    case 'coincheck': {
      return data.rate
    }
    case 'zaif': {
      return data.last_price
    }
  }
}

export default postRate

const saveRate = ({
  rate,
  date,
  pair,
  market,
  collectionPath
}: {
  rate: number
  date: Date
  pair: string
  market: string
  collectionPath: string
}) => {
  return createApp()
    .firestore()
    .collection('markets')
    .doc(market)
    .collection('pairs')
    .doc(pair)
    .collection(collectionPath)
    .add({
      value: rate,
      date
    })
}
