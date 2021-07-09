<script>
  import login from './utils/login'

  export default {
    created () {
      // 调用API从本地缓存中获取数据
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
      wx.setStorageSync('visitor', false)
      console.log(process.env.NODE_ENV)
      wx.cloud.init({
        traceUser: true
      })
      this.$store.commit('incLoading', false)
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            // 已授权
            wx.setStorageSync('auth', true)
            wx.setStorageSync('visitor', false)
            login().catch(console.error)
          } else {
            // 未授权，先让用户体验小程序，必要时授权
            wx.setStorageSync('auth', false)
            wx.setStorageSync('visitor', true)
          }
        }
      })
    }
  }
</script>

<style lang="less">
  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }

  .collapse-item__content {
    padding: 0 !important;
  }

  .van-tabbar {
    box-shadow: 0 0 10px #ccc;
  }

  .cell-group-title {
    margin-left: 15px;
    font-size: 14px;
    color: #888;
  }

  textarea {
    width: 100%;
    height: 150px;
    resize: vertical;
    line-height: 24px;
    text-align: left;
    color: #333;
  }

  .van-button--blue {
    background-color: #39f !important;
    border-color: #39f !important;
    color: #fff !important;
  }

  .loading {
    background-color: transparent;
  }

  .linear-gradient {
    &-1 {
      background: linear-gradient(to bottom right, #30496B, #30B8D2)
    }

    &-2 {
      background: linear-gradient(to bottom right, #FBCA88, #EF69AD)
    }

    &-3 {
      background: linear-gradient(to bottom right, #B6C1D4, #EC68B1)
    }

    &-4 {
      background: linear-gradient(to bottom right, #ABE5E6, #7062F0)
    }

    &-5 {
      background: linear-gradient(to bottom right, #476892, #59355D)
    }

    &-6 {
      background: linear-gradient(to bottom right, #92F1D5, #ABF6BD)
    }

    &-7 {
      background: linear-gradient(to bottom right, #7D6AE7, #56A2D5)
    }

    &-8 {
      background: linear-gradient(to bottom right, #82E9E4, #F3D62F)
    }

    &-9 {
      background: linear-gradient(to bottom right, #239FE9, #44D5F3)
    }

    &-10 {
      background: linear-gradient(to bottom right, #3D3949, #6772A4)
    }

    &-11 {
      background: linear-gradient(to bottom right, #FD5A49, #FDDC98)
    }

    &-12 {
      background: linear-gradient(to bottom right, #9AD3DE, #93B8C0)
    }

    &-13 {
      background: linear-gradient(to bottom right, #F32F8E, #B236D0)
    }

    &-14 {
      background: linear-gradient(to bottom right, #247CC4, #336BAE)
    }

    &-15 {
      background: linear-gradient(to bottom right, #FB7140, #FB9951)
    }

    &-16 {
      background: linear-gradient(to bottom right, #6FE594, #27A47C)
    }

    &-17 {
      background: linear-gradient(to bottom right, #95FD48, #19E9A6)
    }

    &-18 {
      background: linear-gradient(to bottom right, #469FFF, #A39AF9)
    }

    &-19 {
      background: linear-gradient(to bottom right, #5CF0F8, #ECDDFE)
    }

    &-20 {
      background: linear-gradient(to bottom right, #F1467A, #FB949E)
    }

    &-21 {
      background: linear-gradient(to bottom right, #DAE7F0, #FADAE7)
    }

    &-22 {
      background: linear-gradient(to bottom right, #6155D4, #5B97F2)
    }

    &-23 {
      background: linear-gradient(to bottom right, #47AEA3, #08B1C5)
    }

    &-24 {
      background: linear-gradient(to bottom right, #DA1FF2, #4C15D0)
    }

    &-25 {
      background: linear-gradient(to bottom right, #D0F56B, #5876FB)
    }

    &-26 {
      background: linear-gradient(to bottom right, #FFE9D0, #FD7153)
    }

    &-27 {
      background: linear-gradient(to bottom right, #DBFDEC, #FFC2D4)
    }

    &-28 {
      background: linear-gradient(to bottom right, #C3A8EE, #F5C1EA)
    }

    &-29 {
      background: linear-gradient(to bottom right, #484C91, #929BEF)
    }

    &-30 {
      background: linear-gradient(to bottom right, #97F7FB, #8D8AFC)
    }
  }
</style>
