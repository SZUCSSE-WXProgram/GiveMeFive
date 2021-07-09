import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      name: null,
      studentId: null,
      phone: null,
      className: null,
      admin: false,
      academic: false,
      developer: false,
      visitor: false,
    },
    openid: null,
    loading: 0
  },
  mutations: {
    setOpenId (state, openid) {
      this.state.openid = openid
    },
    setUserInfo (state, userInfo) {
      this.state.userInfo = userInfo
    },
    setVisitor (state, visitor) {
      this.state.visitor = visitor
    },
    setLoading (state, loading) {
      this.state.loading = loading
    },
    incLoading (state, autoDec = true) {
      this.state.loading++
      if (autoDec) {
        setTimeout(() => {
          this.commit('decLoading')
        }, 3000)
      }
    },
    decLoading (state) {
      this.state.loading--
      this.state.loading = this.state.loading > 0 ? this.state.loading : 0
    }
  }
})
