<template>
  <div>
    <span class="cell-group-title">活动信息</span>
    <van-cell-group>
      <van-field :value="info.name" left-icon="edit" placeholder="活动名称" @change="onChangeName"></van-field>
      <van-field :value="info.location" left-icon="location-o" placeholder="活动地点"
                 @change="onChangeLocation"></van-field>
      <van-field :value="info.teacher" left-icon="user-o" placeholder="负责人"
                 @change="onChangeTeacher"></van-field>
      <van-field :value="info.quota" left-icon="orders-o" placeholder="报名名额（如，100）"
                 @change="onChangeQuota"></van-field>
    </van-cell-group>
    <div style="height: 0.5rem;"></div>

    <span class="cell-group-title">活动描述</span>
    <van-cell-group>
      <van-cell>
        <textarea v-model="info.description" placeholder="请输入活动描述" v-if="!(showDate || showTime)"></textarea>
      </van-cell>
    </van-cell-group>
    <div style="height: 0.5rem;"></div>

    <span class="cell-group-title">活动时间</span>
    <van-cell-group>
      <van-field :value="info.date_str" disabled left-icon="notes-o" @click="showDate = true"
                 placeholder="活动日期"></van-field>
      <van-field :value="info.start_time_str" disabled left-icon="clock-o" @click="showTime = true, timeIndex = 0"
                 placeholder="开始时间"></van-field>
      <van-field :value="info.end_time_str" disabled left-icon="clock-o" @click="showTime = true, timeIndex = 1"
                 placeholder="结束时间"></van-field>
    </van-cell-group>
    <div style="height: 0.5rem;"></div>

    <span class="cell-group-title">活动类型</span>
    <van-radio-group :value="info.category_id">
      <van-cell-group>
        <van-cell v-for="(item, index) in types" :key="index" :title="item.name" clickable :data-name="item.id"
                  @click="onClick">
          <van-radio :name="item.id"></van-radio>
        </van-cell>

      </van-cell-group>
    </van-radio-group>
    <div style="height: 0.5rem;"></div>

    <div style="width: 90%; margin: 1rem auto;">
      <van-button v-if="!edit" size="large" type="primary" :loading="loading" @click="onSubmit"
                  :disabled="buttonDisable || loading">
        发布活动
      </van-button>
      <van-button v-else size="large" custom-class="van-button--blue" :loading="loading" @click="onEdit"
                  :disabled="buttonDisable || loading">
        修改
      </van-button>
    </div>

    <div style="width: 90%; margin: 1rem auto 0 auto;" v-if="edit">
      <van-button size="large" type="danger" :loading="loading" @click="onDelete" :disabled="buttonDisable || loading">
        删除
      </van-button>
    </div>

    <div style="height: 1rem;"></div>


    <van-popup
      :show="showDate"
      position="bottom"
      @click-overlay="onClose"
      @close="onClose">
      <van-datetime-picker
        type="date"
        :value="currentDate"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="onClose"
        @confirm="onConfirmDate"
      />
    </van-popup>
    <van-popup
      :show="showTime"
      position="bottom"
      @click-overlay="onClose"
      @close="onClose"
    >
      <van-picker :columns="timeList" show-toolbar title="选择时间" @confirm="onConfirmTime" @cancel="onClose"/>
    </van-popup>

    <van-notify id="van-notify"/>
    <van-dialog id="van-dialog"/>

    <MyLoading :loading="load"></MyLoading>
  </div>
</template>

