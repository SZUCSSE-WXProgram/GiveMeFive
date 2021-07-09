<template>
  <div>
    <div style="height: 60px;"></div>
    <van-tabbar :active="nowTab" @change="onTabbarChange" :z-index="10" :safe-area-inset-bottom="false">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="clock-o">历史</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: 'TabBar',
    data () {
      return {}
    },
    props: {
      nowTab: Number,
    },
    methods: {
      onTabbarChange (e) {
        this.$emit('tab-change', e.mp.detail)
      }
    }
  }
</script>

<style scoped lang="less">
</style>
