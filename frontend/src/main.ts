import App from '/@/App.vue'
import { ViteSSG } from 'vite-ssg'
// import StoryBookApp from '../stories/StorybookApp.vue'
import '/@/assets/styles/main.scss'
import '/@/assets/styles/tailwind.scss'
import ky from '/@/plugins/ky'
import { routes } from '/@/router'
// import { router as storybookRouter } from '../stories/router'
// import firestore from '/@/plugins/firebase'

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes },
  // function to have custom setups
  ({ app }) => {
    app.use(ky)
    // install plugins etc.
  }
)
