<template>
  <div class="appContainer">
    <!-- 头部 -->
    <Header />
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 尾部 -->
    <Footer v-show="$route.meta.isShow" />
  </div>
</template>

<script>
// 导入组件
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    this.$store.dispatch('home/categoryList')

    this.$store.dispatch('home/reqBannerList')

    this.$store.dispatch('home/reqFloorList')
  }
}
</script>

<style></style>
