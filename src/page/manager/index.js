/**
 * Created on 10:22 2018/11/15.
 * file name index
 * by wangtieshan
 */

import Manager from './manager'
import LevelOne from './levelone'
import LevelTwo from './leveltwo'
import LevelOneDetail from './levelonedetail'
import LevelTwoDetail from './leveltwodetail'
import ArticalAdd from './articaladd'
import ArticalList from './articallist'

export const routes = {
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
};
