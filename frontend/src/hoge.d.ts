import Vue from 'vue'
import firebase from 'firebase/app'

declare module 'vue/types/vue' {
  interface Vue {
    $auth: firebase.auth.Auth
    $firestore: firebase.firestore.Firestore
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $http: AxiosStatic
    axios: AxiosStatic
  }

  interface SetupContext {
    hoge: string
  }

  export interface App {
    axios: AxiosStatic
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $http: AxiosStatic
    axios: AxiosStatic
  }

  interface VueConstructor {
    axios: AxiosStatic
  }
}
