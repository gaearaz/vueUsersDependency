import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from '@/App.vue'
import { router } from '../src/router/index'
import store from '@/store'
import * as firebase from 'firebase'

Vue.config.productionTip = false

var config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
}


firebase.initializeApp(config)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

