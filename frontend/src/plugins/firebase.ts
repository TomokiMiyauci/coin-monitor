import { FirebaseOptions } from '@firebase/app-types'
import { getApp, getApps, initializeApp } from 'firebase/app'
import { initializeFirestore } from 'firebase/firestore/lite'
import { inject, InjectionKey, Plugin } from 'vue'

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
}

const plugin: Plugin = {
  install: ({ provide }) => {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

    const firestore = initializeFirestore(app, {})
    provide(key, firestore)
  },
}

const key: InjectionKey<ReturnType<typeof initializeFirestore>> = Symbol(
  '$firestore'
)

const useFirestore = () => {
  return { $firestore: inject(key)! }
}

export default plugin
export { useFirestore }
