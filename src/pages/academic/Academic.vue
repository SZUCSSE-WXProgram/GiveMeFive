<template>
  <div>
    <span class="cell-group-title" style="font-size: large; font-weight: bold; color: black;">帮扶信息</span>
    <van-cell-group>
      <van-cell :title="academic === 1 ? '我的学生' : '我的老师'" :value="peer" icon="user-o"/>
      <van-field :value="info.date_str" disabled left-icon="notes-o" @click="showDate = true"
                 placeholder="帮扶日期"></van-field>
    </van-cell-group>
    <div style="height: 0.5rem;"></div>

    <span class="cell-group-title" style="font-size: large; font-weight: bold; color: black;">帮扶方式</span>
    <van-radio-group :value="info.type">
      <van-cell-group>
        <van-cell v-for="(item, index) in types" :key="index" :title="item.name" clickable :data-name="item.id"
                  @click="onClick">
          <van-radio :name="item.id"></van-radio>
        </van-cell>

      </van-cell-group>
    </van-radio-group>
    <div style="height: 0.5rem;"></div>

    <div v-if="academic === 2">
      <span class="cell-group-title" style="font-size: large; font-weight: bold; color: black;">所学所获所感所想</span>
      <van-cell-group>
        <van-cell>
          <textarea v-model="info.stu_desc" placeholder="请输入相关描述" v-if="!showDate && !hideTextarea"></textarea>
        </van-cell>
      </van-cell-group>
      <div style="height: 0.5rem;"></div>
    </div>

    <div v-if="academic === 1">
      <span class="cell-group-title" style="font-size: large; font-weight: bold; color: black;">学业帮扶开展情况及变化</span>
      <van-cell-group>
        <van-cell>
          <textarea v-model="info.tea_desc1" placeholder="请输入相关描述" v-if="!showDate && !hideTextarea"></textarea>
        </van-cell>
      </van-cell-group>
      <div style="height: 0.5rem;"></div>

      <span class="cell-group-title" style="font-size: large; font-weight: bold; color: black;">辅导学生过程发现该生其他问题及变化</span>
      <van-cell-group>
        <van-cell>
          <textarea v-model="info.tea_desc2" placeholder="请输入相关描述" v-if="!showDate && !hideTextarea"></textarea>
        </van-cell>
      </van-cell-group>
      <div style="height: 0.5rem;"></div>
    </div>

    <span class="cell-group-title" style="font-size: large; font-weight: bold; color: black;">意见与建议</span>
    <van-cell-group>
      <van-cell>
        <textarea v-model="info.suggestion" placeholder="请输入您的意见与建议" v-if="!showDate && !hideTextarea"></textarea>
      </van-cell>
    </van-cell-group>
    <div style="height: 0.5rem;"></div>

    <div style="width: 90%; margin: 1rem auto;">
      <van-button size="large" type="primary" :loading="loading" @click="onSubmit"
                  :disabled="buttonDisable || loading">
        提交
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

    <van-notify id="van-notify"/>
    <van-dialog id="van-dialog"/>
    <van-popup :show="load" :close-on-click-overlay="false" :z-index="1000000"
               custom-style="background-color: transparent">
      <van-loading type="spinner" color="#fff"></van-loading>
    </van-popup>
  </div>
</template>

<script>
  import Notify from '../../../static/vant/notify/notify'
  import Dialog from '../../../static/vant/dialog/dialog'
  import formatter from '../../utils/index'

  export default {
    name: 'Academic',
    data () {
      return {
        hideTextarea: false,
        showDate: false,
        minDate: new Date(new Date().getFullYear() - 1, 1, 1).getTime(),
        currentDate: new Date().getTime(),
        maxDate: new Date(new Date().getFullYear() + 1, 1, 1).getTime(),
        types: [
          {
            id: 1,
            name: '线上'
          },
          {
            id: 2,
            name: '线下'
          }
        ],
        buttonDisable: false,
        peer: null,
        info: {
          date_str: null,
          type: null,
          type_str: null,
          stu_desc: null,
          tea_desc1: null,
          tea_desc2: null,
          suggestion: null
        },
        loading: false
      }
    },
    computed: {
      load () {
        return this.$store.state.loading
      },
      academic () {
        return this.$store.state.userInfo.academic
      },
    },
    methods: {
      validate () {
        if (!this.info.date_str) {
          Notify('请输入帮扶日期')
          return false
        } else if (!this.info.type) {
          Notify('请选择帮扶方式')
          return false
        } else if ((!this.info.stu_desc || this.info.stu_desc.trim() === '') && this.academic === 2) {
          Notify('请输入所学所获所感所想')
          return false
        } else if ((!this.info.tea_desc1 || this.info.tea_desc1.trim() === '') && this.academic === 1) {
          Notify('请输入学业帮扶开展情况及变化')
          return false
        }
        return true
      },
      onConfirmDate (event) {
        this.info.date = new Date(event.mp.detail)
        this.info.date_str = formatter.formatDate(this.info.date)
        this.showDate = false
      },
      onClick (event) {
        this.info.type = parseInt(event.currentTarget.dataset.name)
        if (parseInt(event.currentTarget.dataset.name) === 1) {
          this.info.type_str = '线上'
        } else if (parseInt(event.currentTarget.dataset.name) === 2) {
          this.info.type_str = '线下'
        }
      },
      onChangeDescription (event) {
        this.info.description = event.mp.detail
        console.log(event.mp.detail)
      },
      onClose (event) {
        this.showDate = false
      },
      onSubmit () {
        if (!this.validate()) {
          return
        }
        this.hideTextarea = true
        Dialog.confirm({
          message: '确定提交？'
        }).then(() => {
          this.loading = true
          if (this.$store.state.userInfo.academic === 1) {
            this.$api.academic.addTeaLog({
              name: this.$store.state.userInfo.name,
              cardID: this.$store.state.userInfo.studentId,
              date: this.info.date_str,
              type: this.info.type_str,
              tea_desc1: this.info.tea_desc1,
              tea_desc2: this.info.tea_desc2,
              suggestion: this.info.suggestion
            }).then((res) => {
              this.loading = false
              Dialog.alert({
                message: '提交成功'
              }).then(() => {
                this.clear()
                wx.navigateBack()
              })
            }).catch(() => {
              this.loading = false
              Dialog.alert({
                message: '提交失败，请重试'
              }).then(() => {
              })
            })
          } else {
            this.$api.academic.addStuLog({
              name: this.$store.state.userInfo.name,
              cardID: this.$store.state.userInfo.studentId,
              date: this.info.date_str,
              type: this.info.type_str,
              stu_desc: this.info.stu_desc,
              suggestion: this.info.suggestion
            }).then((res) => {
              this.loading = false
              Dialog.alert({
                message: '提交成功'
              }).then(() => {
                this.clear()
                wx.navigateBack()
              })
            }).catch(() => {
              this.loading = false
              Dialog.alert({
                message: '提交失败，请重试'
              }).then(() => {
              })
            })
          }
          this.hideTextarea = false
        }).catch(() => {
          this.hideTextarea = false
        })
      },
      clear () {
        this.info.date_str = null
        this.info.type = null
        this.info.type_str = null
        this.info.stu_desc = null
        this.info.tea_desc1 = null
        this.info.tea_desc2 = null
        this.info.suggestion = null
      },
    },
    onLoad (e) {
      this.$api.academic.getPeer({
        openid: wx.getStorageSync('openid')
      }).then(res => {
        this.peer = res.data.peer
      }).catch(error => {
        this.peer = '暂无数据'
        console.error(error)
      })
    }
  }
</script>

<style scoped lang="less">
</style>
