<template>
  <div>
    <div class="user-header">
      <div class="user-header-content">
        <div style="display: flex;" @click="onSwitch">
          <open-data type='userAvatarUrl'/>
        </div>
        <br/>
        <span>{{ !auth ? '未授权' : (visitor ? '访客' : name) }}</span>
        <br/>
        <div v-if="!admin && !visitor && auth">
          <span style="font-size: 0.75rem; line-height: 0.75rem;">{{studentId}}</span>
          <br/>
        </div>
        <span v-if="!visitor && auth" style="font-size: 0.75rem; line-height: 0.75rem;">{{ admin ? '管理员' : className }}</span>
      </div>
    </div>
    <div class="user-body" v-if="auth">
      <van-cell-group v-if="admin">
        <van-cell title="发布活动" is-link icon="flag-o" size="large" url="/pages/activityAdd/main"></van-cell>
      </van-cell-group>
      <van-cell-group v-else-if="!visitor">
        <van-cell title="待签到活动" is-link icon="todo-list-o" size="large" url="/pages/activityTodo/main"></van-cell>
        <van-cell title="历史统计" is-link icon="bar-chart-o" size="large" url="/pages/statistics/main"></van-cell>
      </van-cell-group>
      <van-cell-group v-if="academic">
        <van-cell v-if="academic === 1" title="我的帮扶" is-link icon="notes-o" size="large" url="/pages/academic/main"></van-cell>
        <van-cell v-else-if="academic === 2" title="我的学业" is-link icon="notes-o" size="large" url="/pages/academic/main"></van-cell>
      </van-cell-group>
      <van-cell-group v-if="visitor">
        <van-cell title="注册" is-link icon="notes-o" size="large" @click="onRegister"></van-cell>
      </van-cell-group>
    </div>
    <div class="user-body" v-if="!auth">
      <van-cell-group>
        <van-cell title="授权" is-link icon="notes-o" size="large" @click="onAuth"></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import login from '../../utils/login'

  export default {
    name: 'User',
    data () {
      return {
        auth: false,
        visitor: false,
      }
    },
    methods: {
      onSwitch (event) {
        if (!this.developer) {
          return
        }
        this.$store.commit('incLoading')
        this.$api.user.updateAdmin({
          openid: wx.getStorageSync('openid'),
          admin: this.admin ? 0 : 1,
        }).then((res) => {
          this.$store.commit('decLoading')
          this.refresh()
        }).catch(console.error)
      },
      onRegister () {
        wx.redirectTo({
          url: '/pages/identity/main',
        })
      },
      onAuth () {
        wx.redirectTo({
          url: '/pages/authorize/main',
        })
      },
      refresh () {
        this.$store.commit('incLoading')
        login(this).then(() => {
          wx.stopPullDownRefresh()
        })
      },
    },
    computed: {
      name () {
        return this.$store.state.userInfo.name
      },
      studentId () {
        return this.$store.state.userInfo.studentId
      },
      className () {
        return this.$store.state.userInfo.className
      },
      academic () {
        return this.$store.state.userInfo.academic
      },
      admin () {
        return this.$store.state.userInfo.admin
      },
      developer () {
        return this.$store.state.userInfo.developer
      },
    },
    mounted () {
    },
    updated () {
      this.auth = wx.getStorageSync('auth')
      this.visitor = wx.getStorageSync('visitor')
    },
    onPullDownRefresh () {
      this.refresh()
    },
    onLoad () {
      this.auth = wx.getStorageSync('auth')
      this.visitor = wx.getStorageSync('visitor')
    },
  }
</script>

<style scoped lang="less">
  .user-header {
    height: 5rem;
    background: linear-gradient(to bottom, #39f, #6cf);
    white-space: nowrap;
    text-align: center;
    position: relative;

    &-content {
      top: 50%;
      left: 50%;
      color: #fff;
      position: absolute;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);

      open-data[type='userAvatarUrl'] {
        width: 2rem;
        height: 2rem;
        margin: 0 auto;
        box-shadow: 0 0 25px #888;
        border: 0.025rem solid #FFF;
        border-radius: 100%;
        overflow: hidden;
      }

      span {
        line-height: 1rem;
      }
    }
  }
</style>
