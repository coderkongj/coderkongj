<template>
  <div>
    <div class="swiper-container" id="floor1Swiper" ref="mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in list.carouselList" :key="item.id">
          <img :src="item.imgUrl">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper"
import "swiper/css/swiper.min.css"
export default {
  name: 'Carousel',
  props: ["list"],
  watch: {
    carouselList: {
      immediate: true,
      handler() {
        //只能监听到数据已经有了，但是v-for动态渲染结构没办法确定，因此还是需要使用nextTick
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              //点击小球切换图片
              clickable: true
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>