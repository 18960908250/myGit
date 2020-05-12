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
      { icon: 'text', color: 'yellow', badge: 0, name: '账单记录', address: 'billList' },
      { icon: 'comment', color: 'orange', badge: 0, name: '聊天室', address: 'chat' },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goto() {
      console.log(1)
    }
  }
})
