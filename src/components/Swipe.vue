<template>
<div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="list in lists">
        <a class="js-no-follow" :href="list.clickUrl">
          <img class="goods-main-photo fadeIn" :src="list.img">
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
  // props: ['lists'],
  props: {
    lists: {
      type: Array,
      require: true
    },
    name: {}
  },
  created() {//swiper插件对dom节点进行操作， dom节点什么时候生成--mounted阶段
    //console.log('created', document.querySelectorAll('.swiper-slide'))
  },
  mounted() {
    //console.log('created', document.querySelectorAll('.swiper-slide'))
    
    this.init()
  },
  // watch: {
  //   lists(val, oldval){
  //     console.log(val, oldval)
  //     console.log('before', document.querySelectorAll('.swiper-slide'))
  //     this.$nextTick(()=>{
  //       console.log('after nextTick: ',document.querySelectorAll('.swiper-slide'))
  //     })
  //   }
  // },
  methods: {
    init() {
      new Swiper('.swiper-container', {
        loop: true,
        autoplay: true,
        pagination: '.swiper-pagination'
      })
    }
  }
}
</script>

<style>

.swiper-slide img {
  width: 100%;
  height: 100%;
}
</style>
