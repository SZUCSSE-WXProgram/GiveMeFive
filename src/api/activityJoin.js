import Base from './base'

export default class ActivityJoin extends Base {
  // 添加报名记录
  add (data) {
    return this.wxPost(`${this.apiUrl}activityJoin/add`, data)
  }

  // 获取报名信息（单个）
  get (data) {
    return this.wxGet(`${this.apiUrl}activityJoin/get`, data)
  }

  // 获取参加记录
  getHistory (data) {
    return this.wxGet(`${this.apiUrl}activityJoin/getHistory`, data)
  }

  // 获取签到列表
  getSignList (data) {
    return this.wxGet(`${this.apiUrl}activityJoin/getSignList/${data.activity_id}`)
  }

  // 请求签到
  sign (data) {
    return this.wxPut(`${this.apiUrl}activityJoin/sign`, data)
  }

  // 管理员更改签到状态
  update (data) {
    return this.wxPut(`${this.apiUrl}activityJoin/update`, data)
  }

  // 删除报名记录
  remove (data) {
    return this.wxDelete(`${this.apiUrl}activityJoin/remove`, data)
  }

  // 获取统计信息
  getStatistics (data) {
    return this.wxGet(`${this.apiUrl}activityJoin/getStatistics/${data.openid}`)
  }
}
