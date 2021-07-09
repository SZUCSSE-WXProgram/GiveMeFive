<template>
  <div>
    <div class="activity-header">
      <div class="activity-header-name">{{info.name}}</div>
      <img src="https://s2.ax1x.com/2019/09/07/n1D0cq.jpg" mode="widthFix">
    </div>
    <van-cell-group>
      <van-cell title="活动类别" title-width="30%" :value=info.category_id icon="apps-o"></van-cell>
      <van-cell title="负责人" title-width="30%" :value=info.teacher icon="user-o"></van-cell>
      <van-cell title="活动名额" title-width="30%" :value="info.participants + ' / ' + info.quota"
                icon="orders-o"></van-cell>
      <van-cell title="活动地点" title-width="30%" :value=info.location icon="location-o"></van-cell>
      <van-cell title="开始时间" title-width="30%" :value=info.start_time_str icon="clock-o"></van-cell>
      <van-cell title="结束时间" title-width="30%" :value=info.end_time_str icon="underway-o"></van-cell>
    </van-cell-group>


    <div class="cell-group-title">
      活动描述
    </div>
    <van-cell-group>
      <van-cell>
        <div style="text-align: left; color: #333;">
          <text>{{info.description}}</text>
        </div>
      </van-cell>
    </van-cell-group>

    <div style="width: 90%; margin: 1rem auto;">
      <van-button v-if="buttonType === ButtonType.APPLY" size="large" type="primary" @click="onApply">报名</van-button>
      <van-button v-else-if="buttonType === ButtonType.SIGN" size="large" type="primary" @click="onSign">请求签到
      </van-button>
      <van-button v-else-if="buttonType === ButtonType.SIGNING" size="large" type="primary" plain>等待签到确认</van-button>
      <van-button v-else-if="buttonType === ButtonType.SIGNED" size="large" type="primary">已签到</van-button>
      <van-button v-else-if="buttonType === ButtonType.SIGN_MANAGE" size="large" type="primary" @click="onSignManage">
        签到管理
      </van-button>
      <van-button v-else-if="buttonType === ButtonType.Ended" size="large">已结束</van-button>
      <van-button v-else-if="buttonType === ButtonType.JOINED" size="large" type="primary">已参加</van-button>
      <van-button v-else-if="buttonType === ButtonType.ENDED_UNSIGNED" size="large" type="danger">已结束（未签到）</van-button>
      <van-button v-else-if="buttonType === ButtonType.LOADING_PRIMARY" size="large" type="primary"
                  loading></van-button>
      <van-button v-else-if="buttonType === ButtonType.LOADING_DANGER" size="large" type="danger" loading></van-button>
      <van-button v-else-if="buttonType === ButtonType.FULL" size="large" type="warning">人数已满</van-button>
      <van-button v-else-if="buttonType === ButtonType.STOPPED" size="large" type="warning">已截止报名</van-button>
    </div>
    <div
      v-if="buttonType === ButtonType.CANCEL_APPLY || buttonType === ButtonType.SIGN || buttonType === ButtonType.SIGNING"
      style="width: 90%; margin: 1rem auto;">
      <van-button size="large" type="danger" @click="onCancel">取消报名</van-button>
    </div>

    <div v-if="admin" style="width: 90%; margin: 1rem auto 0 auto;">
      <van-button size="large" custom-class="van-button--blue" @click="onEdit"
                  :loading="buttonType === ButtonType.LOADING_PRIMARY">
        编辑
      </van-button>
    </div>

    <div style="width: 90%; margin: 1rem auto 0 auto;" v-if="!ended && admin">
      <van-button v-if="info.status === 0" size="large" type="primary" @click="onOpen"
                  :loading="buttonType === ButtonType.LOADING_PRIMARY">
        开放报名
      </van-button>
      <van-button v-else-if="info.status === 1" size="large" type="danger" @click="onStop"
                  :loading="buttonType === ButtonType.LOADING_PRIMARY">
        停止报名
      </van-button>
    </div>

    <div style="height: 1rem;"></div>

    <van-dialog id="van-dialog"/>

    <MyLoading :loading="load"></MyLoading>
  </div>
