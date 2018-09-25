import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import {
  store
} from './store'
import 'vuetify/dist/vuetify.min.css'
import Alert from './components/Shared/Alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.component('alert', Alert)

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyC9O5LEgp3KkUJnu8QG2JOIY5Pvok9ex5w",
      authDomain: "ubiqum-cohorts.firebaseapp.com",
      databaseURL: "https://ubiqum-cohorts.firebaseio.com",
      projectId: "ubiqum-cohorts",
      storageBucket: "ubiqum-cohorts.appspot.com"
    })

    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.$store.dispatch('autoLogin', user)
      }
    })

    this.$store.dispatch("loadCohorts")
  }
})
