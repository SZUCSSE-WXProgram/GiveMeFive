<template>
  <div class="identity">
    <div style="height: 20px;"></div>
    <div class="identity-card">
      <div class="identity-card-icon">
        <van-icon name="manager-o" custom-style="display: block"/>
      </div>
      <div class="identity-card-button">
        <van-button block type="info" @click="onClickTeacher">我是教师</van-button>
      </div>
    </div>
    <div style="height: 70px;"></div>
    <div class="identity-card">
      <div class="identity-card-icon">
        <van-icon name="friends-o" custom-style="display: block"/>
      </div>
      <div class="identity-card-button">
        <van-button block type="info" @click="onClickStudent">我是学生</van-button>
      </div>
    </div>
    <div style="height: 50px;"></div>
    <div class="identity-visitor">
      <a @click="onClickVisitor">我是访客</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'identity',
    data () {
      return {}
    },
    methods: {
      onClickTeacher () {
        wx.navigateTo({
          url: '/pages/register/main?isTeacher=1'
        })
      },
      onClickStudent () {
        wx.navigateTo({
          url: '/pages/register/main?isTeacher=0'
        })
      },
      onClickVisitor () {
        wx.setStorageSync('visitor', true)
        wx.redirectTo({
          url: '/pages/index/main'
        })
      },
    },
    mounted () {
    }
  }
</script>

<style scoped lang="less">
  .identity {
    min-height: 100vh;
    background-color: #39f;

    &-card {
      width: 85%;
      height: 250px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 10px #888;
      text-align: center;

      &-icon {
        height: calc(100% - 80px);
        justify-content: center;
        align-items: center;
        display: flex;
        font-size: 2.5rem;
      }

      &-button {
        width: 85%;
        margin: 18px auto;
      }
    }

    &-visitor {
      padding: 20px 0;
      text-align: center;
      font-size: 14px;
      color: #DDD;
    }
  }
</style>
