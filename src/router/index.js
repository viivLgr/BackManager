import Vue from 'vue'
import Router from 'vue-router'
import Login from 'container/Login'
import Home from 'components/Home'
import Index from 'container/Index'
import Dashboard from 'container/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      component: Home,
      children: [
        {
          path: '/',
          component: Index
        },
        {
          path: '/dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
