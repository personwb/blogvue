<template>
  <div style="width: 100%;height: 100%;margin: 0;padding: 0;">
    <div class="levelOne">
      <LevelTwoListCell title="新增语言"
                        v-on:selected="addLevelOneAction">
      </LevelTwoListCell>
      <LevelTwoListCell v-for="lt in data"
                        editable
                        v-bind:selected="levelOne.id===lt.id"
                        v-bind:title="lt.title"
                        v-on:edit="onClickLevelOne(lt, true)"
                        v-on:selected="onClickLevelOne(lt)"
                        v-bind:key="lt.id">
      </LevelTwoListCell>
    </div>
    <div class="levelTwo">
      <LevelTwoListCell title="新增分组"
                        v-bind:eitable="false"
                        v-on:selected="addLevelTwoAction">
      </LevelTwoListCell>
      <LevelTwoListCell v-for="lt in levelOne.levelTwoList"
                        editable
                        v-bind:selected="levelTwo.id===lt.id"
                        v-bind:title="lt.title"
                        v-on:edit="onSelectLevelTwo(lt, true)"
                        v-on:selected="onSelectLevelTwo(lt)"
                        v-bind:key="lt.id">
      </LevelTwoListCell>
    </div>
    <div class="artical">
      <LevelTwoListCell title="新增文章"
                        v-bind:eitable="false"
                        v-on:selected="addArticalAction">
      </LevelTwoListCell>
      <LevelTwoListCell v-for="lt in levelTwo.articalList"
                        v-bind:title="lt.title"
                        v-bind:selected="artical.id===lt.id"
                        v-on:edit="onSelectedArtical(lt, true)"
                        v-on:selected="onSelectedArtical(lt)"
                        v-bind:key="lt.index">
      </LevelTwoListCell>
    </div>
    <div class="articalEdit">
      <ArticalAddView v-if="artical" v-on:update="onArticalUpdate"></ArticalAddView>
    </div>
  </div>
</template>

<script>
  import ArticalAddView from './articaladd'
  import { request, URLDefines, articalAdd } from '../../api/api'
  import { addLevelOneRoute, addLevelTwoRoute, addArticalRoute } from './index'
  import LevelTwoListCell from './components/LevelTwoListCell'
  export default {
    name: "manager",
    data: function () {
      return {
        levelOne: {},
        levelTwo: {},
        artical: {},
        data: [],
      }
    },
    components: {
      LevelTwoListCell, ArticalAddView
    },
    watch: {
      '$route'(to, from) {
        this.updateDataByRoute()
      },
      'artical'(to, from) {
        if (this.artical) {
          this.$router.push(addArticalRoute(this.artical.id))
        }
      },
    },
    methods: {
      onArticalUpdate () {
        this.data = []
        this.updateDataByRoute()
      },
      addLevelOneAction (id) {
        this.$router.push(addLevelOneRoute(id))
      },
      addLevelTwoAction (id) {
        this.$router.push(addLevelTwoRoute(id))
      },
      addArticalAction (id) {
        let date = (new Date())
        let title = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDay()
        articalAdd({
        data: {
          levelTwoId: this.levelTwo.id,
          title: title
        },
        callBack: ({error, inData}) => {
          if (error) {
            this.$message.error(error.message)
            return
          }
          this.data = []
          this.$router.push(addArticalRoute(inData.id))
        }
        }, null)
      },
      onClickLevelOne (item, edit) {
        if (edit) {
          this.addLevelOneAction(item.id)
        } else {
          this.levelOne = item
          if (item.levelTwoList.length) {
            this.levelTwo = item.levelTwoList[0]
            if (this.levelTwo.articalList.length) {
              this.artical = this.levelTwo.articalList[0]
            } else {
              this.artical = null
            }
          } else {
            this.artical = null
          }
        }
      },
      onSelectLevelTwo (item, edit) {
        if (edit) {
          this.addLevelTwoAction(item.id)
        } else {
          this.levelTwo = item
          if (this.levelTwo.articalList.length) {
            this.artical = this.levelTwo.articalList[0]
          } else {
            this.artical = null
          }
        }
      },
      onSelectedArtical (item, edit) {
        this.artical = item
      },
      updateDataByRoute () {
        if (!this.data || !this.data.length) {
          this.getData()
          return
        }
        // 是否需要重定向
        let needRedict = false
        let levelOne = null
        let levelTwo = null
        let artical = null
        let articalId = this.urlArticalId()

        // 存在二级ID
        if (articalId) {
          let find = this.levelOneTwoArticalByArticalId(articalId)
          if (find.length) {
            levelOne = find[0]
            levelTwo = find[1]
            artical = find[2]
            articalId = artical.id
          }
        }

        // 未查询到选中的二级ID
        if (!articalId) {
          needRedict = true
          if (this.data.length) {
            levelOne = this.data[0]
            if (levelOne.levelTwoList.length) {
              levelTwo = levelOne.levelTwoList[0]
              if (levelTwo.articalList.length) {
                artical = levelTwo.articalList[0]
                articalid = artical.id
              }
            }
          }
        }
        if (needRedict) {
          if (articalId) {
            this.$router.replace( articaladd(articalId))
          }
        } else {
          this.levelOne = levelOne
          this.levelTwo = levelTwo
          this.artical = artical
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
            this.data = inData
            this.updateDataByRoute()
          }
        })
      },
      levelOneTwoArticalByArticalId (articalId) {
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
      urlArticalId: function () {
        let query = this.$route.query;
        if (query && query.id) {
          return query.id
        }
        return null
      }
    },
    mounted: function () {
      this.getData()
    },
  }
</script>

<style scoped>
  div.levelOne {
    min-height: 100%;
    margin: 0;
    padding: 0 0 0 0;
    float: left;
    width: 140px;
    box-sizing: border-box;
    background-color: #4a4a4a;
    border-right: 1px solid #9b9b9b;
  }
  div.levelTwo {
    min-height: 100%;
    margin: 0;
    float: left;
    width: 140px;
    padding: 0 0 0 0;
    box-sizing: border-box;
    background-color: #4a4a4a;
    border-right: 1px solid #9b9b9b;
  }
  div.artical {
    min-height: 100%;
    margin: 0;
    float: left;
    width:200px;
    padding: 0 0 0 0;
    box-sizing: border-box;
    background-color: #4a4a4a;
  }
  div.articalEdit {
    overflow: hidden;
    margin: 0;
    padding: 0 0 0 0;
    box-sizing: border-box;
  }
</style>
