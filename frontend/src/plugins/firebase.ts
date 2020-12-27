import { initializeApp } from 'firebase/app'
import { initializeFirestore } from 'firebase/firestore/lite'
import { Plugin, inject, InjectionKey } from 'vue'
import { FirebaseOptions } from '@firebase/app-types'

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const firestore = initializeFirestore(app, {})

const plugin: Plugin = {
  install: ({ provide }) => {
    provide(key, firestore)
  },
}

const key: InjectionKey<typeof firestore> = Symbol('$firestore')

const useFirestore = () => {
  return { $firestore: inject(key)! }
}

export default plugin
export { useFirestore }
