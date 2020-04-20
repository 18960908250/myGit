//index.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    logged: false,
    tabIndex: 'index',
    CustomBar: app.globalData.CustomBar,
    showModal: false
  },

  onLoad: function() {
    if (!wx.cloud) {
      return
    }
    this.getSetting()
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
                app.globalData.userInfo = res.userInfo
                console.log(res.userInfo)
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
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] 调用成功')
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      },
      complete: () => {

      }
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
