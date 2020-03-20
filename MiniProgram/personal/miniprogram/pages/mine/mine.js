const app = getApp()
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  data: {
    userInfo: {
      avatarUrl: '/images/user-unlogin.png',
      nickName: 'かねき',
    },
    giveReward: 'cloud://dev-nwiao.6465-dev-nwiao-1301582346/money.jpg'
  },
  created() {},
  lifetimes: {
    attached() {
      const { avatarUrl, nickName } = app.globalData.userInfo
      this.setData({
        userInfo: {
          avatarUrl,
          nickName
        }
      })
    },
    detached() {},
  },
  methods: {
    showQrcode() {
      wx.previewImage({
        urls: [this.data.giveReward],
        current: this.data.giveReward // 当前显示图片的http链接      
      })
    }
  }
})