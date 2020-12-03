import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: '首页',
    component: (resolve) => require(['@/components/index'], resolve)
  },
  {
    path: '/register',
    name: '登记',
    component: (resolve) => require(['@/components/register/Register'], resolve)
  },
  {
    path: '/record',
    name: '登记记录',
    component: (resolve) => require(['@/components/register/Record'], resolve)
  },
  {
    path: '/manage',
    name: '资产管理',
    component: (resolve) => require(['@/components/Manage'], resolve)
  }
]
const router = new Router({
  routes
})

export default router
