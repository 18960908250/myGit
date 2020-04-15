// components/mainBar.js
const app = getApp()
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabType: {
      type: String,
      value: 'index'
    }
  },
  data: {
    isIphoneX: app.globalData.isIphoneX,
    addBtnColor: 'bg-cyan'
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setBtnBg()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  created() {},
  methods: {
    setBtnBg() {
      let addBtnColor = ''
      switch (this.properties.tabType) {
        case 'index':
          addBtnColor = 'bg-cyan'
          break
        case 'mine':
          addBtnColor = 'bg-blue'
          break
        case 'classify':
          addBtnColor = 'bg-orange'
          break
        default:
          addBtnColor = 'bg-cyan'
      }
      this.setData({ addBtnColor })
    },
    goto(e) {
      const name = e.currentTarget.dataset.name
      if(name === 'shoppingCar') {
        this.showDialog('购物车')
        return
      }
      this.triggerEvent('changeIndex', {name})
      this.setBtnBg()
    },
    showDialog(name) {
      wx.showModal({
        title: '提示',
        content: `${name}还没做呢，表急`,
        success(res) {}
      })
    },
    navGoto(e) {
      const name = e.currentTarget.dataset.name
      wx.navigateTo({
        url: `/pages/${name}/${name}`
      })
    }
  }
})
