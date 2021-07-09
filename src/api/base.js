import login from '../utils/login'

const nodeApi = process.env.NODE_ENV || 'production'
const api = {
  development: 'http://localhost:7001/',
  mobile: 'http://192.168.137.1:7001/',
  production: 'https://www.szucsse.club:8443/',
  // production: 'https://www.ousing9.cn:8443/',
}

export default class Base {
  constructor () {
    this.apiUrl = api[nodeApi]
  }

  wxGet (url, data, flag = false) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method: 'GET',
        header: {
          'content-type': 'application/json; charset=utf-8',
          'authorization': `bearer ${wx.getStorageSync('token')}`
        },
        success: (res) => {
          const {statusCode} = res
          if (statusCode >= 200 && statusCode < 300) {
            resolve(res)
          } else if (!flag && statusCode === 401) {
            login().then(() => {
              return this.wxGet(url, data, true)
            }).then(resolve).catch(reject)
          } else {
            reject(res)
          }
        },
        fail: reject
      })
    })
  }

  wxPost (url, data, flag = false) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          'authorization': `bearer ${wx.getStorageSync('token')}`
        },
        success: (res) => {
          const {statusCode} = res
          if (statusCode >= 200 && statusCode < 300) {
            resolve(res)
          } else if (!flag && statusCode === 401) {
            login().then(() => {
              return this.wxPost(url, data, true)
            }).then(resolve).catch(reject)
          } else {
            reject(res)
          }
        },
        fail: reject
      })
    })
  }

  wxPut (url, data, flag = false) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method: 'PUT',
        header: {
          'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          'authorization': `bearer ${wx.getStorageSync('token')}`
        },
        success: (res) => {
          const {statusCode} = res
          if (statusCode >= 200 && statusCode < 300) {
            resolve(res)
          } else if (!flag && statusCode === 401) {
            login().then(() => {
              return this.wxPut(url, data, true)
            }).then(resolve).catch(reject)
          } else {
            reject(res)
          }
        },
        fail: reject
      })
    })
  }

  wxDelete (url, data, flag = false) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method: 'DELETE',
        header: {
          'content-type': 'application/json; charset=utf-8',
          'authorization': `bearer ${wx.getStorageSync('token')}`
        },
        success: (res) => {
          const {statusCode} = res
          if (statusCode >= 200 && statusCode < 300) {
            resolve(res)
          } else if (!flag && statusCode === 401) {
            login().then(() => {
              return this.wxDelete(url, data, true)
            }).then(resolve).catch(reject)
          } else {
            reject(res)
          }
        },
        fail: reject
      })
    })
  }
}
