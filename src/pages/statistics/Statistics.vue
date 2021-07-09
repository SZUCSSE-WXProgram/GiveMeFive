<template>
  <div>
    <div v-for="(item, i) in statistics" :key="i" class="card">
      <div class="card-head"></div>

      <div class="card-body">{{item.title}}</div>

      <div class="card-foot">
        <div>已参加 {{item.present}} / {{item.total}}</div>
        <div class="card-foot-progress">
          <div class="card-foot-progress-bar"
               :style="{width: (item.total ? (item.present / item.total * 100) : 0) + '%'}"></div>
        </div>

        <div class="card-foot-info">
          <div class="card-foot-info-div">
            <div class="card-foot-info-div-up">已报名</div>
            <div class="card-foot-info-div-down">{{item.present + item.absent}}</div>
          </div>
          <div class="card-foot-info-separator"></div>
          <div class="card-foot-info-div">
            <div class="card-foot-info-div-up">已参加</div>
            <div class="card-foot-info-div-down">{{item.present}}</div>
          </div>
          <div style="clear:both;"></div>
        </div>
      </div>
    </div>

    <MyLoading :loading="load"></MyLoading>
  </div>
</template>

<script>
  import { categories } from '../../constants'

  export default {
    name: 'Statistics',
    data () {
      return {
        statistics: [
          {
            id: 1,
            title: categories[0],
            total: 0,
            absent: 0,
            present: 0
          },
          {
            id: 2,
            title: categories[1],
            total: 0,
            absent: 0,
            present: 0
          },
          {
            id: 3,
            title: categories[2],
            total: 0,
            absent: 0,
            present: 0
          },
          {
            id: 4,
            title: categories[3],
            total: 0,
            absent: 0,
            present: 0
          },
          {
            id: 5,
            title: categories[4],
            total: 0,
            absent: 0,
            present: 0
          }
        ]
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
        this.statistics.forEach((item) => {
          item.total = 0
          item.absent = 0
          item.present = 0
        })
        this.$api.activityJoin.getStatistics({
          openid: wx.getStorageSync('openid')
        }).then((res) => {
          for (let i = 0; i < 5; i++) {
            this.statistics[i].total = res.data.total[i]
            this.statistics[i].absent = res.data.absent[i]
            this.statistics[i].present = res.data.present[i]
          }
          this.$store.commit('decLoading')
          wx.stopPullDownRefresh()
        })
      }
    },
    onLoad () {
      this.onLoad()
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
  @card: .card;

  @{card} {
    width: 90%;
    margin: 0.5rem auto 0.75rem auto;
    box-shadow: 0 0 10px #CCC;
    border-radius: 5px;
    position: relative;
    overflow: hidden;

    &-head {
      height: 2rem;
    }

    &-body {
      top: 2rem;
      left: 50%;
      width: 2.5rem;
      height: 1.25rem;
      line-height: 2.5rem;
      background-color: #fff;
      border-radius: 5rem 5rem 0 0;
      text-align: center;
      position: absolute;
      font-size: 30px;
      transform: translate(-50%, calc(-100% + 1px));
    }

    &-foot {
      height: 1.5rem;
      padding-top: 0.75rem;
      background-color: #fff;
      text-align: center;
      color: #666;

      &-progress {
        width: 90%;
        height: 25px;
        margin: 10px auto 15px auto;
        background-color: #eee;
        border-radius: 3px;
        position: relative;
        overflow: hidden;

        &-bar {
          height: 25px;
          border-radius: 3px;
          transition: width 1s ease-in-out;
        }
      }

      &-info {
        &-div {
          width: calc(50% - 1px);
          height: 100px;
          padding-top: 25px;
          background-color: #fff;
          box-sizing: border-box;
          float: left;

          &-up {
            line-height: 20px;
            font-size: 14px;
          }

          &-down {
            line-height: 30px;
            font-size: 20px;
          }
        }

        &-separator {
          width: 2px;
          height: 80px;
          margin: 10px 0;
          background-color: #eee;
          float: left;
        }
      }
    }

    &:nth-child(1) {
      @{card}-head, @{card}-foot-progress-bar {
        background: linear-gradient(to bottom right, #fddc98, #fd5a49)
      }

      @{card}-body, @{card}-foot-info-div-down {
        color: #fd5a49;
      }
    }

    &:nth-child(2) {
      @{card}-head, @{card}-foot-progress-bar {
        background: linear-gradient(to bottom right, #0af, #0e7);
      }

      @{card}-body, @{card}-foot-info-div-down {
        color: #0e7;
      }
    }

    &:nth-child(3) {
      @{card}-head, @{card}-foot-progress-bar {
        background: linear-gradient(to bottom right, #1bf, #d1f);
      }

      @{card}-body, @{card}-foot-info-div-down {
        color: #d1f;
      }
    }

    &:nth-child(4) {
      @{card}-head, @{card}-foot-progress-bar {
        background: linear-gradient(to bottom right, #fad, #6ce);
      }

      @{card}-body, @{card}-foot-info-div-down {
        color: #6ce;
      }
    }

    &:nth-child(5) {
      @{card}-head, @{card}-foot-progress-bar {
        background: linear-gradient(to bottom right, #fa2, #f09);
      }

      @{card}-body, @{card}-foot-info-div-down {
        color: #f09;
      }
    }
  }
</style>
