<template>
  <div style="padding-left: 30px;padding-top: 40px;padding-right: 30px;">
    <h3>{{(isAdd ? '增加' : '编辑') + '二级分类：'}}</h3>
    <div style="display: inline-block;margin-top: 20px;">
      <span style="width: 120px;">关联一级菜单：</span>
      <el-select v-model="levelOneId"
                 style="width: 200px;margin-top: 10px;">
        <el-option v-for="item in levelOneList" v-bind:key="item.id" v-bind:label="item.title" v-bind:value="item.id"></el-option>
      </el-select>
    </div>
    <TitleInput title="二级菜单名称："
                placeholder="输入二级菜单名称"
                titleWidth="120"
                v-bind:value="title"
                v-on:input="title=$event"
                style="margin-top: 30px;"></TitleInput>
    <el-button slot="tip"
               v-on:click="onSubmit"
               style="margin-top: 30px;"
               type="primary">{{(isAdd ? '增加' : '编辑')}}</el-button>
    <el-button slot="tip"
               v-on:click="onDelete"
               style="margin-top: 30px;"
               type="danger">删除</el-button>
  </div>
</template>

<script>
  import {addLevelTwo, levelTwoDetail, request, URLDefines} from '../api/api'
  import TitleInput from '../components/TitleInput'
  export default {
    name: 'LevelOneDetail',
    data: function () {
      return {
        title: null,
        levelOneList: [],
        levelOneId: null,
      }
    },
    computed: {
      isAdd () {
        return !(this.$route.query && this.$route.query.id)
      }
    },
    components: {
      TitleInput
    },
    mounted: function () {
      this.getData()
    },
    methods: {
      onDelete () {

      },
      getData () {
        if (this.isAdd) {
          request({
            path: URLDefines.levelOneList,
            callBack: ({error, inData}) => {
              if (error) {
                this.$message.error(error.message)
                return
              }
              this.levelOneList = inData
            }
          })
          return
        }
        levelTwoDetail({
          data: {
            id: this.$route.query.id,
          },
          callBack: ({error, inData}) => {
            if (error) {
              this.$message.error(error.message)
              return
            }
            this.title = inData.detail.title
            this.levelOneList = inData.levelOneList
            this.levelOneId = inData.detail.levelOne.id
          }
        })
      },
      onSubmit () {
        if (!this.title) {
          this.$message.error('请输入二级菜单名称')
          return
        }
        if (!this.levelOneId) {
          this.$message.error('请选择关联的以及')
          return
        }
        addLevelTwo({
          data: {
            levelOneId: this.levelOneId,
            title: this.title,
            id: this.isAdd ? null : this.$route.query.id,
          },
          callBack: ({error, inData}) => {
            if (error) {
              this.$message.error(error.message)
              return
            }
            this.$message.success('增加成功')
            this.$router.back()
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
