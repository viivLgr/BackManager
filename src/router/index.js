import Vue from 'vue'
import Router from 'vue-router'
import Login from 'container/Login'
import Home from 'components/Home'
import Index from 'container/Index'
import Dashboard from 'container/Dashboard'
import SubInfo from 'container/SubInfo'
import SubOpen from 'container/SubOpen'
import StoreInfo from 'container/StoreInfo'
import StoreOpen from 'container/StoreOpen'
import StoreCheck from 'container/StoreCheck'
import WechatInfo from 'container/WechatInfo'
import Paytrade from 'container/Paytrade'
import Settletrade from 'container/Settletrade'
import AnnouncementList from 'container/AnnouncementList'
import Announcement from 'container/Announcement'

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
        },
        {
          path: '/subinfo',
          component: SubInfo
        },
        {
          path: '/subopen',
          component: SubOpen
        },
        {
          path: '/storeinfo',
          component: StoreInfo
        },
        {
          path: '/storeopen',
          component: StoreOpen
        },
        {
          path: '/wechatinfo',
          component: WechatInfo
        },
        {
          path: '/storecheck',
          component: StoreCheck
        },
        {
          path: '/paytrade',
          component: Paytrade
        },
        {
          path: '/settletrade',
          component: Settletrade
        },
        {
          path: '/announcementlist',
          component: AnnouncementList
        },
        {
          path: '/announcement',
          component: Announcement
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
