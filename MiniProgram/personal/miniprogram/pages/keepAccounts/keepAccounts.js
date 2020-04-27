// miniprogram/pages/keepAccounts/keepAccounts.js
const { cloudRequest } = require('../../utils/util.js')
Page({
  data: {
    date: 0,
    time: 0,
    consumptionIndex: null,
    consumptionList: [],
    categoriesIndex: null,
    categoriesList: [],
    payTypeArray: [],
    multiArray: [],
    multiIndexList: [0,0],
    region: ['福建省', '福州市', '晋安区'],
    sendData: {
      shoppingName: '',
      money: 0,
      consumptionType: null,
      costCategories: null,
      date: null,
      payType: null,
      province: '福建省',
      city: '福州市',
      district: '晋安区',
      postcode: 350011
    }
  },
  onLoad: function (options) {
    console.log(options)
    const { id } = options
    if(id) {
      this.setData({
        _id: id
      })
    }
  },
  onReady: function () {
    this.init()
  },
  init() {
    this.setData({
      date: new Date().Format('yyyy-MM-dd'),
      'sendData.date': new Date().getTime(),
       time: new Date().Format('hh:mm')
    })
    Promise.all([this.getPayTypeArray(),this.getConsumptionList(),this.getCategoriesList()]).then((result) => {
      if (this.data._id) this.getBillList()
    })
  },
  getBillList() {
    cloudRequest({
      name: 'queryBillList',
      data: { 
        _id: this.data._id,
        pageNum: 0,
        pageSize: 10,
        }
    }).then(res => {
      const data = res.result.list[0]
      const sendData = {
        shoppingName: data.shoppingName,
        money: data.money,
        consumptionType: data.consumptionType,
        costCategories: data.costCategories,
        date: data.date,
        payType: data.payType,
        province: data.province,
        city: data.city,
        district: data.district,
        postcode: data.postcode
      }
      let consumptionIndex = 0
      this.data.consumptionList.forEach((item, index) => {
        if (item.id === sendData.consumptionType) {
          consumptionIndex = index
        }
      })
      let categoriesIndex = 0
      this.data.categoriesList.forEach((item, index) => {
        if (item.id === sendData.costCategories) {
          categoriesIndex = index
        }
      })
      let multiIndexList = []
      this.data.payTypeArray.forEach((item, index) => {
        item.children.forEach((items, indexs) => {
          if (items.id === sendData.payType) {
            multiIndexList = [index, indexs]
          }
        })
      })
      this.setData({
        sendData: sendData,
        date: sendData.date,
        consumptionIndex,
        categoriesIndex,
        multiIndexList
      })
    })
  },
  getPayTypeArray() {
    return new Promise((resolve, reject) => {
      cloudRequest({
        name: 'queryPayType',
      }).then(res => {
        this.setData({ payTypeArray: res.result })
        this.setData({
          multiArray: [this.data.payTypeArray, this.data.payTypeArray[0].children],
          'sendData.payType': this.data.payTypeArray[0].children[0].id
        })
        resolve(res)
      })
    })
  },
  getConsumptionList() {
    return new Promise((resolve, reject) => {
      cloudRequest({ name: 'queryConsumption' }).then(res => {
        this.setData({ consumptionList: res.result })
        resolve(res)
      })
    })
  },
  getCategoriesList() {
    return new Promise((resolve, reject) => {
      cloudRequest({ name: 'queryCategories' }).then(res => {
        this.setData({ categoriesList: res.result })
        resolve(res)
      })
    })
  },
  getShoppingName(e) {
    this.setData({
      'sendData.shoppingName': e.detail.value
    })
  },
  setBindData(e) {
    this.setData({
      'sendData.money': parseFloat(e.detail.value)
    })
  },
  consumptionChange(e) {
    this.setData({
      consumptionIndex: e.detail.value,
      'sendData.consumptionType': this.data.consumptionList[e.detail.value].id
    })
  },
  categoriesChange(e) {
    this.setData({
      categoriesIndex: e.detail.value,
      'sendData.costCategories': this.data.categoriesList[e.detail.value].id
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
    this.setData({
      region: e.detail.value,
      'sendData.province': e.detail.value[0],
      'sendData.city': e.detail.value[1],
      'sendData.district': e.detail.value[2],
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
  verify(data) {
    const dictionaries = {
      shoppingName: '请输入消费名称',
      money: '请输入消费金额',
      costCategories: '请选择消费对象',
      consumptionType: '请选择消费类型',
    }
    const keyList = Object.keys(data)
    for(let i=0;i<keyList.length;i++) {
      const keys = keyList[i]
      if (!data[keys] && data[keys] !== 0) {
        wx.showToast({
          title: dictionaries[keys],
          icon: 'none',
          duration: 2000
        })
        return true
      }
    }
    return false
  },
  commit() {
    const data = this.data.sendData
    if (this.verify(data)) return
    if(this.data._id) {
      this.update()
    } else {
      this.save()
    }
  },
  save() {
    cloudRequest({ name: 'saveBill', data: this.data.sendData }).then(res => {
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
      wx.redirectTo({
        url: '/pages/index/index?tabIndex=classify'
      })
    })
  },
  update() {
    const data = {
      ...this.data.sendData,
      _id: this.data._id
    }
    cloudRequest({ name: 'updateBill', data }).then(res => {
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 2000
      })
      wx.redirectTo({
        url: '/pages/index/index?tabIndex=classify'
      })
    })
  }
})