<template>
  <div class="container">
    <home v-if="nowTab === 0" ref="home"></home>
    <history v-if="nowTab === 1" ref="history"></history>
    <user v-if="nowTab === 2" ref="user"></user>
    <tab-bar :now-tab="nowTab" @tab-change="onTabChange"></tab-bar>

    <MyLoading :loading="load"></MyLoading>
  </div>
</template>

<script>
  import Home from '../home/Home'
  import User from '../user/User'
  import TabBar from '../tabbar/TabBar'
  import History from '../history/History'
  import MyLoading from '../../components/myLoading/MyLoading'

  export default {
    data () {
      return {
        nowTab: 0,
      }
    },

    components: {
      MyLoading,
      History,
      TabBar,
      User,
      Home
    },

    methods: {
      onTabChange (nowTab) {
        this.nowTab = nowTab
      }
    },

    computed: {
      load () {
        return this.$store.state.loading
      }
    },

    mounted () {
    },

    onShow () {
    },

    onPullDownRefresh () {
      switch (this.nowTab) {
        case 0:
          this.$refs['home'].onLoad()
          break
      }
    }
  }
</script>

<style lang="less">
  page {
    min-height: 100%;
    background-color: #fafafa;
  }

  .sign-cell {
    line-height: 30px;
  }
</style>
