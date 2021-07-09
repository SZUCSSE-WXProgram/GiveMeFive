<template>
  <div>
    <div style="text-align: center; margin: 1rem 0">
      <img src="https://s2.ax1x.com/2019/09/07/n1DyHU.png" style="width: 10rem; height: 10rem"/>
    </div>
    <van-cell-group>
      <van-field
          :value="name"
          label="姓名"
          left-icon="contact"
          @change="onChangeUsername"
      />
      <van-field
          :value="studentId"
          :label="isTeacher ? '校园卡号' : '学号'"
          left-icon="edit"
          @change="onChangeStudentId"
      />
      <van-field
          v-if="!isTeacher"
          :value="phone"
          label="电话"
          left-icon="phone-o"
          @change="onChangePhone"
      />
      <van-field
          v-if="!isTeacher"
          :value="myClassName"
          label="班级"
          left-icon="friends-o"
          readonly
          @click="show = true"
      />
      <van-popup :show="show" position="bottom" @close="onClose" @click-overlay="onClose">
        <van-picker :columns="classList" @change="onClassChange" show-toolbar title="班级"
                    @confirm="onClassConfirm" @cancel="onClassCancel"/>
      </van-popup>
    </van-cell-group>

    <div style="width: 90%; margin: 1rem auto 0 auto;">
      <van-button size="large" type="primary" @click="onSubmit" :loading="loading" :disabled="loading">注册</van-button>
    </div>

    <van-notify id="van-notify"/>
    <van-dialog id="van-dialog"/>
  </div>
</template>

<script>
  import Notify from '../../../static/vant/notify/notify'
  import Dialog from '../../../static/vant/dialog/dialog'
  import { classList } from '../../constants'

  export default {
    name: 'register',
    data () {
      return {
        isTeacher: false,
        loading: false,
        show: false,
        name: '',
        studentId: null,
        myClassName: '本科2019级计算机科学与技术01',
        phone: null,
        classList: [
          {
            values: null,
            className: 'column1'
          },
          {
            values: null,
            className: 'column2'
          }
        ]
      }
    },
    methods: {
      onChangeUsername (e) {
        this.name = e.mp.detail
      },
      onChangeStudentId (e) {
        this.studentId = e.mp.detail
      },
      onChangePhone (e) {
        this.phone = e.mp.detail
      },
      onClassChange (e) {
        let picker = e.mp.detail.picker
        let value = e.mp.detail.value
        picker.setColumnValues(1, classList[value[0]])
        this.classList[1].values = classList[value[0]]
      },
      onClassConfirm (e) {
        const { value } = e.mp.detail
        this.myClassName = value.join('')
        this.classList[1].values = classList[value[0]]
        this.show = false
      },
      onClassCancel () {
        this.show = false
      },
      onClose () {
        this.show = false
      },
      onSubmit () {
        if (!this.name) {
          Notify('请输入姓名')
          return
        } else if (!this.studentId) {
          Notify('请输入学号')
          return
        } else if (!this.studentId.match(/^\d+$/)) {
          Notify('学号应为数字')
          return
        } else if (!this.isTeacher && !this.phone) {
          Notify('请输入手机号码')
          return
        } else if (!this.isTeacher && !this.phone.match(/^\d{11}$/)) {
          Notify('手机号码应为11位数字')
          return
        }
        Dialog.confirm({
          title: '确认',
          message: '提交后不可修改，请务必确认个人信息无误'
        }).then(() => {
          this.loading = true

          this.$api.user.register({
            openid: wx.getStorageSync('openid'),
            name: this.name,
            student_id: this.studentId,
            phone: this.phone,
            class_name: this.isTeacher ? '教师' : this.myClassName
          }).then((res) => {
            this.$store.commit('setUserInfo', {
              name: this.name,
              studentId: this.studentId,
              phone: this.phone,
              className: this.isTeacher ? '教师' : this.myClassName,
              admin: false,
              developer: false
            })
            wx.setStorageSync('visitor', false)
            Dialog.alert({
              message: '注册成功'
            }).then(() => {
              wx.reLaunch({
                url: '/pages/index/main'
              })
            })
          }).catch(error => {
            const { statusCode } = error
            let message = ''
            switch (statusCode) {
              case 400:
                message = '学号与他人重复'
                break
              case 422:
                message = '请完整填写表单'
                break
              case 500:
                message = '服务器错误'
                break
              default:
                message = `未知错误，错误代码：${statusCode}`
                break
            }
            Dialog.alert({
              message
            })
          }).finally(() => {
            this.loading = false
          })
        }).catch(() => {
        })
      }
    },
    mounted () {
      this.classList[0].values = Object.keys(classList)
      this.classList[1].values = classList[this.classList[0].values[0]]
    },
    onLoad (e) {
      console.log(e)
      this.isTeacher = parseInt(e.isTeacher) === 1
    },
  }
</script>

<style scoped lang="less">
</style>
