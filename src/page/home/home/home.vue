<template>

    <div style="width: 100%;height: 100%;">
      <el-row :span="2" type="flex" align="middle" >
        <img style="width: 200px;height: 130px;margin: 20px 20px 0 20px;" src="../../../assets/Onety.png"/>
        <div style="display: inline-block; margin-left: 30px;margin-bottom: 10px;flex-wrap: wrap">
          <div v-for="item in allOne"
                onselectstart="return false"
                v-bind:key="item.id"
                v-bind:class="levelOne.id === item.id ? 'funcBtnHover' : 'funcBtn'"
                v-on:click="onClickLevelOne(item)">{{item.title}}</div>
        </div>
      </el-row>
      <div style="padding-top: 20px;border-top: 1px solid #f0f0f0;">
        <div style="display: inline-block;width: 180px;margin: 0;box-sizing: border-box;padding-left: 20px;">
          <LevelTwoListCell v-for="lt in levelOne.levelTwoList"
                            v-bind:title="lt.title"
                            v-bind:selected="lt.id===levelTwo.id"
                            v-on:selected="onSelectLevelTwo(lt)"
                            v-bind:key="lt.index"></LevelTwoListCell>
        </div>
        <div style="float: right;width: calc(100% - 180px);left: 180px;top: 150px;">
          <ArticalListCell v-for="artical in levelTwo.articalList"
                           v-bind:data="artical"
                           v-on:selected="onSelectedArtical(artical)"
                           v-bind:key="artical.id"></ArticalListCell>
        </div>
      </div>
    </div>
</template>

<script>
  import Device from 'current-device'
  import { articalDetalRouteByArtical, levelTwoRouteById, mobileHomeRoute, isMobileRoute } from '../../../router/index'
  import LevelTwoListCell from './components/LevelTwoListCell'
  import ArticalListCell from './components/ArticalListCell'
  import { URLDefines, request } from '../../../api/api'
    export default {
      name: "home",
      components: {
        LevelTwoListCell, ArticalListCell
      },
      data: function () {
        return {
          allOne: [],
          levelOne: {},
          levelTwo: {},
          data: [],
        }
      },
      watch: {
        '$route'(to, from) {
          this.updateDataByRoute()
        },
      },
      methods: {
        onSelectLevelTwo (item) {
          this.$router.push(levelTwoRouteById(item.id))
        },
        onClickLevelOne (levelOne) {
          this.$router.push(levelTwoRouteById(levelOne.levelTwoList[0].id))
        },
        onSelectedArtical (artical) {
          let path = articalDetalRouteByArtical(artical)
          let routeData = this.$router.resolve({ path: path});
          window.open(routeData.href, '_blank');
        },
        updateDataByRoute () {
          if (Device.mobile() && !isMobileRoute(this.$route.path)) {
            this.$router.replace(mobileHomeRoute())
            return
          }
          if (!this.data) {
            this.getData()
            return
          }
          // 是否需要重定向
          let needRedict = false
          let levelOne = null
          let levelTwo = null
          let levelTwoId = this.urlLevelTwoId

          // 存在二级ID
          if (levelTwoId) {
            let find = this.levelOneTwoByLevelTwoId(levelTwoId)
            if (find.length) {
              levelOne = find[0]
              levelTwo = find[1]
            }
          }

          // 未查询到选中的二级ID
          if (!levelTwoId) {
            needRedict = true
            levelOne = this.data[0]
            levelTwo = this.data[0].levelTwoList[0]
            levelTwoId = levelTwo.id
          }

          if (needRedict) {
            this.$router.replace(levelTwoRouteById(levelTwoId))
          } else {
            this.levelOne = levelOne
            this.levelTwo = levelTwo
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
            }
          })
        },
        levelOneTwoByLevelTwoId (levelTwoId) {
          if (this.data) {
            for (let levelOne of this.data) {
              for (let levelTwo of levelOne.levelTwoList) {
                if (levelTwo.id == levelTwoId) {
                  return [levelOne, levelTwo]
                }
              }
            }
          }
          return []
        },
      },
      mounted: function () {
        console.log(Device.mobile())
        if (Device.mobile() && !isMobileRoute(this.$route.path)) {
          this.$router.replace(mobileHomeRoute())
        } else {
          this.getData()
        }
      },
      computed: {
        urlLevelTwoId: function () {
          let params = this.$route.params;
          if (params && params.levelTwoId) {
            return params.levelTwoId
          }
          return null
        }
      }
    }
</script>

<style scoped>
  .funcBtnHover, .funcBtn:hover {
    overflow: hidden;
    display: inline-block;
    margin-left: 20px;
    color: #2DB2F6;
    font-size: 20px;
    border: 1px #2DB2F655;
    border-radius:4px;
    padding: 3px 8px;
    background-color:#2DB2F633;
    cursor: pointer;
    -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    user-select:none;
  }
  .funcBtn {
    display: inline-block;
    overflow: hidden;
    margin-left: 20px;color: #2DB2F6;font-size: 20px;padding: 3px 8px;
    cursor: pointer;
    -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    user-select:none;
  }
</style>
