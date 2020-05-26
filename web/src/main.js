import Vue from 'vue'
import App from './App.vue'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

import 'assets/iconfont/iconfont.css'
import 'assets/scss/style.scss'
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyLoad)

import DefaultCard from 'components/DefaultCard'
import ListCard from 'components/ListCard'
import LoadMore from 'components/LoadMore'

Vue.component('d-card', DefaultCard)
Vue.component('l-card', ListCard)
Vue.component('load-more', LoadMore)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
  // baseURL: 'http://localhost:3000/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
