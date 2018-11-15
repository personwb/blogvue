<template>
  <div style="padding-left: 30px;padding-right:30px;padding-top: 40px;width: 100%;height:100%;">

    <div style="display: inline-block; width: 100%;">
      <h3 style="display: inline-block;">二级分类</h3>
      <el-button type="primary"
                 style="float: right;margin-right: 50px;"
                 v-on:click="onAdd">新增二级分类</el-button>
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
        label="名称">
      </el-table-column>
      <el-table-column
        prop="levelOne.title"
        label="关联一级分类">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {request, URLDefines} from '../api/api'
export default {
  name: "LevelTwo",
  data: function () {
    return {
      data: []
    }
  },
  mounted: function () {
    this.getData()
  },
  methods: {
    onAdd() {
      this.$router.push({name: 'LevelTwoDetail', query: {}})
    },
    jumpToDetail(row, event, column) {
      this.$router.push({name: 'LevelTwoDetail', query: {id: row.id}})
    },
    getData() {
      request({
        path: URLDefines.levelTwoList,
        callBack: ({error, inData}) => {
          if (error) {
            this.$message.error(error.message)
            return
          }
          this.data = inData
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
