<template>
  <div>
    <van-search
        :value="searchText"
        show-action
        @search="onLoad"
        @cancel="searchCancel"
        @change="onChangeSearch"
        placeholder="请输入活动名称或负责人"
    />
    <activity-card
        v-for="(item, i) in activities"
        :key="i" :id="item.id"
        :category="item.category_id"
        :name="item.name"
        :teacher="item.teacher"
        :quota="item.participants + ' / '+ item.quota"
        :location="item.location"
        :start-time="item.start_time"
        :end-time="item.end_time"
    ></activity-card>

    <empty title="暂无数据" v-if="activities && activities.length === 0"></empty>
    <separator value="这是底线" v-else-if="activities"></separator>
    <div style="clear: both;"></div>
  </div>
</template>

<script>
  import Separator from '../seperator/Separator'
  import formatter from '../../utils/index'
  import ActivityCard from '../../components/activityCard/ActivityCard'
  import Empty from '../../components/empty/Empty'
  import { categories } from '../../constants'

  const pageSize = 10

  export default {
    name: 'History',
    components: { Empty, ActivityCard, Separator },
    data () {
      return {
        searchText: '',
        current: 0,
        total: 0,
        activities: [],
      }
    },
    methods: {
      onLoad () {
        this.$store.commit('incLoading')
        this.activities = []
        this.current = 0
        this.getList()
      },
      getList () {
        if (wx.getStorageSync('visitor') || this.$store.state.userInfo.admin) {
          this.getAll()
        } else {
          this.getHistory()
        }
      },
      getHistory () {
        this.$api.activityJoin.getHistory({
          openid: wx.getStorageSync('openid'),
          keyword: this.searchText,
          page: ++this.current,
          pageSize
        }).then((res) => {
          this.total = res.data.total
          const activities = res.data.list
          activities.forEach((item) => {
            item.start_time = formatter.formatDateTime(new Date(item.start_time))
            item.end_time = formatter.formatDateTime(new Date(item.end_time))
            item.category_id = categories[item.category_id - 1]
          })
          this.$store.commit('decLoading')
          wx.stopPullDownRefresh()
          this.activities = this.activities.concat(activities)
        })
      },
      getAll () {
        this.$api.activity.getAll({
          keyword: this.searchText,
          page: ++this.current,
          pageSize
        }).then((res) => {
          this.total = res.data.total
          const activities = res.data.list
          activities.forEach((item) => {
            item.start_time = formatter.formatDateTime(new Date(item.start_time))
            item.end_time = formatter.formatDateTime(new Date(item.end_time))
            item.category_id = categories[item.category_id - 1]
          })

          this.$store.commit('decLoading')
          wx.stopPullDownRefresh()
          this.activities = this.activities.concat(activities)
        })
      },
      searchCancel () {
        this.searchText = ''
        this.onLoad()
      },
      onChangeSearch (event) {
        this.searchText = event.mp.detail
      },
    },
    onPullDownRefresh () {
      this.onLoad()
    },
    onReachBottom () {
      if (this.current * pageSize < this.total) {
        this.$store.commit('incLoading')
        this.getList()
      }
    },
    mounted (e) {
      this.onLoad()
    }
  }
</script>

<style scoped lang="less">
</style>
