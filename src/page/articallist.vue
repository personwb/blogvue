<template>
  <div style="padding-left: 30px;padding-right:30px;padding-top: 40px;width: 100%;height:100%;">
    <div style="display: inline-block; width: 100%;">
      <h3 style="display: inline-block;">文章</h3>
      <el-button type="primary"
                 style="float: right;margin-right: 50px;"
                 v-on:click="onAdd">新建文章</el-button>
    </div>
    <el-table
      style="margin-top: 20px;"
      :data="data"
      stripe
      @row-click="jumpToDetail">
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章名称">
      </el-table-column>
      <el-table-column
        prop="levelOne.title"
        label="一级分类">
      </el-table-column>
      <el-table-column
        prop="levelTwo.title"
        label="二级分类">
      </el-table-column>
      <el-table-column
        prop="scan"
        label="浏览次数">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {URLDefines, request} from '../api/api'
  export default {
    name: "articallist",
    data: function () {
      return {
        data: []
      }
    },
    mounted: function () {
      request({
        path: URLDefines.articalManagerList,
        callBack: ({error, inData}) => {
          if (error) {
            this.$message.error(error.message)
            return
          }
          this.data = inData
        }
      })
    },
    methods: {
      onAdd () {
        this.$router.push({name: 'ArticalAdd', query: {}})
      },
      jumpToDetail (row, event, column) {
        this.$router.push({name: 'ArticalAdd', query: {id: row.id}})
      },
      onSubmit () {

      }
    }
  }
</script>

<style scoped>

</style>
