// 导入组件
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Home from '@/pages/Home'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'

// 二级路由
// import MyOrder from '@/pages/Center/myOrder'
// import GroupOrder from '@/pages/Center/groupOrder'

// 路由懒加载
export default [
  // 个人中心
  {
    path: '/center',
    component: () => import('@/pages/Center'),
    meta: {
      isShow: true
    },
    children: [
      {
        path: '/',
        redirect: 'myorder'
      },
      {
        path: 'myorder',
        component: () => import('@/pages/Center/myOrder')
      },
      {
        path: 'grouporder',
        component: () => import('@/pages/Center/groupOrder')
      }
    ]
  },
  // 支付成功页面
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: {
      isShow: true
    }
  },
  // 支付页面
  {
    path: '/pay',
    component: Pay,
    meta: {
      isShow: true
    },
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  // 订单交易页面
  {
    path: '/trade',
    component: Trade,
    meta: {
      isShow: true
    },
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/shopcart',
    component: ShopCart,
    meta: {
      isShow: true
    }
  },
  // 成功加入购物车路由
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta: {
      isShow: true
    }
  },
  // 详情路由
  {
    path: '/detail/:id?',
    component: Detail,
    meta: {
      isShow: true
    }
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      isShow: true
    }
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    meta: {
      isShow: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }
]
