// miniprogram/pages/keepAccounts/keepAccounts.js
const { formatTime } = require('../../utils/util.js')
Page({
  data: {
    date: 0,
    time: 0,
    consumptionList: [{id: 0, name: '个人'}, {id: 1, name: '公共'}, {id: 2, name: 'baby'}],
    payTypeArray: [
      {
        name: '微信', 
        id: 1,
        children: [{ name: '零钱', id: 100 }, { name: '信用卡', id: 101 }, { name: '银行卡', id: 102 }]
      },
      {
        name:'支付宝',
        id: 2,
        children: [{ name: '花呗', id: 200 }, { name: '信用卡', id: 201 }, { name: '银行卡', id: 302 }, { name: '余额宝/余额', id: 303}]
      },
      { name: '信用卡', id: 3, children: [{ name: '信用卡', id: 3 }]},
      { name: '银行卡', id: 4, children: [{ name: '银行卡', id: 4 }]},
      { name: '现金', id: 5, children: [{ name: '现金', id: 5 }]}
    ],
    multiArray: [],
    multiIndexList: [],
    region: ['福建省', '福州市', '晋安区'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onReady: function () {
    this.init()
  },
  init() {
    console.log('init')
    this.setData({
      date: new Date().Format('yyyy-MM-dd')
    })
    this.setData({
      time: new Date().Format('hh:mm')
    })
    this.setData({
      multiArray: [this.data.payTypeArray, this.data.payTypeArray[0].children]
    })
  },
  consumptionChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndexList: e.detail.value
    })
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  MultiColumnChange(e) {
    let data = {
      multiArray: this.data.multiArray,
      multiIndexList: this.data.multiIndexList
    };
    const { column, value } = e.detail
    data.multiIndexList[column] = value;
    if (column === 0) {
      data.multiArray[1] = this.data.payTypeArray[value].children
    }
    this.setData(data)
  }
})