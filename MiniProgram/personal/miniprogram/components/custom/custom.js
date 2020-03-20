// components/custom/custom.js
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    bgColor: {
      type: String,
      value: ''
    },
    isBack: {
      type: Boolean,
      value: false
    },
    isCustom: {
      type: Boolean,
      value: false
    },
    backText: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: ''
    },
    bgImage: {
      type: String,
      value: ''
    }
  },
  data: {

  },
  methods: {

  }
})
