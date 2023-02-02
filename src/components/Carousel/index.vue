<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: {
    list: {
      type: [Array, Object],
      require: true
    },
    isAutoplay: {
      type: Boolean,
      default: null
    }
  },
  watch: {
    list: {
      immediate: true,
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          let swiperConfig = {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }

            // 是否自动播放
          }
          if (this.isAutoplay) {
            swiperConfig.autoplay = {
              delay: 2500
            }
          }
          var mySwiper = new Swiper(this.$refs.cur, swiperConfig)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  .swiper-button-prev::after,
  .swiper-button-next::after {
    color: rgba(255, 255, 255, 0.8);
  }
}
</style>
