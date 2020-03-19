// components/dialog/dialog.js
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    title: {
      type: String,
      value: 'title'
    },
    content: {
      type: String,
      value: 'content'
    },
    confirmText: {
      type: String,
      value: '确定'
    },
    cannleText: {
      type: String,
      value: '取消'
    }
  },
  data: {
    show: false
  },
  methods: {
    hideModal() {
      this.setData({
        show: false
      })
    },
    showModal() {
      this.setData({
        show: true
      })
    },
    confirm() {
      this.triggerEvent('confirm')
      this.hideModal()
    },
    cannle() {
      this.triggerEvent('cannle')
      this.hideModal()
    }
  }
})
