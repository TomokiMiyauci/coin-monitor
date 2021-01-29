import { Plugin } from 'vue'

import { directive } from '/@/directives'

const plugin: Plugin = {
  install: (app) => {
    app.directive('flash', directive)
  },
}

export default plugin
