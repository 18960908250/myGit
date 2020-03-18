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
      default: ''
    },
    isBack: {
      type: Boolean,
      default: true
    },
    isCustom: {
      type: Boolean,
      default: true
    },
    backText: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: ''
    }
  },
  data: {

  },
  methods: {

  }
})
