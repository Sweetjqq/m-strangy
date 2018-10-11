import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/sharepage',
      name: 'sharepage',
      component: resolve => require(['@/components/sharepage/sharepage'], resolve),
      meta: {
        requiresAuth: false
      }
    }, {
      path: '/sharepageto',
      name: 'sharepageto',
      component: resolve => require(['@/components/sharepage/sharepageto'], resolve),
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/shareview',
      name: 'shareview',
      component: resolve => require(['@/components/shareview/sharelist'], resolve),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/productList',
      name: 'productList',
      component: resolve => require(['@/components/product/productList'], resolve),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/HistoryValue',
      name: 'HistoryValue',
      component: resolve => require(['@/components/historyValue'], resolve),
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/sign',
      name: 'sign',
      component: resolve => require(['@/components/sign'], resolve),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/agree',
      name: 'agree',
      component: resolve => require(['@/components/argee'], resolve),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/detailmsg',
      name: 'detailmsg',
      component: resolve => require(['@/components/details/detailmsg'], resolve),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['@/components/Login'], resolve),
    },
    {
      path: '/Success',
      name: 'Success',
      component: resolve => require(['@/components/common/success'], resolve),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/Fail',
      name: 'Fail',
      component: resolve => require(['@/components/common/fail'], resolve),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: resolve => require(['@/components/HomePage'], resolve),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/strategyList',
      name: 'strategyList',
      component: resolve => require(['@/components/strategyList'], resolve),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/SearchPage',
      name: 'SearchPage',
      component: resolve => require(['@/components/SearchPage'], resolve),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: resolve => require(['@/components/Register'], resolve),
      meta: {
        requiresAuth: false
      }
    }, {
      path: '/Mine',
      name: 'Mine',
      component: resolve => require(['@/components/Personal/mine'], resolve),
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/myMsg',
      name: 'myMsg',
      component: resolve => require(['@/components/Personal/myMsg'], resolve),
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/EditPsd', // 
      name: 'EditPsd',
      component: resolve => require(['@/components/Personal/EditPsd'], resolve),
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/IssuerDetail',
      name: 'IssuerDetail',
      component: resolve => require(['@/components/details/IssuerDetail'], resolve),
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/BondDetail',
      name: 'BondDetail',
      component: resolve => require(['@/components/details/BondDetail'], resolve),
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/StrategyDetail',
      name: 'StrategyDetail',
      component: resolve => require(['@/components/details/StrategyDetail'], resolve),
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/HoldingAnalysis',
      name: 'HoldingAnalysis',
      component: resolve => require(['@/components/SaleProduct/HoldingAnalysis'], resolve),
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/ProductDetail', 
      name: 'ProductDetail',
      component: resolve => require(['@/components/SaleProduct/ProductDetail'], resolve),
      meta: {
        requiresAuth: true
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
