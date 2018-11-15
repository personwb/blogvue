<template>

    <div style="width: 100%;height: 100%;">

      <el-row :span="2" type="flex" align="middle" >
        <img style="width: 200px;height: 130px;margin: 20px 20px 0 20px;" src="../assets/Onety.png"/>
        <div style="display: inline-block; margin-left: 30px;margin-bottom: 10px;flex-wrap: wrap">
          <span v-for="item in allOne"
                onselectstart="return false"
                v-bind:key="item.id"
                v-bind:class="levelOne.id === item.id ? 'funcBtnHover' : 'funcBtn'"
                v-on:click="onClickLevelOne(item)">{{item.title}}</span>
        </div>
      </el-row>

      <el-row style="height: calc(100% - 200px);">
        <el-col :span="4" style='width: 180px;min-height: 100%;'>
          <el-menu
            v-on:select="onSelectItem"
            style="overflow: hidden"
            v-bind:default-openeds="defaultOpens"
            :default-active="defaultActive"
            class="el-menu-vertical-demo">
            <el-submenu v-for="submenu in menuList" v-bind:key="submenu.index" v-bind:index="submenu.index">
              <template slot="title">
                <span>{{submenu.title}}</span>
              </template>
              <el-menu-item v-for="artical in submenu.items"
                            v-bind:key="artical.index"
                            v-bind:index="artical.index">{{artical.title}}</el-menu-item>
            </el-submenu>
          </el-menu>

        </el-col>
        <!--<el-col>-->
          <router-view v-wechat-title="$route.meta.title"></router-view>
        <!--</el-col>-->
      </el-row>
    </div>
</template>

<script>
  import {URLDefines, request} from '../api/api'
    export default {
      name: "home",
      data: function () {
        return {
          defaultOpens: [],
          defaultActive: null,
          allOne: [],
          levelOne: {},
          levelTwo: {},
          artical: {},
          menuList: [],
          data: [],
        }
      },
      watch: {
        '$route'(to, from) {
          this.updateDataByRoute()
        },
      },
      methods: {
        onSelectItem (index) {
          for (let menu of this.menuList) {
            for (let item of menu.items) {
              if (item.index == index) {
                this.$route.meta.title = 'Onety的博客-' + item.title
                this.$router.push(index)
              }
            }
          }
        },
        // 点击一级目录
        onClickLevelOne (levelOne) {
          // 更新一级
          this.levelOne = levelOne
          for (let levelOne of this.data) {
            if (levelOne.id == this.levelOne.id) {
              this.$route.meta.title = 'Onety的博客-' + levelOne.levelTwoList[0].articalList[0].title
              this.levelTwo = levelOne.levelTwoList[0]
              this.artical = levelOne.levelTwoList[0].articalList[0]
              this.menuList = this.menuListByLevelOne(this.levelOne)
              this.defaultActive = this.routeIndexByArtical(this.artical)
              this.updateDefaultOpens()
              this.$router.push(this.routeIndexByArtical(this.artical))
              break
            }
          }
        },
        updateDataByRoute () {

          if (!this.data) {
            this.getData()
            return
          }

          // 是否需要重定向
          let needRedict = false
          let levelOne = null
          let levelTwo = null
          let artical = null
          let articalId = this.urlArticalId

          // 存在文章ID，则采集一级二级ID
          if (articalId) {
            let find = this.levelOneTwoIdByArticalId(articalId)
            if (find.length) {
              levelOne = find[0]
              levelTwo = find[1]
              artical = find[2]
              articalId = artical.id
            }
          }

          // 未查询到文章
          if (!artical) {
            needRedict = true
            levelOne = this.data[0]
            levelTwo = this.data[0].levelTwoList[0]
            artical = this.data[0].levelTwoList[0].articalList[0]
            articalId = artical.id
          }

          if (needRedict) {
            this.$router.replace('/home/artical/detail/' + articalId)
          } else {
            this.levelOne = levelOne
            this.levelTwo = levelTwo
            this.artical = artical
            this.menuList = this.menuListByLevelOne(this.levelOne)
            this.defaultActive = this.routeIndexByArtical(this.artical)
          }
        },
        getData () {
          request({
            path: URLDefines.articalList,
            callBack: ({error, inData}) => {
              if (error) {
                this.$message.error(error.message)
                return
              }
              this.allOne = inData
              this.data = inData
              this.updateDataByRoute()
              this.updateDefaultOpens()
            }
          })
        },
        levelOneTwoIdByArticalId (articalId) {
          if (this.data) {
            for (let levelOne of this.data) {
              for (let levelTwo of levelOne.levelTwoList) {
                for (let artical of levelTwo.articalList) {
                  if (artical.id == articalId) {
                    return [levelOne, levelTwo, artical]
                  }
                }
              }
            }
          }
          return []
        },
        routeIndexByArtical (artical) {
          return artical.contentType === 'route_path' ? artical.routePath : ('/home/artical/detail/' + artical.id)
        },
        updateDefaultOpens () {
          let opens = []
          for (let menu of this.menuList) {
            opens.push(menu.index)
          }
          this.defaultOpens = opens
        },
        menuListByLevelOne (levelOne) {
          let levelTwoList = levelOne.levelTwoList
          let menuList = []
          for (let levelTwo of levelTwoList) {
            let item = {
              index: levelTwo.id + '',
              title: levelTwo.title,
              items: []
            }
            for (let artical of levelTwo.articalList) {
              item.items.push({
                index: this.routeIndexByArtical(artical),
                title: artical.title
              })
            }
            menuList.push(item)
          }
          return menuList
        }
      },
      mounted: function () {
        this.getData()
      },
      computed: {
        urlArticalId: function () {
          let params = this.$route.params;
          if (params && params.articalId) {
            return params.articalId
          }
          return null
        },
        // defaultActive: function() {
        //   if (this.artical) {
        //     console.log(this.routeIndexByArtical(this.artical))
        //     return this.routeIndexByArtical(this.artical)
        //   }
        //   return null
        // },
      }
    }
</script>

<style scoped>
  .funcBtnHover, .funcBtn:hover {
    margin-left: 20px;color: #2DB2F6;font-size: 20px;border: 1px #2DB2F655;border-radius:4px;padding: 3px 8px;background-color:#2DB2F633;
    cursor: pointer;
    -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    user-select:none;
  }
  .funcBtn {
    margin-left: 20px;color: #2DB2F6;font-size: 20px;padding: 3px 8px;
    cursor: pointer;
    -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    user-select:none;
  }
</style>
// getLevelOneList () {
//   request({
//     path: URLDefines.levelOneList,
//     body: {},
//     callBack: ({error, inData}) => {
//       if (error) {
//         this.$message.error(error.message)
//         return
//       }
//       this.allOne = inData
//       if (inData.length) {
//         this.levelOne = this.allOne[0]
//         this.getData()
//       } else {
//         this.levelOne = null;
//       }
//     }
//   })
// },

<!--<el-dropdown @command="handleCommand">-->
<!--<span class="el-dropdown-link" style="color: #2DB2F6;font-size: 22px;">-->
<!--语言：{{levelOne}}-->
<!--<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--</span>-->
<!--<el-dropdown-menu  slot="dropdown">-->
<!--<el-dropdown-item v-for="item in allOne"-->
<!--v-bind:key="item"-->
<!--:command="item">{{item}}</el-dropdown-item>-->
<!--</el-dropdown-menu>-->
<!--</el-dropdown>-->
