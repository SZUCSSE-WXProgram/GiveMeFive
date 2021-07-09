<template>
  <van-popup :show="loading" :close-on-click-overlay="false" :z-index="100" custom-style="background-color: transparent" class="loading"
             :style="{ pointerEvents: loading ? 'auto' : 'none' }">
    <van-loading type="spinner" color="#fff"></van-loading>
  </van-popup>
</template>

<script>
  export default {
    name: 'MyLoading',
    props: {
      loading: Boolean
    }
  }
</script>

<style scoped lang="less">
  .loading {
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    position: absolute;
    background-color: transparent;
    overflow: hidden;
  }
</style>
