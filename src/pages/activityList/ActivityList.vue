<template>
  <div>
    <activity-card v-for="(item, i) in activities" :key="i" :id="item.id" :name="item.name"
                   :teacher="item.teacher" :quota="item.participants + ' / '+ item.quota" :location="item.location"
                   :start-time="item.start_time" :end-time="item.end_time"></activity-card>

    <empty title="暂无新活动" v-if="activities && activities.length === 0"></empty>
    <separator value="这是底线" v-else-if="activities"></separator>

    <MyLoading :loading="load"></MyLoading>
  </div>
</template>

<script>
  import Separator from '../seperator/Separator'
  import formatter from '../../utils/index'
  import ActivityCard from '../../components/activityCard/ActivityCard'
  import Empty from '../../components/empty/Empty'

  export default {
    name: 'ActivityList',
    components: {Empty, ActivityCard, Separator},
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
        this.activities = null
        this.$store.commit('incLoading')
        this.$api.activity.getList({
          category_id: this.category_id,
          per_page: 99,
          page: 1
        }).then((res) => {
          this.activities = res.data
          this.activities.forEach((item) => {
            item.start_time = formatter.formatDateTime(new Date(item.start_time))
            item.end_time = formatter.formatDateTime(new Date(item.end_time))
          })

          this.$store.commit('decLoading')
          wx.stopPullDownRefresh()
        })
      }
    },
    onLoad (e) {
      this.category_id = parseInt(e.id)
    },
    mounted () {
      this.onLoad()
    },
    onPullDownRefresh () {
      this.onLoad()
    }
  }
</script>

<style scoped lang="less">
</style>
