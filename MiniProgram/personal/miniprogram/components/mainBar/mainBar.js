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
      default: 'index'
    }
  },
  data: {
    isIphoneX: false
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        isIphoneX: app.globalData.isIphoneX
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  created() {},
  methods: {
    goto(e) {
      const name = e.target.dataset.name
      wx.navigateTo({
        url: `/pages/${name}/${name}`
      })
    }
  }
})
