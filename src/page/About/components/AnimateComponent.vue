<template>
  <transition name="fade">
    <div v-if="show"
         class="body"
         v-on:click="privateOnClick"
         v-bind:style="{'color': color, left: x + '%', top: y + '%', width: width + 'px'}">
    {{this.title}}
    </div>
  </transition>
</template>

<script>
  export default {
    name: "AnimateComponent",
    props: {
      title: String,
      color: String,
      x: Number,
      y: Number,
      delay: Number,
      width: Number,
    },
    data: function () {
      return {
        show: true,
        stop: false
      }
    },
    methods: {
      privateOnClick () {
        this.$emit('click')
      },
      play () {
        if (!this.stop) {
          if (!this.show) {
            this.show = !this.show;
            let timer = setTimeout(()=>{
              clearTimeout(timer);
              this.play()
            }, 1000)
          } else {
            let timer = setTimeout(()=>{
              clearTimeout(timer);
              this.show = !this.show;
              this.stayPlay()
            }, 1000)
          }
        }
      },
      stayPlay () {
        let timer = setTimeout(()=>{
          clearTimeout(timer);
          this.play();
        }, 1000);
      }
    },
    mounted: function () {
      let timer = setTimeout(()=>{
        this.play();
        clearTimeout(timer)
      }, this.delay * 1000);
    },
    beforeDestroy: function () {
      this.stop = true;
    }
  }
</script>

<style scoped>
  .body {
    font-size: 50px;
    display: flex;
    position: absolute;
    box-shadow: none;
    font-weight: bold;
    width: 200px;
    height: 70px;
    background-color: transparent;
    -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    cursor: pointer;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0.0;
  }
</style>
