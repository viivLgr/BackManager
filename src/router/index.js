import Vue from 'vue'
import Router from 'vue-router'

import Home from 'components/Home'

import Login from 'pages/Login'
import Dashboard from 'pages/Dashboard'
import FeaturesList from 'pages/rights/FeaturesList'
import UserRights from 'pages/rights/UserRights'
import UserList from 'pages/rights/UserList'
import RoleList from 'pages/rights/RoleList'
import CodeManage from 'pages/code/CodeManage'
import ErrorCodeManage from 'pages/code/ErrorCodeManage'
import TradeList from 'pages/trade/TradeList'
import TradeSuspicious from 'pages/trade/TradeSuspicious'
import Reconciliation from 'pages/trade/Reconciliation'
import ErrorHandling from 'pages/trade/ErrorHandling'
import Reports from 'pages/trade/Reports'
import MerchantList from 'pages/merchant/MerchantList'
import ProductList from 'pages/merchant/ProductList'
import AppList from 'pages/app/AppList'
import OpenPlatList from 'pages/app/OpenPlatList'
import InterfaceList from 'pages/app/InterfaceList'
import ChannelManage from 'pages/router/ChannelManage'
import ChannelSupportBank from 'pages/router/ChannelSupportBank'
import MerchantChannelList from 'pages/router/MerchantChannelList'
import CardBin from 'pages/router/CardBin'
import BankList from 'pages/router/BankList'
import ScheduledTask from 'pages/task/ScheduledTask'
import HistoryTaskList from 'pages/task/HistoryTaskList'
import NotFound from 'pages/NotFound'

Vue.use(Router)

const routes = [
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
        component: Dashboard
      },
      {
        path: '/dashboard',
        component: Dashboard,
        meta: {
          title: '首页',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path: '/features_list',
        meta: {
          title: '功能列表',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: FeaturesList
      },
      {
        path: '/user_rights',
        meta: {
          title: '用户权限',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: UserRights
      },
      {
        path: '/user_list',
        meta: {
          title: '用户列表',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: UserList
      },
      {
        path: '/role_list',
        meta: {
          title: '角色列表',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: RoleList
      },
      {
        path: '/code_manage',
        meta: {
          title: '码值管理',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: CodeManage
      },
      {
        path: '/error_code_manage',
        component: ErrorCodeManage
      },
      {
        path: '/trade_list',
        component: TradeList
      },
      {
        path: '/trade_suspicious',
        component: TradeSuspicious
      },
      {
        path: '/reconciliation',
        component: Reconciliation
      },
      {
        path: '/error_handling',
        component: ErrorHandling
      },
      {
        path: '/reports',
        component: Reports
      },
      {
        path: '/merchant_list',
        meta: {
          title: '商户列表',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: MerchantList
      },
      {
        path: '/product_list',
        meta: {
          title: '产品列表',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: ProductList
      },
      {
        path: '/app_list',
        meta: {
          title: '应用列表',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: AppList
      },
      {
        path: '/interface_list',
        meta: {
          title: '接口列表',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: InterfaceList
      },
      {
        path: '/open_app_list',
        meta: {
          title: '开放平台接口列表',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: OpenPlatList
      },
      {
        path: '/channel_manage',
        component: ChannelManage,
        meta: {
          title: '渠道列表',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path: '/channel_support_bank',
        component: ChannelSupportBank,
        meta: {
          title: '渠道支持银行列表',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path: '/Merchant_channel_list',
        component: MerchantChannelList,
        meta: {
          title: '商户渠道列表',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path: '/card_bin_list',
        component: CardBin,
        meta: {
          title: '卡bin管理',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path: '/bank_list',
        component: BankList,
        meta: {
          title: '银行列表',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path: '/scheduled-task',
        component: ScheduledTask,
        meta: {
          title: '定时任务管理',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path: '/history_task_list',
        component: HistoryTaskList,
        meta: {
          title: '运行历史任务',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path: '/404',
        component: NotFound
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export default new Router({
  base: "/",
  routes
})
