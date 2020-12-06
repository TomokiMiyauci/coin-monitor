import ky from 'ky'
import { Plugin, inject, InjectionKey } from 'vue'

const instance = ky.create({
  prefixUrl: 'https://coin-monitor-api.tomoki-miyauci.vercel.app',
})

const plugin: Plugin = {
  install: (app) => {
    app.provide(key, instance)
  },
}

const key: InjectionKey<typeof ky> = Symbol('$http')
const useKy = (): { $http: typeof ky } => {
  return { $http: inject(key) }
}

export default plugin

export { useKy }
