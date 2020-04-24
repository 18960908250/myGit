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
    month: new Date().getMonth() + 1,
    costCategories: '请选择类型',
    TabCur: 0,
    tabList: ['列表', '图表'],
    modelName: '',
    costCategoriesList: [],
    monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  },
  onLoad: function(options) {},
  onReady: function() {
    this.getBillList()
    this.getCategories()
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  getCategories() {
    cloudRequest({
      name: 'queryCategories',
      data: {}
    }).then(res => {
      this.setData({
        costCategoriesList: res.result
      })
    })
  },
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
  showMenu(e) {
    const { modelName } = e.currentTarget.dataset
    if (this.data.modelName !== modelName) {
      this.setData({ modelName })
    }else {
      this.setData({ modelName: null })
    }
  },
  selectMonth(e) {
    const { id } = e.currentTarget.dataset
    this.setData({
      month: id + 1,
      'sendData.dateTime': new Date().setMonth(id + 1),
      modelName: null,
    })
  },
  selectCategories(e) {
    const { id, name } = e.currentTarget.dataset
    this.setData({
      name,
      'sendData.costCategories': id,
      modelName: null,
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