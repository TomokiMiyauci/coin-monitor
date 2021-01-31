import ky from 'ky-universal'
import { inject, InjectionKey, Plugin } from 'vue'
const kyInstance = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL as string,
})

const plugin: Plugin = {
  install: (app) => {
    app.provide(key, kyInstance)
  },
}

const key: InjectionKey<typeof ky> = Symbol('$http')
const useKy = (): { $http: typeof ky } => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return { $http: inject(key)! }
}

export default plugin

export { kyInstance, useKy }
