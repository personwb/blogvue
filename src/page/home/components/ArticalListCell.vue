<template>
    <div class="body" v-on:click="onSelected">
      <a class="title">{{data.title}}</a>
      <p class="content">{{data.title}}</p>
      <div style="margin-bottom: 8px;">
        <p class="content">{{'浏览：' + data.scan}}</p>
        <p class="content public">{{'发布：' + data.createTime}}</p>
      </div>
    </div>
</template>

<script>
  export default {
    name: "ArticalListCell",
    props: {
      data: {
        type: Object,
        require: true,
      },
    },
    methods: {
      onSelected () {
        this.$emit('selected', this.data)
      }
    }
  }
</script>

<style scoped>
  .body {
    margin: 0 30px;
    border-bottom: 1px solid #f0f0f0;
    word-wrap: break-word;
  }
  a.title {
    font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    color: black;
    margin: 0 0 4px 0;
    display: inherit;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    cursor: pointer;
    text-decoration: none;
    background-color: transparent;
  }
  a.title:hover {
    font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    color: black;
    margin: 0 0 4px 0;
    display: inherit;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    cursor: pointer;
    text-decoration: underline;
    background-color: transparent;
  }
  .content {
    margin: 0;
    font-size: 13px;
    line-height: 24px;
    color: #999;
    display: inline-block;
    text-align: -webkit-match-parent;
  }
  .public {
    margin-left: 8px;
  }
</style>
