<template>
  <div>
    <div style="border-bottom: 1px solid #f0f0f0;width: 100%;height: 100%;">
      <img style="width: 70px;height: 40px;margin: 10px;overflow: hidden;"
           src="../../../assets/Onety.png"/>
    </div>
    <div class="funcBtn"
         v-on:click="onClickDirectory">{{directory}}</div>
    <div v-if="emptyDesc" style="text-align: center;margin-top: 40px;color: gray;">
      {{emptyDesc}}
    </div>
    <ArticalListCell v-for="artical in levelTwo.articalList"
                     v-bind:data="artical"
                     v-on:selected="onSelectedArtical(artical)"
                     v-bind:key="artical.id"></ArticalListCell>
    <el-dialog
      title="目录"
      center
      :visible.sync="dialogVisible"
      width="80%">
      <div style="overflow: hidden;height: 300px;width: 100%;margin: 0;padding: 0;">
        <div class="levelOne">
          <LevelTwoListCell v-for="lt in data"
                            editable
                            v-bind:selected="directoryLevelOne.id===lt.id"
                            v-bind:title="lt.title"
                            v-on:selected="onClickLevelOne(lt)"
                            v-bind:key="lt.id">
          </LevelTwoListCell>
        </div>
        <div class="levelTwo">
          <LevelTwoListCell v-for="lt in directoryLevelOne.levelTwoList"
                            editable
                            v-bind:selected="directoryLevelTwo.id===lt.id"
                            v-bind:title="lt.title"
                            v-on:selected="onSelectLevelTwo(lt)"
                            v-bind:key="lt.id">
          </LevelTwoListCell>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import { articalDetalRouteByArtical, levelTwoRouteById } from '../../../router/index'
  import ArticalListCell from '../home/components/ArticalListCell'
  import LevelTwoListCell from './components/LevelTwoListCell';
  import { request, URLDefines } from '../../../api/api'
  export default {
    name: "MobileHome",
    data: function () {
      return {
        dialogVisible: false,
        data: [],
        levelOne: {},
        levelTwo: {},
        directoryLevelOne: {},
        directoryLevelTwo: {},
      }
    },
    components: {
      LevelTwoListCell, ArticalListCell
    },
    watch: {
      'dialogVisible' (to, from) {
        if (to) {
          this.getData()
        }
      },
      '$route'(to, from) {
        this.updateDataByRoute()
      },
      'levelOne'(to, from) {
        this.directoryLevelOne = to
      },
      'levelTwo'(to, from) {
        this.directoryLevelTwo = to
      },
    },
    computed: {
      emptyDesc () {
        if (this.levelTwo.title && this.levelTwo.articalList.length === 0) {
          return "\"" + this.levelOne.title + ' > ' + this.levelTwo.title + '\"' + '下暂无文章，博主正在补充'
        }
        return null
      },
      directory () {
        let d = '目录'
        if (this.levelOne.title) {
          d = d + ' > ' + this.levelOne.title
        }
        if (this.levelTwo.title) {
          d = d + ' > ' + this.levelTwo.title
        }
        return d
      },
      urlLevelTwoId: function () {
        let params = this.$route.params;
        if (params && params.levelTwoId) {
          return params.levelTwoId
        }
        return null
      }
    },
    methods: {
      onClickDirectory () {
        this.dialogVisible = true
      },
      onSelectedArtical (artical) {
        let path = articalDetalRouteByArtical(artical)
        let routeData = this.$router.resolve({ path: path});
        window.open(routeData.href, '_blank');
      },
      onClickLevelOne (item) {
        this.directoryLevelOne = item
      },
      onSelectLevelTwo (item) {
        this.dialogVisible = false
        this.$router.push(levelTwoRouteById(item.id))
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
      this.getData()
    },
  }
</script>

<style scoped>
  div.levelOne {
    overflow: auto;
    height: 100%;
    margin: 0;
    padding: 0 0 0 0;
    float: left;
    width: 50%;
    box-sizing: border-box;
    /*background-color: #4a4a4a;*/
    border-right: 1px solid #eee;
  }
  div.levelTwo {
    overflow: auto;
    height: 100%;
    margin: 0;
    float: left;
    width: 50%;
    padding: 0 0 0 1px;
    box-sizing: border-box;
    /*background-color: #4a4a4a;*/
    /*border-right: 1px solid #eee;*/
  }
  .funcBtn {
    display: inline-block;
    overflow: hidden;
    margin-left: 20px;color: #2DB2F6;font-size: 18px;padding: 8px 8px;
    cursor: pointer;
    -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    user-select:none;
  }
</style>
