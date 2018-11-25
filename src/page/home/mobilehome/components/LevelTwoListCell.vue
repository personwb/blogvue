<template>
  <div v-on:click="onClick"
       v-bind:class="cl">
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
  export default {
    name: 'LevelTwoListCell',
    props: {
      editable: {
        type: Boolean
      },
      title: {
        type: String,
        require: true
      },
      selected: Boolean,
    },
    computed: {
      cl () {
        return this.selected ? 'bodySelected' : 'body'
      }
    },
    methods: {
      onClick () {
        this.$emit('selected')
      }
    }
  }
</script>

<style scoped>
  .title {
    text-align: center;
    margin: 14px  auto 14px auto;
    overflow: hidden;
    font-size: 14px;
    line-height: 16px;
    color: black;
  }
  .edit {
    float: right;
    width: 12px;
    height: 12px;
    padding: 6px 0 6px 0;
    margin: 10px 5px 10px 0;
  }
  .body {
    overflow: hidden;
    cursor: pointer;
  }
  .body:hover, .bodySelected:hover, .bodySelected {
    overflow: hidden;
    /*background-color: #666;*/
    background-color: #eee;
    cursor: pointer;
  }
  /*.bodySelected {*/
    /*overflow: hidden;*/
    /*background-color: #eee;*/
    /*cursor: pointer;*/
    /*color: #2DB2F6;*/
    /*font-size: 16px;*/
    /*font-weight: bolder;*/
  /*}*/
</style>
