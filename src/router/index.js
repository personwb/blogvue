import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/login'
import Home from '@/page/home/home'
import Detail from '@/page/home/detail'
import { routes as ManagerRoutes } from "../page/manager";
import VueWechatTitle from 'vue-wechat-title'

Vue.use(VueWechatTitle)
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
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
    ManagerRoutes,
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
      path: '/home/artical/detail/:articalId',
      component: Detail,
    },

  ]
})

/*获取文章详情路由路径*/
export function articalDetalRouteByArtical(artical) {
  return artical.contentType === 'route_path' ? artical.routePath : ('/home/artical/detail/' + artical.id)
}

/*获取文章详情路由路径*/
export function levelTwoRouteById(id) {
  return '/home/lt/' + id
}
