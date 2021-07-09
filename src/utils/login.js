import Vue from 'vue'

export default function login () {
  return new Promise((resolve, reject) => {
    let openid = null
    wx.login({
      success: (res) => {
        Vue.prototype.$api.user.getOpenid({
          code: res.code
        }).then((res2) => {
          openid = res2.data.openid
          wx.setStorageSync('openid', openid)
          Vue.prototype.$store.commit('setOpenId', openid)
          return Vue.prototype.$api.user.exist({
            openid
          })
        }).catch(error => {
          if (error.statusCode === 404) {
            // 未注册
            wx.redirectTo({
              url: '/pages/identity/main'
            })
            reject(error)
          }
        }).then(res2 => {
          if (res2.data) {
            // 已注册
            return Vue.prototype.$api.user.getToken({
              openid
            })
          }
        }).then(res2 => {
          const { token } = res2.data
          if (token) {
            wx.setStorageSync('token', token)
            return Vue.prototype.$api.user.get({
              openid
            })
          } else {
            reject(res2)
          }
        }).then(res2 => {
          // 已注册
          Vue.prototype.$store.commit('setUserInfo', {
            name: res2.data.name,
            studentId: res2.data.student_id,
            phone: res2.data.phone,
            className: res2.data.class_name,
            academic: parseInt(res2.data.academic),
            admin: parseInt(res2.data.admin) > 0,
            developer: parseInt(res2.data.developer) > 0
          })
          resolve()
        }).catch((error) => {
          console.log(error)
          reject(error)
        }).finally(() => {
          Vue.prototype.$store.commit('decLoading')
        })
      }
    })
  })
}
