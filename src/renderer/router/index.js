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
      path: '/goods',
      name: 'goods-index',
      component: require('@/pages/goods/index').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
