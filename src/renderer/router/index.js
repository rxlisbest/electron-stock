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
      path: '*',
      redirect: '/'
    }
  ]
})
