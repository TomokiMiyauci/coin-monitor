import ky from 'ky'
import { Plugin, inject, InjectionKey } from 'vue'

const plugin: Plugin = {
  install: (app) => {
    app.provide(key, ky)
  },
}

const key: InjectionKey<typeof ky> = Symbol('$http')
const useKy = (): { $http: typeof ky } => {
  return { $http: inject(key) }
}

export default plugin

export { useKy }
