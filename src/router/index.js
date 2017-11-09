import Vue from 'vue'
import Router from 'vue-router'
import fp from '@/components/fp'
import sp from '@/components/sp'
import tp from '@/components/tp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'fp',
      component: fp
    },
    {
      path: '/sp',
      name: 'sp',
      component: sp
    },
    {
      path: '/tp',
      name: 'tp',
      component: tp
    }
  ]
})
