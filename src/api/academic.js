import Base from './base'

export default class Academic extends Base {
  // 教师提交学业帮扶反馈
  addTeaLog (data) {
    return this.wxPost(`${this.apiUrl}academic/addTeaLog`, data)
  }

  // 学生提交学业帮扶反馈
  addStuLog (data) {
    return this.wxPost(`${this.apiUrl}academic/addStuLog`, data)
  }

  // 获取帮扶老师或学生的姓名
  getPeer (data) {
    return this.wxGet(`${this.apiUrl}academic/getPeer/${data.openid}`)
  }
}
