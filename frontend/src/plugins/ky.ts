import ky from 'ky-universal'
import { Plugin, inject, InjectionKey } from 'vue'
const instance = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
})

const plugin: Plugin = {
  install: (app) => {
    app.provide(key, instance)
  },
}

const key: InjectionKey<typeof ky> = Symbol('$http')
const useKy = (): { $http: typeof ky } => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return { $http: inject(key)! }
}

export default plugin

export { useKy }
