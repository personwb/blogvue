import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login'
import Home from '@/page/home'
import Detail from '@/page/detail'
import Manager from '@/page/manager'
import LevelOne from '@/page/levelone'
import LevelTwo from '@/page/leveltwo'
import LevelOneDetail from '@/page/levelonedetail'
import LevelTwoDetail from '@/page/leveltwodetail'
import ArticalAdd from '@/page/articaladd'
import ArticalList from '@/page/articallist'//设置title
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

import IOSIOS from '../blog/IOS/iOS'

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
    {
      path: '/manager',
      name: 'Manager',
      component: Manager,
      children: [
        {
          path: '/manager/levelone',
          component: LevelOne,
          name: 'LevelOne',
          meta: {
            title: '一级列表'
          }
        },{
          path: '/manager/levelone/detail',
          name: 'LevelOneDetail',
          component: LevelOneDetail,
        },{
          path: '/manager/leveltwo',
          component: LevelTwo,
          meta: {
            title: '二级列表'
          }
        },{
          path: '/manager/leveltwo/detail',
          name: 'LevelTwoDetail',
          component: LevelTwoDetail
        },{
          path: '/manager/artical/add',
          name: 'ArticalAdd',
          component: ArticalAdd,
          meta: {
            title: '文章编辑'
          }
        },{
          path: '/manager/artical/list',
          name: 'ArticalList',
          component: ArticalList,
          meta: {
            title: '文章列表'
          }
        },
      ]
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [{
        path: '/home/artical/detail/:articalId',
        component: Detail,
      },{
        path: '/home/artical/ios/ios',
        component: IOSIOS,
      }]
    },

  ]
})
