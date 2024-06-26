import Vue from 'vue'
import App from './App'
import api from './api'
import store from './store/store'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$api = api
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
