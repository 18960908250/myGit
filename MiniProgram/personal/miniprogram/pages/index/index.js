//index.js
const app = getApp()
const { cloudRequest } = require('../../utils/util.js')
Page({
  data: {
    userInfo: {},
    logged: false,
    tabIndex: 'index',
    CustomBar: app.globalData.CustomBar,
    showModal: false
  },

  onLoad(opt) {
    if (opt.tabIndex) {
      this.setData(opt)
    }
    if (!wx.cloud) {
      return
    }
    this.getSetting()
  },
  onShareAppMessage: function () {
    let users = wx.getStorageSync('user');
    if (res.from === 'button') { }
    return {
      title: '转发',
      path: '/pages/index/index',
      success: function (res) { }
    }
  },
  changeIndex(e) {
    this.setData({
      tabIndex: e.detail.name
    })
  },
  getSetting() {
    // 获取用户信息
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = { ...res.userInfo}
                this.onGetOpenid()
              }
            })
            resolve()
          } else {
            const dialogCompents = this.selectComponent('#dialogModel')
            dialogCompents.showModal()
          }
        }
      })
    })
    
  },
  onGetOpenid: function() {
    // 调用云函数
    cloudRequest({
      name: 'login',
    }).then(res => {
      app.globalData.userInfo.openId = res.result.openId
    }).catch(e=> {
      console.error('[云函数] [login] 调用失败', err)
    })
  },
  nextConfirm(e) {
    const dialogCompents = this.selectComponent('#dialogModel')
    if (e.detail.e.detail.errMsg === 'getUserInfo:ok') {
      this.onGetOpenid()
    } else {
      wx.showModal({
        title: '提示',
        content: '您拒绝了授权将无法使用本程序，请重新授权',
        success(res) {
          if (res.confirm) {
            dialogCompents.showModal()
          } else if (res.cancel) {
            dialogCompents.showModal()
          }
        }
      })
    }
  }
})
