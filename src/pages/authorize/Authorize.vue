<template>
  <div>
    <div style="text-align: center; margin: 2rem 0">
      <img src="https://s2.ax1x.com/2019/09/07/n1DyHU.png" style="width: 10rem; height: 10rem"/>
    </div>

    <div style="margin: 2rem;">
      <div style="text-align: center">小程序需要获取头像和昵称等信息</div>
      <div style="text-align: center">需要授权登录</div>
    </div>

    <div style="width: 90%; margin: 1rem auto;">
      <van-button size="large" type="primary" @click="onSubmit" open-type="getUserInfo" @getuserinfo="getUserInfo">
        授权登录
      </van-button>
    </div>

    <van-popup :show="load" :close-on-click-overlay="false" :z-index="1000000" custom-style="background-color: transparent">
      <van-loading type="spinner" color="#fff"></van-loading>
    </van-popup>
  </div>
</template>

<script>
  import login from '../../utils/login'

  export default {
    name: 'Authorize',
    computed: {
      load () {
        return this.$store.state.loading
      },
    },
    methods: {
      getUserInfo (e) {
        console.log(e)
        if (e.mp.detail.rawData) {
          this.$store.commit('incLoading', false)
          wx.setStorageSync('auth', true)
          wx.setStorageSync('visitor', false)
          wx.reLaunch({
            url: '/pages/index/main',
          })
          login()
        }
      },
    },
    mounted () {
      this.$store.commit('setLoading', 0)
    },
  }
</script>

<style scoped lang="less">
  page {
    height: 100%;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    box-shadow: 0 0 25px #888;
  }
</style>