</template>

<script>
  import Dialog from '../../../static/vant/dialog/dialog'
  import formatter from '../../utils/index'
  import { categories } from '../../constants'

  const ButtonType = {
    APPLY: 0,
    CANCEL_APPLY: 1,
    SIGN: 2,
    SIGNING: 3,
    SIGNED: 4,
    SIGN_MANAGE: 5,
    ENDED: 6,
    JOINED: 7,
    ENDED_UNSIGNED: 8,
    LOADING_PRIMARY: 9,
    LOADING_DANGER: 10,
    FULL: 11,
    STOPPED: 12,
  }

  export default {
    name: 'Activity',
    data () {
      return {
        id: 0,
        buttonType: 9,
        ended: null,
        nameFontSize: 20,
        textareaHeight: 200,
        info: {
          category_id: null,
          name: null,
          teacher: null,
          participants: null,
          quota: null,
          status: null,
          location: null,
          start_time: null,
          start_time_str: null,
          end_time: null,
          end_time_str: null,
          description: null,
        },
        ButtonType: ButtonType,
      }
    },
    computed: {
      admin () {
        return this.$store.state.userInfo.admin
      },
      load () {
        return this.$store.state.loading
      },
    },
    methods: {
      onApply () {
        if (wx.getStorageSync('visitor')) {
          if (wx.getStorageSync('auth')) {
            Dialog.confirm({
              message: '尚未注册，是否注册？',
            }).then(() => {
              wx.redirectTo({
                url: '/pages/register/main',
              })
            })
          } else {
            Dialog.confirm({
              message: '尚未授权，请先授权',
            }).then(() => {
              wx.redirectTo({
                url: '/pages/authorize/main',
              })
            })
          }
          return
        }
        Dialog.confirm({
          message: '确认要报名吗？',
        }).then(() => {
          this.buttonType = ButtonType.LOADING_PRIMARY
          this.$api.activityJoin.add({
            activity_id: this.id,
            openid: wx.getStorageSync('openid'),
          }).then((res) => {
            switch (parseInt(res.data.code)) {
              case 2:
                Dialog.alert({
                  message: '人数已满，报名失败',
                })
                break
              case 3:
                Dialog.alert({
                  message: '已截止报名，报名失败',
                })
                break
            }
            this.onLoad()
          })
        })
      },
      onSign () {
        this.buttonType = ButtonType.LOADING_PRIMARY
        this.$api.activityJoin.sign({
          activity_id: this.id,
          openid: wx.getStorageSync('openid'),
          status: 0,
        }).then(this.onLoad)
      },
      onCancel () {
        Dialog.confirm({
          message: '确认要取消报名吗？',
        }).then(() => {
          this.buttonType = ButtonType.LOADING_DANGER
          this.$api.activityJoin.remove({
            activity_id: this.id,
            openid: wx.getStorageSync('openid'),
          }).then(this.onLoad)
        })
      },
      onSignManage () {
        wx.navigateTo({
          url: '/pages/activitySign/main?id=' + this.id,
        })
      },
      onOpen () {
        Dialog.confirm({
          message: '确认要开放报名吗？',
        }).then(() => {
          this.$api.activity.updateStatus({
            id: this.id,
            status: 1,
          }).then(this.onLoad)
        })
      },
      onStop () {
        Dialog.confirm({
          message: '确认要停止报名吗？',
        }).then(() => {
          this.$api.activity.updateStatus({
            id: this.id,
            status: 0,
          }).then(this.onLoad)
        })
      },
      onLoad () {
        this.$store.commit('incLoading')
        this.buttonType = ButtonType.LOADING_PRIMARY

        this.$api.activity.getInfo({
          id: this.id,
        }).then((res) => {
          this.info.name = res.data.name
          this.info.teacher = res.data.teacher
          this.info.participants = res.data.participants
          this.info.quota = res.data.quota
          this.info.status = parseInt(res.data.status)
          this.info.location = res.data.location
          this.info.description = res.data.description
          this.info.start_time = new Date(res.data.start_time)
          this.info.end_time = new Date(res.data.end_time)
          this.info.start_time_str = formatter.formatDateTime(this.info.start_time)
          this.info.end_time_str = formatter.formatDateTime(this.info.end_time)
          this.info.category_id = categories[res.data.category_id - 1]

          let time = new Date()
          this.ended = time > this.info.end_time

          if (this.admin) {
            // 管理员
            this.buttonType = ButtonType.SIGN_MANAGE
          } else if (wx.getStorageSync('visitor')) {
            this.buttonType = ButtonType.APPLY
          } else {
            // 普通用户
            this.$api.activityJoin.get({
              activity_id: this.id,
              openid: wx.getStorageSync('openid'),
            }).then((res2) => {
              // 已报名
              res2.data.status = parseInt(res2.data.status)
              if (time.getTime() < (this.info.start_time.getTime() - 30 * 60 * 1000)) {
                // 取消报名
                this.buttonType = ButtonType.CANCEL_APPLY
              } else if (res2.data.status === 0 && time.getTime() > this.info.end_time.getTime() && this.info.status !== 2) {
                // 等待签到确认
                this.buttonType = ButtonType.SIGNING
              } else if (res2.data.status === 2 && time.getTime() > this.info.end_time.getTime()) {
                // 已参加
                this.buttonType = ButtonType.JOINED
              } else if (time.getTime() < (this.info.end_time.getTime() + 30 * 60 * 1000)) {
                switch (res2.data.status) {
                  case 0:
                    // 等待签到确认
                    this.buttonType = ButtonType.SIGNING
                    break
                  case 1:
                    // 请求签到
                    this.buttonType = ButtonType.SIGN
                    break
                  case 2:
                    // 已签到
                    this.buttonType = ButtonType.SIGNED
                    break
                }
              } else {
                // 已结束（未签到）
                this.buttonType = ButtonType.ENDED_UNSIGNED
              }
            }).catch(() => {
              // 未报名
              if (this.ended) {
                // 已结束
                this.buttonType = ButtonType.ENDED
              } else if (this.info.status === 0) {
                // 已截止报名
                this.buttonType = ButtonType.STOPPED
              } else if (parseInt(this.info.participants) < parseInt(this.info.quota)) {
                // 报名
                this.buttonType = ButtonType.APPLY
              } else {
                // 人数已满
                this.buttonType = ButtonType.FULL
              }
            })
          }

          this.$store.commit('decLoading')
          wx.stopPullDownRefresh()
        }).catch(() => {
          wx.navigateBack()
        })
      },
      onEdit () {
        wx.navigateTo({
          url: '/pages/activityAdd/main?edit=true&id=' + this.id,
        })
      },
    },
    onLoad (e) {
      this.id = e.id
    },
    onShow () {
      this.onLoad()
    },
    onPullDownRefresh () {
      this.onLoad()
    },
    onShareAppMessage (res) {
      return {
        title: this.info.name,
      }
    },
  }
</script>

<style scoped lang="less">
  .activity-header {
    width: 100%;
    height: 4rem;
    overflow: hidden;
    position: relative;
    text-align: center;

    img {
      top: 50%;
      left: 0;
      width: 100%;
      position: absolute;
      transform: translateY(-50%);
    }

    &-name {
      top: 0;
      left: 50%;
      line-height: 4rem;
      position: absolute;
      white-space: nowrap;
      transform: translateX(-50%);
      font-size: 20px;
      z-index: 99;
      color: #fff;
    }
  }

  .cell-group-title {
    padding: 10px 15px 5px 0;
  }
</style>
