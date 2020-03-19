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
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        } else {
          console.log('未授权')
          const dialogCompents = this.selectComponent('#dialogModel')
          console.log(dialogCompents)
          dialogCompents.showModal()
        }
      }
    })
  },
  changeIndex(e) {
    this.setData({
      tabIndex: e.detail.name
    })
  },
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
})
