// components/datePicker/datePicker.js
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {

  },
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth() + 1,
    value: [9999, date.getMonth()],
    show: false,
    dateText: '请选择日期',
    selectType: true
  },
  methods: {
    bindChange(e) {
      const val = e.detail.value
      this.setData({
        year: this.data.years[val[0]],
        month: this.data.months[val[1]]
      })
    },
    showPicker() {
      this.setData({
        show: true
      })
      this.triggerEvent('parentEvent', { show: this.data.show })
    },
    closePicker() {
      this.setData({
        show: false
      })
      this.triggerEvent('parentEvent', { show:this.data.show})
    },
    checkPicker() {
      const { startTime, endTime } = this.getRangTime(this.data.selectType)
      const dateText = this.data.selectType ? `${this.data.year}年${this.data.month}月` : `${this.data.year}年`
      this.setData({
        show: false,
        dateText
      })
      this.triggerEvent('parentEvent', { show: false, startTime, endTime })
    },
    getRangTime(type) {
      let startTime = 0
      let endTime = 0
      const { year,month } = this.data
      if(type) {
        if(month === 12) {
          startTime = new Date(year, month - 1)
          endTime = new Date(year + 1, 0, 0)
        } else {
          startTime = new Date(year, month -1)
          endTime = new Date(year, month, 0)
        }
      } else {
        startTime = new Date(year,0)
        endTime = new Date(year +1, 0,0)
      }
      return {
        startTime: startTime.getTime(),
        endTime: endTime.getTime()
      }
    },
    changeSwitch(e) {
      const {value} = e.detail
      this.setData({
        selectType: value
      })
    }
  }
})
