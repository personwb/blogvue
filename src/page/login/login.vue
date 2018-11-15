<template>
  <div style="width: 28em;margin: 100px auto;background-color: #f8f8f8;border-radius: 10px;padding: 20px;">
    <p style="font-size: 25px;color: #4a4a4a;">登录：</p>
    <el-input style="margin-top: 10px;" placeholder="输入用户名"></el-input>
    <el-input style="margin-top: 10px;" placeholder="输入密码"></el-input>
    <el-button v-on:click="onLogin" type="primary" style="width: 100%; margin-top: 30px;">登录</el-button>
  </div>
</template>

<script>
    export default {
      name: "login",
      methods: {
        onLogin() {
          this.$router.push('/home')
        }
      }
    }
</script>

<style scoped>

</style>
