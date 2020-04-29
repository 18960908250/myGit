// miniprogram/pages/billList/billList.js
const {cloudRequest} = require('../../utils/util.js')
import * as echarts from '../../ec-canvas/echarts';
Page({
  data: {
    sendData: {
      pageSize: 10,
      pageNum: 0,
      dateTime: new Date().getTime()
    },
    total: 0,
    isFinished: false,
    billList: [],
    month: new Date().getMonth() + 1,
    costCategories: '请选择类型',
    TabCur: 0,
    tabList: ['列表', '图表'],
    modelName: '',
    costCategoriesList: [{id: null, name: '全部'}],
    monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    charMonth: '',
    colorList: ['#1cbbb4', '#0081ff', '#8dc63f', '#0081ff', '#39b54a'],
    legendList: ['西凉', '益州', '兖州', '荆州', '幽州'],
    seriesList: [
      { value: 1548, name: '幽州', itemStyle: { color: '#1cbbb4' } },
      { value: 535, name: '荆州', itemStyle: { color: '#0081ff' } },
      { value: 510, name: '兖州', itemStyle: { color: '#8dc63f' } },
      { value: 634, name: '益州', itemStyle: { color: '#0081ff' } },
      { value: 735, name: '西凉', itemStyle: { color: '#39b54a' } }],
    sbutext: '',
    chatTitle: '',
    ec: {},
    showChart:true
  },
  onLoad: function(options) {},
  onReady: function() {
    this.getBillList()
    this.getCategories()
    this.queryChat()
  },
  onPullDownRefresh: function() {
    this.setData({
      sendData: {
        pageSize: 10,
        pageNum: 0,
        dateTime: new Date().getTime()
      }
    })
    this.getBillList()
    wx.stopPullDownRefresh();
  },
  onReachBottom: function() {
    if (!this.data.isFinished) {
      this.data.sendData.pageNum++
      this.getBillList()
    }
  },
  queryChat(startTime, endTime) {
    this.setData({
      showChart:false
    })
    let year = new Date().getFullYear()
    let month = new Date().getMonth()
    if(!startTime) {
      if (month === 11) {
        startTime = new Date(year, month).getTime()
        endTime = new Date(year + 1, 0, 0).getTime()
      } else {
        startTime = new Date(year, month).getTime()
        endTime = new Date(year, month + 1, 0).getTime()
      }
    }
    this.getAllBill(startTime, endTime).then(() => {
      this.setData({
        showChart: true,
        ec: {
          onInit: this.initChart
        }
      })
    })
  },
  getAllBill(startTime, endTime) {
    return new Promise((resolve, reject) => {
      const year = new Date(startTime).getFullYear()
      const month = new Date(startTime).getMonth() + 1
      const chatTitle = endTime - startTime > 2592000000 ? `${year}年花销统计` : `${month}月花销统计`
      cloudRequest({
        name: 'queryAllBill',
        data: {
          startTime,
          endTime
        }
      }).then(res => {
        const { sum, list } = res.result
        this.setData({
          legendList: list.map(item => item.name),
          seriesList: list.map((item, index) => {
            return { value: item.sumMoney, name: item.name, itemStyle: { color: this.data.colorList[index % 5] } }
          }),
          sbutext: `本月累计${sum}元`,
          chatTitle
        })
        resolve(res)
      })
    })
  },
  getCategories() {
    cloudRequest({
      name: 'queryCategories',
      data: {}
    }).then(res => {
      this.setData({
        costCategoriesList: this.data.costCategoriesList.concat(res.result)
      })
    })
  },
  getBillList() {
    cloudRequest({
      name: 'queryBillList',
      data: this.data.sendData
    }).then(res => {
      const { pageNum, pageSize, total, list } = res.result
      let billList = list.map(item => {
        item.date = new Date(item.date).Format('yyyy-MM-dd')
        item.money = parseFloat(item.money).toFixed(2)
        return item
      })
      if(pageNum > 0) {
        billList = this.data.billList.concat(billList)
      }
      this.setData({
        billList,
        total,
        'sendData.pageNum': pageNum,
        'sendData.pageSize': pageSize,
        isFinished: total <= ((pageNum + 1) * pageSize)
      })
      console.log(res)
    })
  },
  deleteBill(e) {
    const { id } = e.currentTarget.dataset
    cloudRequest({
      name: 'deleteBillById',
      data: { _id: id }
    }).then(res => {
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000
      })
      this.getBillList()
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
      'sendData.pageNum': 0,
      month: id + 1,
      'sendData.dateTime': new Date().setMonth(id),
    })
    this.getBillList()
    this.closeDrop()
  },
  selectCategories(e) {
    const { id, name } = e.currentTarget.dataset
    this.setData({
      'sendData.pageNum': 0,
      costCategories:name,
      'sendData.costCategories': id,
    })
    this.getBillList()
    this.closeDrop()
  },
  closeDrop() {
    this.setData({
      modelName: null,
    })
  },
  goUpdate(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/keepAccounts/keepAccounts?id=${id}`,
    })
  },
  pickerChangeMonth(e) {
    const { value } = e.detail
    this.setData({
      charMonth: parseInt(value)
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
  },
  pickShow(e) {
    this.setData({
      showChart: !e.detail.show
    })
    if(e.detail.startTime) {
      const { startTime, endTime } = e.detail
      this.queryChat(startTime, endTime)
    }
  },
  initChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // 像素
    });
    canvas.setChart(chart);

    var option = {
      title: { text: this.data.chatTitle, subtext: this.data.sbutext, left: 'center' },
      tooltip: { trigger: 'item' },
      legend: {
        bottom: 10,
        left: 'center',
        data: this.data.legendList
      },
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: this.data.seriesList,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    chart.setOption(option);
    return chart;
  }
})
