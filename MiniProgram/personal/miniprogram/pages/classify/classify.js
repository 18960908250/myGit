// pages/classify/classify.js
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    gridCol: 3,
    gridBorder: false,
    iconList: [
      { icon: 'edit',color: 'red', badge: 0, name: '记账', address: 'keepAccounts' },
      { icon: 'comment', color: 'orange', badge: 0, name: '聊天室', address: '' },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
