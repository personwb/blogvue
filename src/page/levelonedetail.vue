<template>
  <div style="padding-left: 30px;padding-top: 40px;padding-right: 30px;">
    <h3>{{(isAdd ? '增加' : '编辑') + '一级分类：'}}</h3>
    <TitleInput title="一级菜单名称："
                placeholder="输入一级菜单名称"
                titleWidth="120"
                style="margin-top: 30px;"
                v-model="title"></TitleInput>
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
  import {addLevelOne, levelOneDetail} from '../api/api'
  import TitleInput from '../components/TitleInput'
  export default {
    name: 'LevelOneDetail',
    data: function () {
      return {
        title: null,
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
      getData () {
        if (this.isAdd) {
          return
        }
        levelOneDetail({
          data: {
            id: this.$route.query.id
          },
          callBack: ({error, inData}) => {
            if (error) {
              this.$message.error(error.message)
              return
            }
            this.title = inData.title
          }
        })
      },
      onSubmit () {
        if (!this.title) {
          this.$message.error('请输入一级菜单名称')
          return
        }
        addLevelOne({
          data: {
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
