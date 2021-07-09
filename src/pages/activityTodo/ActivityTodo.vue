<template>
  <div>
    <activity-card v-for="(item, i) in activities" :key="i" :id="item.id" :name="item.name"
                   :teacher="item.teacher" :quota="item.participants + ' / '+ item.quota" :location="item.location" :start-time="item.start_time"
                   :end-time="item.end_time"></activity-card>

    <empty title="暂无待签到活动" v-if="activities && activities.length === 0"></empty>
    <separator value="这是底线" v-else-if="activities"></separator>

    <MyLoading :loading="load"></MyLoading>
  </div>
</template>

<script>
  import Separator from '../seperator/Separator'
  import formatter from '../../utils/index'
  import ActivityCard from '../../components/activityCard/ActivityCard'
  import Empty from '../../components/empty/Empty'
  import { categories } from '../../constants'

  export default {
    name: 'ActivityList',
    components: { Empty, ActivityCard, Separator },
    data () {
      return {
        category_id: null,
        activities: null
      }
    },
    computed: {
      load () {
        return this.$store.state.loading
      }
    },
    methods: {
      onLoad () {
        this.$store.commit('incLoading')
        this.activities = null
        this.$api.activityJoin.getHistory({
          openid: wx.getStorageSync('openid')
        }).then((res) => {
          this.activities = []
          if (res.data.length === 0) {
            this.$store.commit('decLoading')
            wx.stopPullDownRefresh()
            return
          }
          let delta = 0
          res.data.forEach((item) => {
            if (parseInt(item.status) === 2) {
              delta++
              if (this.activities.length + delta === res.data.length) {
                this.$store.commit('decLoading')
                wx.stopPullDownRefresh()
                this.activities.sort((a, b) => {
                  return new Date(a.start_time).getTime() < new Date(b.start_time).getTime()
                })
              }
              return
            }
            this.$api.activity.getInfo({
              id: item.activity_id
            }).then((res2) => {
              res2 = res2.data
              if (new Date().getTime() > new Date(res2.end_time).getTime() + 30 * 60 * 1000) {
                delta++
                if (this.activities.length + delta === res.data.length) {
                  this.activities.sort((a, b) => {
                    return new Date(a.start_time).getTime() < new Date(b.start_time).getTime()
                  })
                  this.$store.commit('decLoading')
                  wx.stopPullDownRefresh()
                }
                return
              }
              res2.start_time = formatter.formatDateTime(new Date(res2.start_time))
              res2.end_time = formatter.formatDateTime(new Date(res2.end_time))
              res2.category_id = categories[res2.category_id - 1]
              this.activities.push(res2)
              if (this.activities.length + delta === res.data.length) {
                this.$store.commit('decLoading')
                wx.stopPullDownRefresh()
                this.activities.sort((a, b) => {
                  return new Date(a.start_time).getTime() < new Date(b.start_time).getTime()
                })
              }
            })
          })
        })
      }
    },
    onLoad (e) {
      this.category_id = parseInt(e.id)
    },
    onShow () {
      this.onLoad()
    },
    onPullDownRefresh () {
      this.onLoad()
    }
  }
</script>

<style scoped lang="less">
</style>
