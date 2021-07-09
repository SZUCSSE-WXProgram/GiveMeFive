import Base from './base'

export default class Activity extends Base {
  // 获取每类活动的数量
  count () {
    return this.wxGet(`${this.apiUrl}activity/count`, {})
  }

  // 获取活动详细信息
  getInfo (data) {
    return this.wxGet(`${this.apiUrl}activity/getInfo/${data.id}`)
  }

  // 获取活动列表（根据category_id）
  getList (data) {
    return this.wxGet(`${this.apiUrl}activity/getList/${data.category_id}`)
  }

  // 获取所有活动
  getAll (data) {
    return this.wxGet(`${this.apiUrl}activity/getAll`, data)
  }

  // 发布活动
  add (data) {
    return this.wxPost(`${this.apiUrl}activity/add`, data)
  }

  // 修改活动
  update (data) {
    return this.wxPut(`${this.apiUrl}activity/update`, data)
  }

  // 删除活动
  remove (data) {
    return this.wxDelete(`${this.apiUrl}activity/remove/${data.id}`)
  }

  // 更新状态
  updateStatus (data) {
    return this.wxPut(`${this.apiUrl}activity/updateStatus`, data)
  }
}
