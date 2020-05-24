import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from 'views/Main.vue'

const Login = ()=>import('views/Login.vue')
const CategoryEdit = ()=>import('views/CategoryEdit.vue')
const CategoryList = ()=>import('views/CategoryList.vue')


const ItemEdit = ()=>import('views/ItemEdit.vue')
const ItemList = ()=>import('views/ItemList.vue')

const HeroEdit = ()=>import('views/HeroEdit.vue')
const HeroList = ()=>import('views/HeroList.vue')

const ArticleEdit = ()=>import('views/ArticleEdit.vue')
const ArticleList = ()=>import('views/ArticleList.vue')

const AdEdit = ()=>import('views/AdEdit.vue')
const AdList = ()=>import('views/AdList.vue')

const AdminUserEdit = ()=>import('views/AdminUserEdit.vue')
const AdminUserList = ()=>import('views/AdminUserList.vue')

const VideoList = ()=>import('views/VideoList.vue')
const VideoEdit = ()=>import('views/VideoEdit.vue')

const IntroList = ()=>import('views/IntroList.vue')
const IntroEdit = ()=>import('views/IntroEdit.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList },

      { path: '/items/create', component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/items/list', component: ItemList },

      { path: '/heroes/create', component: HeroEdit },
      { path: '/heroes/edit/:id', component: HeroEdit, props: true },
      { path: '/heroes/list', component: HeroList },

      { path: '/articles/create', component: ArticleEdit },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },
      { path: '/articles/list', component: ArticleList },
      
      { path: '/ads/create', component: AdEdit },
      { path: '/ads/edit/:id', component: AdEdit, props: true },
      { path: '/ads/list', component: AdList },

      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
      { path: '/admin_users/list', component: AdminUserList },

      { path: '/videos/create', component: VideoEdit },
      { path: '/videos/edit/:id', component: VideoEdit, props: true },
      { path: '/videos/list', component: VideoList },

      { path: '/intros/create', component: IntroEdit },
      { path: '/intros/edit/:id', component: IntroEdit, props: true },
      { path: '/intros/list', component: IntroList },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic && !localStorage.token) {
    return next({name: 'Login'})
  }
  console.log(to.path)
  next()
})



export default router
