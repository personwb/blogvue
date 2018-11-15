<template>
  <div id="app" style="width: 100%;height: 100%;">
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style>

</style>
