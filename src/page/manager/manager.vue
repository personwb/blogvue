<template>
  <div style="width: 100%;height: 100%;">
    <el-row style="height: 100%;">
      <el-col :span="4" style='width: 140px;height: 100%;background-color: #2DB2F6;'>
        <el-menu
          router
          background-color="#fff"
          text-color="#4a4a4a"
          active-text-color="#2DB2F6"
          style="overflow: hidden"
          default-active="2"
          class="el-menu-vertical-demo">
          <el-menu-item index="/manager/levelone">一级分类</el-menu-item>
          <el-menu-item index="/manager/leveltwo">二级分类</el-menu-item>
          <el-menu-item index="/manager/artical/list">文章管理</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span='20' style='height:100%;overflow:auto;'>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "manager",
    data: function () {
      return {}
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
