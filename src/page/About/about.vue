<template>
  <div style="display: flex;flex: 1;width: 100%;height: 100%;">
    <transition name="slide-fade">
      <div v-if="index > 0 || index === 0"
           class="body">
        <p class="title">欢迎来到 Onety 博客</p>
        <AnimateComponent v-for="item in page1.points"
                          :x="item.x"
                          :y="item.y"
                          :color="item.color"
                          :delay="item.delay"
                          :width="item.width"
                          v-on:click="onClick(item.title)"
                          v-bind:title="item.title"></AnimateComponent>
        <img v-on:click="onNext" class="next" src="./Source/next.png"/>
      </div>
    </transition>

    <transition name="slide-fade">
      <div v-if="index > 1 || index === 1" class="body" style="background-color: #D0021B">
        <img v-on:click="onNext" class="next" src="./Source/next.png"/>
      </div>
    </transition>

    <transition name="slide-fade">
      <div v-if="index > 2 || index === 2" class="body" style="background-color: #EF9A48">
        <img v-on:click="onTop" class="next" src="./Source/next.png"/>
      </div>
    </transition>
  </div>
</template>

<script>
  import AnimateComponent from './components/AnimateComponent';
  export default {
    name: "about",
    components: { AnimateComponent },
    data: function () {
      return {
        index: 0,
        page1: {
          points: [
            {
              x: 10,
              y: 30,
              color: '#F5A623',
              title: 'iOS',
              delay: 0
            },
            {
              x: 5,
              y: 65,
              color: '#ED321',
              title: 'Vue',
              delay: 0.5
            },
            {
              x: 25,
              y: 40,
              color: '#fff',
              title: 'Python',
              delay: 1
            },
            {
              x: 30,
              y: 55,
              color: '#fff',
              title: 'Swift',
              delay: 1.5
            },
            {
              x: 50,
              y: 50,
              color: '#50E3C2',
              title: 'ReactNative',
              delay: 2
            },
            {
              x: 70,
              y: 70,
              color: '#50E3C2',
              title: 'Nginx',
              delay: 2.5
            },
            {
              x: 70,
              y: 24,
              color: '#CC0999',
              title: 'WX小程序',
              delay: 3,
              width: 300,
            },
            {
              x: 80,
              y: 45,
              color: '#fff',
              title: 'Django',
              delay: 3
            },
          ]
        }
      }
    },
    methods: {
      onNext () {
        this.index = this.index + 1;
      },
      onTop () {
        this.index = 0;
      },
      onClick (module) {
        if (module === 'Swift' || module === 'iOS') {
          this.$router.push('/home/lt/11')
        } else if (module === 'Python') {
          this.$router.push('/home/lt/5')
        } else if (module === 'Vue') {
          this.$router.push('/home/lt/25')
        } else if (module === 'ReactNative') {
          this.$router.push('/home/lt/31')
        } else if (module === 'Nginx') {
          this.$router.push('/home/lt/13')
        } else if (module === 'Django') {
          this.$router.push('/home/lt/9')
        }
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .8s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(100%);
    opacity: 0;
  }
  .body {
    position: absolute;
    flex: 1;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #4A90E2;
    box-shadow: 0 -4px 4px #888888;
    /*background-image: url(./bg1.jpeg);*/
  }
  .title {
    font-size: 50px;
    text-align: center;
    color: #fff;
    margin-top: 60px;
    text-shadow: 0 2px 4px #000000aa;
    font-weight: bold;
  }
  .next {
    display: flex;
    position: absolute;
    left: 50%;
    bottom: 50px;
    width: 40px;
    height: 32px;
    cursor: pointer;
  }
</style>
