import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import 'assets/iconfont/iconfont.css'
import 'assets/scss/style.scss'
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper)

import DefaultCard from 'components/DefaultCard'
import ListCard from 'components/ListCard'

Vue.component('d-card', DefaultCard)
Vue.component('l-card', ListCard)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
