// miniprogram/pages/billList/billList.js
const {
  cloudRequest
} = require('../../utils/util.js')
Page({
  data: {
    sendData: {
      pageSize: 10,
      pageNum: 0,
      dateTime: new Date().getTime()
    }
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
      console.log(res)
    })
  }
})