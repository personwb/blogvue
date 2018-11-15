<template>
  <div v-on:click="onClick"
       v-bind:class="cl">{{title}}</div>
</template>

<script>
  export default {
    name: 'LevelTwoListCell',
    defaultProps: {
      selected: false,
    },
    props: {
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
  .body {
    margin-bottom: 20px;
    font-weight: bolder;
    cursor: pointer;
    color: #4a4a4a;
    font-size: 16px;
  }
  .body:hover, .bodySelected:hover {
    margin-bottom: 20px;
    cursor: pointer;
    color: #2DB2F6;
    font-size: 16px;
    text-decoration: underline #2DB2F6;
  }
  .bodySelected {
    margin-bottom: 20px;
    cursor: pointer;
    color: #2DB2F6;
    font-size: 16px;
    font-weight: bolder;
  }
</style>
