
import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../components/main'
import NotFound from '../components/notfound'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/demo/vue/',
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/article/:id/',
      component: ensure => require(['../components/article'], ensure)
    },
    {
      path: '/user',
      component: ensure => require(['../components/user'], ensure)
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

export default router
