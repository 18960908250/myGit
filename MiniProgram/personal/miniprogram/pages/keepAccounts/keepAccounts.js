// miniprogram/pages/keepAccounts/keepAccounts.js
const { formatTime } = require('../../utils/util.js')
Page({
  data: {
    date: 0,
    time: 0,
    consumptionIndex: null,
    consumptionList: [],
    payTypeArray: [],
    multiArray: [],
    multiIndexList: [0,0],
    region: ['福建省', '福州市', '晋安区'],
    sendData: {
      shoppingName: '',
      consumptionType: 0,
      date: 0,
      payType: 0,
      region: [],
      postcode: 0
    }
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
    this.setData({
      date: new Date().Format('yyyy-MM-dd'),
      'sendData.date': new Date().getTime(),
       time: new Date().Format('hh:mm')
    })
    this.getPayTypeArray()
    this.getConsumptionList()
  },
  getPayTypeArray() {
    wx.cloud.callFunction({
      name: 'queryPayType',
      data: {},
      success: res => {
        this.setData({ payTypeArray: res.result })
        this.setData({
          multiArray: [this.data.payTypeArray, this.data.payTypeArray[0].children]
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  getConsumptionList() {
    wx.cloud.callFunction({
      name: 'queryConsumption',
      data: {},
      success: res => {
        this.setData({ consumptionList: res.result })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  getShoppingName(e) {
    this.setData({
      'sendData.shoppingName': e.detail.value
    })
  },
  consumptionChange(e) {
    console.log(e);
    this.setData({
      consumptionIndex: e.detail.value,
      'sendData.consumptionType': this.data.consumptionList[e.detail.value].id
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value,
      'sendData.date': new Date(e.detail.value).getTime()
    })
  },
  MultiChange(e) {
    const { multiArray, multiIndexList } = this.data
    this.setData({
      multiIndexList: e.detail.value,
      'sendData.payType': multiArray[1][multiIndexList[1]].id
    })
  },
  RegionChange(e) {
    console.log(e)
    this.setData({
      region: e.detail.value,
      'sendData.region': e.detail.value,
      'sendData.postcode': e.detail.postcode
    })
  },
  MultiColumnChange(e) {
    const { multiArray, multiIndexList } = this.data
    let data = {
      multiArray: multiArray,
      multiIndexList: multiIndexList
    };
    const { column, value } = e.detail
    data.multiIndexList[column] = value;
    if (column === 0) {
      data.multiArray[1] = this.data.payTypeArray[value].children
    }
    this.setData(data)
  },
  save() {
    wx.cloud.callFunction({
      name: 'saveBill',
      data: this.data.sendData,
      success: res => {
        this.setData({ consumptionList: res.result })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  }
})