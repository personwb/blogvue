<template>
    <div style="margin: 0; padding: 0;">
      <h1 style="border: none;margin: 0;padding: 0">{{articalData.title}}</h1>
      <div v-if="articalData.scan" style="margin: 10px 0 0 0;color: gray;font-size: 16px;">
        <p style="display: inline-block;font-size: 14px;">{{'浏览：' + articalData.scan}}</p>
        <p style="display: inline-block;font-size: 14px;margin-left: 15px;">{{'发布：' + articalData.createTime}}</p>
        <span class="funcBtnHover"
              v-on:click="onClickLevelOne(item)">{{articalData.levelOne.title}}</span>
        <span class="funcBtnHover"
              v-on:click="onClickLevelTwo(item)">{{articalData.levelTwo.title}}</span>
      </div>
    </div>
</template>

<script>
  import { levelTwoRouteById } from '../router/index'
  export default {
    name: "ArticalHeader",
    props: {
      articalData: Object,
    },
    computed: {
    },
    methods: {
      onClickLevelTwo () {
        this.$router.push(levelTwoRouteById(this.articalData.levelTwo.id))
      },
      onClickLevelOne () {
        this.$router.push(levelTwoRouteById(this.articalData.levelTwo.id))
      },
    }
  }
</script>

<style scoped>
  .funcBtnHover {
    margin-left: 20px;color: #2DB2F6;font-size: 14px;border: 1px #2DB2F655;border-radius:4px;padding: 3px 8px;background-color:#2DB2F633;
    cursor: pointer;
  }
</style>
