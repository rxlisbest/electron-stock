import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index-index',
      component: require('@/pages/index/index').default
    },
    {
      path: '/categories',
      name: 'categories-index',
      component: require('@/pages/category/index').default
    },
    {
      path: '/categories/add',
      name: 'categories-add',
      component: require('@/pages/category/add').default
    },
    {
      path: '/categories/edit',
      name: 'categories-edit',
      component: require('@/pages/category/edit').default
    },
    {
      path: '/goods',
      name: 'goods-index',
      component: require('@/pages/goods/index').default
    },
    {
      path: '/goods/add',
      name: 'goods-add',
      component: require('@/pages/goods/add').default
    },
    {
      path: '/goods/edit',
      name: 'goods-edit',
      component: require('@/pages/goods/edit').default
    },
    {
      path: '/cart',
      name: 'cart-index',
      component: require('@/pages/cart/index').default
    },
    {
      path: '/order',
      name: 'order-index',
      component: require('@/pages/order/index').default
    },
    {
      path: '/order/detail',
      name: 'order-detail',
      component: require('@/pages/order/detail').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
