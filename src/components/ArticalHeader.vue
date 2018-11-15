<template>
    <div style="margin: 0 30px 0 30px; padding: 0;">
      <h1 style="border: none;margin: 0;padding: 0">{{articalData.title}}</h1>
      <div v-if="articalData.scan" style="margin: 10px 0 0 0;color: gray;font-size: 16px;">
        {{'浏览：' + articalData.scan}}
      </div>
    </div>
</template>

<script>
  export default {
    name: "ArticalHeader",
    props: {
      articalData: String
    }
  }
</script>

<style scoped>

</style>
