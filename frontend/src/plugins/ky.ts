import ky from 'ky'
import { Plugin } from 'vue'

const plugin: Plugin = {
  install: (app) => {
    app.provide('$http', ky)
  },
}

export default plugin
