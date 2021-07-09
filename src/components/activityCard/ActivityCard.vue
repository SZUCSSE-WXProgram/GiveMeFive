<template>
  <div class="activity">
    <a :href="'/pages/activity/main?id=' + id">
      <div class="activity-header" :class="background">
        {{name}}
      </div>
      <div class="activity-body">
        <van-cell-group>
          <van-cell v-if="category" title="活动类别" :value="category" icon="apps-o"></van-cell>
          <van-cell title="负责人" title-width="5em" :value="teacher" icon="user-o"></van-cell>
          <van-cell title="活动名额" title-width="5em" :value="quota" icon="orders-o"></van-cell>
          <van-cell title="活动地点" title-width="5em" :value="location" icon="location-o"></van-cell>
          <van-cell title="开始时间" title-width="5em" :value="startTime" icon="clock-o"></van-cell>
          <van-cell title="结束时间" title-width="5em" :value="endTime" icon="underway-o"></van-cell>
        </van-cell-group>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'ActivityCard',
    props: {
      id: Number,
      name: String,
      category: {
        type: String,
        default: null
      },
      teacher: String,
      quota: Number,
      location: String,
      startTime: String,
      endTime: String
    },
    data () {
      return {
        background: 'linear-gradient-4'
      }
    },
    mounted () {
      this.background = 'linear-gradient-' + Math.floor(Math.random() * 30 + 1)
    }
  }
</script>

<style scoped lang="less">
  .activity {
    width: 90%;
    box-shadow: 0 0 10px #ccc;
    border-radius: 5px;
    margin: 0.5rem auto 1rem auto;
    overflow: hidden;

    &:last-child {
      margin: 0.5rem auto 0 auto;
    }

    &-header {
      height: 2.5rem;
      line-height: 2.5rem;
      text-align: center;
      color: #fff;
    }
  }
</style>
