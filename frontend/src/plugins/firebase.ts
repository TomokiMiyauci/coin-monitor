import { FirebaseOptions } from '@firebase/app-types'
import { getApp, getApps, initializeApp } from 'firebase/app'
import { FirebaseFirestore, initializeFirestore } from 'firebase/firestore/lite'
import { inject, InjectionKey, Plugin } from 'vue'

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_API_KEY as string,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_APP_ID as string,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID as string,
}

const plugin: Plugin = {
  install: ({ provide }) => {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

    const firestore = initializeFirestore(app, {})
    provide(key, firestore)
  },
}

const key: InjectionKey<ReturnType<typeof initializeFirestore>> = Symbol(
  'firestore'
)

const useFirestore = (): {
  firestore: FirebaseFirestore
} => {
  return { firestore: inject(key) as FirebaseFirestore }
}

export default plugin
export { useFirestore }
