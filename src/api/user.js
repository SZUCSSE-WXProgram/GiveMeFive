import Base from './base'

export default class User extends Base {
  // 注册
  register (data) {
    return this.wxPost(`${this.apiUrl}user/register`, data)
  }

  // 判断用户是否存在（根据openid）
  exist (data) {
    return this.wxGet(`${this.apiUrl}user/exist/${data.openid}`)
  }

  // 获取用户信息（根据openid）
  get (data) {
    return this.wxGet(`${this.apiUrl}user/get/${data.openid}`)
  }

  // 获取openid
  getOpenid (data) {
    return this.wxGet(`${this.apiUrl}user/getOpenid/${data.code}`)
  }

  // 获取token
  getToken (data) {
    return this.wxGet(`${this.apiUrl}user/getTokenByOpenid/${data.openid}`)
  }

  // 获取openid
  getClassList (data) {
    return this.wxGet(`${this.apiUrl}user/getClassList`, data)
  }

  // 更新管理员权限
  updateAdmin (data) {
    return this.wxPut(`${this.apiUrl}user/updateAdmin`, data)
  }
}
