import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    // component: () => import('@/views/login/index'),
    component: () => import('@/views/login/login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },

  {
    path: '/register',
    component: Layout,
    // component: () => import('@/views/register/register'),
    children: [
      {
        path: 'register',
        name: '注册',
        component: () => import('@/views/register/register'),
        meta: { title: '注册', icon: 'user' },
        hidden: true
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/search',
    children: [{
      path: 'search',
      name: '首页',
      component: () => import('@/views/search/search'),
      meta: { title: '文献检索系统', icon: '' },
      hidden: true
    }]
  },

  {
    path: '/search',
    component: Layout,
    children: [
      {
        path: 'search',
        name: '文献检索',
        component: () => import('@/views/search/search'),
        meta: { title: '文献检索', icon: 'search' }
      }
    ]
  },

  {
    path: '/upload',
    component: Layout,
    children: [
      {
        path: 'upload',
        name: '文献上传',
        component: () => import('@/views/upload/upload'),
        meta: { title: '文献上传', icon: 'upload' }
      },
      {
        path: 'form',
        name: '文献上传表单',
        component: () => import('@/views/upload/uploadform'),
        hidden: true
      }
    ]
  },

  {
    path: '/file',
    component: Layout,
    children: [
      {
        path: 'file',
        name: '归档',
        component: () => import('@/views/file/file'),
        meta: { title: '文献集', icon: 'file' , keepAlive:true}
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/order/order'),
        meta: { title: '订单', icon: 'file' , keepAlive:true},
        hidden: true
      }
    ]
  },
  {
    path: '/chart',
    component: Layout,
    children: [
      {
        path: 'chart',
        name: '分析',
        component: () => import('@/views/summary/sumfile'),
        meta: { title: '文献分析', icon: 'chart' }
      }
    ]
  },
  {
    path: '/photo',
    component: Layout,
    children: [
      {
        path: 'photo',
        name: '拍照上传',
        component: () => import('@/views/photo/takephoto'),
        meta: { title: '拍照上传', icon: 'search' },
        hidden: true
      }
    ]
  },
  {
    path: '/share',
    component: Layout,
    children: [
      {
        path: 'share',
        name: '文献共享',
        component: () => import('@/views/share/share'),
        meta: { title: '文献共享', icon: 'search' },
        hidden: true
      }
    ]
  },
  {
    path: '/details',
    component: Layout,
    children: [
      {
        path: 'details',
        name: 'searchDetail',
        component: () => import('@/views/details/details'),
        meta: { title: '文献详情', icon: 'file' },
        hidden: true
      }
    ]
  },
  {
    path: '/filedetail',
    component: Layout,
    children: [
      {
        path: 'filedetail',
        name: '文件夹详情',
        component: () => import('@/views/filedetail/filedetail'),
        meta: { title: '文件夹详情', icon: 'file', keepAlive: true },
        hidden: true
      }
    ]
  },
  {
    path: '/pdf',
    component: Layout,
    children: [
      {
        path: 'pdf',
        name: 'pdf',
        component: () => import('@/views/pdf/pdf'),
        meta: { title: '文献详情', icon: 'file' },
        hidden: true
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'user',
        name: '用户详情',
        component: () => import('@/views/user/user'),
        meta: { title: '个人中心', icon: 'user' },
        hidden: true
      }
    ]
  },
  {
    path: '/buy',
    component: Layout,
    children: [
      {
        path: 'buy',
        name: '积分购买',
        component: () => import('@/views/buy/buy'),
        meta: { title: '套餐购买', icon: 'user' },
        hidden: true
      }
    ]
  },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
