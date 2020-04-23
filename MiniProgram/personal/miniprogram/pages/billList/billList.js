// miniprogram/pages/billList/billList.js
const {cloudRequest} = require('../../utils/util.js')
Page({
  data: {
    sendData: {
      pageSize: 10,
      pageNum: 0,
      dateTime: new Date().getTime()
    },
    total: 0,
    billList: [],
    TabCur: 0,
    tabList: ['清单列表', '图表']
  },
  onLoad: function(options) {},
  onReady: function() {
    this.getBillList()
  },
  onShow: function() {},
  onHide: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  getBillList() {
    cloudRequest({
      name: 'queryBillList',
      data: this.data.sendData
    }).then(res => {
      const { pageNum, pageSize, total, list } = res.result
      const billList = list.map(item => {
        item.date = new Date(item.date).Format('yyyy-MM-dd')
        item.money = parseFloat(item.money).toFixed(2)
        return item
      })
      this.setData({
        billList,
        total,
        'sendData.pageNum': pageNum,
        'sendData.pageSize': pageSize
      })
      console.log(res)
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  }
})