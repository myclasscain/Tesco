<template>
  <div class="home-container">
    <!-- 商品分类导航 -->
    <TypeNav />
    <!--列表-->
    <List />
    <!-- 今日推荐 -->
    <Recommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!-- 楼层 -->
    <Floor v-for="(list, index) in floorList" :key="index" :floor="list" />

    <!-- 商标 -->
    <Brand />
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 导入组件
import List from '@/pages/Home/List'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
export default {
  name: 'Home',
  components: {
    List,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed: {
    ...mapState('home', ['floorList'])
  }
}
</script>

<style lang="less" scoped></style>