<script>
  import Notify from '../../../static/vant/notify/notify'
  import Dialog from '../../../static/vant/dialog/dialog'

  import { categories } from '../../constants'
  import { formatDate, formatDateTime, formatNumber, formatTime } from '../../utils'

  export default {
    name: 'ActivityAdd',
    data () {
      return {
        currentDate: new Date().getTime(),
        minDate: new Date().getTime(),
        maxDate: new Date(new Date().getFullYear() + 1, 1, 1).getTime(),
        types: [
          {
            id: 1,
            name: categories[0]
          },
          {
            id: 2,
            name: categories[1]
          },
          {
            id: 3,
            name: categories[2]
          },
          {
            id: 4,
            name: categories[3]
          },
          {
            id: 5,
            name: categories[4]
          }
        ],
        buttonDisable: false,
        timeIndex: 0,
        showDate: false,
        showTime: false,
        info: {
          id: null,
          name: null,
          teacher: null,
          location: null,
          quota: null,
          date: null,
          date_str: null,
          start_time: null,
          start_time_str: null,
          end_time: null,
          end_time_str: null,
          description: null,
          category_id: 1
        },
        timeList: [
          {
            values: null,
            className: 'column1',
            defaultIndex: 6
          },
          {
            values: ['00', '15', '30', '45'],
            className: 'column2'
          }
        ],
        loading: false,
        edit: false
      }
    },
    computed: {
      load () {
        return this.$store.state.loading
      }
    },
    methods: {
      validate () {
        if (!this.info.name) {
          Notify('请输入活动名称')
          return false
        } else if (!this.info.location) {
          Notify('请输入活动地点')
          return false
        } else if (!this.info.teacher) {
          Notify('请输入负责人')
          return false
        } else if (!this.info.quota) {
          Notify('请输入报名名额')
          return false
        } else if (!this.info.description) {
          Notify('请输入活动描述')
          return false
        } else if (!this.info.start_time_str) {
          Notify('请输入活动开始时间')
          return false
        } else if (!this.info.end_time_str) {
          Notify('请输入活动结束时间')
          return false
        } else if (this.info.start_time > this.info.end_time) {
          Notify('开始时间不得大于结束时间')
        }
        return true
      },
      onClick (event) {
        this.info.category_id = parseInt(event.currentTarget.dataset.name)
      },
      onChangeName (event) {
        this.info.name = event.mp.detail
      },
      onChangeLocation (event) {
        this.info.location = event.mp.detail
      },
      onChangeTeacher (event) {
        this.info.teacher = event.mp.detail
      },
      onChangeQuota (event) {
        this.info.quota = event.mp.detail
      },
      onChangeDescription (event) {
        this.info.description = event.mp.detail
      },
      onConfirmDate (event) {
        this.info.date = new Date(event.mp.detail)
        this.info.date_str = formatDate(this.info.date)
        this.showDate = false
      },
      onConfirmTime (event) {
        if (this.timeIndex === 0) {
          this.info.start_time = new Date()
          this.info.start_time.setHours(parseInt(event.mp.detail.value[0]))
          this.info.start_time.setMinutes(parseInt(event.mp.detail.value[1]))
          this.info.start_time.setSeconds(0)
          this.info.start_time_str = formatTime(this.info.start_time)
        } else {
          this.info.end_time = new Date()
          this.info.end_time.setHours(parseInt(event.mp.detail.value[0]))
          this.info.end_time.setMinutes(parseInt(event.mp.detail.value[1]))
          this.info.end_time.setSeconds(0)
          this.info.end_time_str = formatTime(this.info.end_time)
        }

        this.showTime = false
      },
      onClose (event) {
        this.showDate = false
        this.showTime = false
      },
      onSubmit () {
        if (!this.validate()) {
          return
        }
        Dialog.confirm({
          message: '确定要发布活动吗？'
        }).then(() => {
          this.loading = true
          let startTime = this.info.start_time
          let endTime = this.info.end_time
          startTime.setFullYear(this.info.date.getFullYear())
          startTime.setMonth(this.info.date.getMonth())
          startTime.setDate(this.info.date.getDate())
          endTime.setFullYear(this.info.date.getFullYear())
          endTime.setMonth(this.info.date.getMonth())
          endTime.setDate(this.info.date.getDate())
          this.$api.activity.add({
            category_id: this.info.category_id,
            name: this.info.name,
            teacher: this.info.teacher,
            quota: this.info.quota,
            start_time: formatDateTime(startTime),
            end_time: formatDateTime(endTime),
            location: this.info.location,
            description: this.info.description
          }).then((res) => {
            this.loading = false
            Dialog.alert({
              message: '发布活动成功'
            }).then(() => {
              wx.navigateBack()
            })
          }).catch(() => {
            this.loading = false
            Dialog.alert({
              message: '发布活动失败，请重试'
            })
          })
        })
      },
      onEdit () {
        if (!this.validate()) {
          return
        }

        Dialog.confirm({
          message: '确定要修改吗？'
        }).then(() => {
          this.loading = true
          let startTime = this.info.start_time
          let endTime = this.info.end_time
          startTime.setFullYear(this.info.date.getFullYear())
          startTime.setMonth(this.info.date.getMonth())
          startTime.setDate(this.info.date.getDate())
          endTime.setFullYear(this.info.date.getFullYear())
          endTime.setMonth(this.info.date.getMonth())
          endTime.setDate(this.info.date.getDate())
          this.$api.activity.update({
            id: this.id,
            category_id: this.info.category_id,
            name: this.info.name,
            teacher: this.info.teacher,
            quota: this.info.quota,
            start_time: formatDateTime(startTime),
            end_time: formatDateTime(endTime),
            location: this.info.location,
            description: this.info.description
          }).then((res) => {
            this.loading = false
            Dialog.alert({
              message: '修改成功'
            }).then(() => {
              wx.navigateBack()
            })
          }).catch(() => {
            this.loading = false
            Dialog.alert({
              message: '修改失败，请重试'
            })
          })
        })
      },
      onDelete () {
        Dialog.confirm({
          message: '确定要删除吗？'
        }).then(() => {
          this.loading = true

          this.$api.activity.remove({
            id: this.id
          }).then((res) => {
            console.log(res)
            this.loading = false
            Dialog.alert({
              message: '删除成功'
            }).then(() => {
              wx.navigateBack({
                delta: 2
              })
            })
          }).catch(() => {
            this.loading = false
            Dialog.alert({
              message: '删除失败，请重试'
            })
          })
        })
      }
    },
    onLoad (e) {
      this.timeList[0].values = []
      for (let i = 6; i < 24; i++) {
        this.timeList[0].values.push(formatNumber(i))
      }
      if (!e.edit) {
        this.info.name = null
        this.info.teacher = null
        this.info.quota = null
        this.info.date = null
        this.info.date_str = null
        this.info.start_time = null
        this.info.start_time_str = null
        this.info.end_time = null
        this.info.end_time_str = null
        this.info.location = null
        this.info.description = null
        this.edit = false
        return
      }
      this.$store.commit('incLoading')
      this.edit = true
      this.id = e.id

      this.$api.activity.getInfo({
        id: this.id
      }).then((res) => {
        this.info.name = res.data.name
        this.info.teacher = res.data.teacher
        this.info.quota = res.data.quota
        this.info.start_time = new Date(res.data.start_time)
        this.info.end_time = new Date(res.data.end_time)
        this.info.date = this.info.start_time
        this.info.date_str = formatDate(this.info.date)
        this.info.start_time_str = formatTime(this.info.start_time)
        this.info.end_time_str = formatTime(this.info.end_time)
        this.info.location = res.data.location
        this.info.description = res.data.description
        this.info.category_id = parseInt(res.data.category_id)

        this.$store.commit('decLoading')
      })
    }
  }
</script>

<style scoped lang="less">
</style>
