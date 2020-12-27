import admin from 'firebase-admin'
import type { ServiceAccount } from 'firebase-admin/lib/credential'

const createApp = (
  cert: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n')
  }
): admin.app.App =>
  admin.initializeApp({
    credential: admin.credential.cert(cert)
  })

export const postRate = () =>
  createApp()
    .firestore()
    .collection('markets')
    .doc('coincheck')
    .collection('pairs')
    .doc('btc_jpy')
    .collection('rates')
    .add({
      rate: 10
    })
