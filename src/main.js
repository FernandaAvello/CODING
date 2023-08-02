import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from './plugins/axios'
import toastification from './plugins/toastification'

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  vuetify,
  axios,
  toastification,
  render: h => h(App)
}).$mount('#app')
