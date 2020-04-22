//index.js
const app = getApp()

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    swiperList: [
      { id: 0, type: 'image', url: 'cloud://dev-nwiao.6465-dev-nwiao-1301582346/banner2.jpg'}, 
      { id: 1, type: 'image', url: 'cloud://dev-nwiao.6465-dev-nwiao-1301582346/banner1.jpg',}
    ],
    gridCol: 4,
    gridBorder: false,
    iconList: [
      { icon: 'edit', color: 'blue', badge: 0, name: '记账', address: 'keepAccounts' },
      { icon: 'text', color: 'cyan', badge: 0, name: '账单记录', address: 'billList' },
      { icon: 'comment', color: 'green', badge: 0, name: '聊天室', address: '' },
    ],
    showDrawer: false,
    showLoadImage: true
  },
  lifetimes: {
    attached: function () {
      let timer = null
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.setData({ showLoadImage: false })
      }, 5000)
    }
  },
  methods: {
    showDrawerEvent() {
      this.setData({
        showDrawer: true
      })
    },
    hideDrawerEvent() {
      this.setData({
        showDrawer: false
      })
    }
  }
})