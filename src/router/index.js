import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/login'
import Home from '@/page/home/home/home'
import Detail from '@/page/artical/detail'
import About from '@/page/About/about'
import { routes as ManagerRoutes } from "../page/manager";
import MobileHome from '../page/home/mobilehome/MobileHome';
import VueWechatTitle from 'vue-wechat-title'
import Device from 'current-device'

Vue.use(VueWechatTitle)
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/about',
      name: 'About',
      component: ()=>import('@/page/About/about'),
      meta: {
        title: '关于我'
      }
    },
    {
      path: '/',
      redirect: {
        path: '/home'
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/home/lt/:levelTwoId',
          component: Home,
        }]
    },
    {
      path: '/mb/home',
      name: 'MobileHome',
      component: MobileHome,
      children: [
        {
          path: '/mb/home/lt/:levelTwoId',
          component: MobileHome,
          name: 'MobileHomeLevelTwo'
        }]
    },
    {
      path: '/artical/detail/:articalId',
      component: Detail,
    },
  ].concat(ManagerRoutes)
})

/**
 * 判断是否是手机端首页路由
 * @returns {string}
 */
export function isMobileRoute(path) {
  return path.indexOf('/mb/') !== -1
}

/**
 * 获取手机端首页路由
 * @returns {string}
 */
export function mobileHomeRoute() {
  return '/mb/home'
}

/*获取文章详情路由路径*/
export function articalDetalRouteByArtical(artical) {
  return artical.contentType === 'route_path' ? artical.routePath : ('/artical/detail/' + artical.id)
}

/*获取文章详情路由路径*/
export function levelTwoRouteById(id) {
  if (Device.mobile()) {
    return '/mb/home/lt/' + id
  }
  return '/home/lt/' + id
}
