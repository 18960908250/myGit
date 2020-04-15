//index.js
const app = getApp()

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  data: {
    swiperList: [
      {
        id: 0,
        type: 'image',
        url: 'cloud://dev-nwiao.6465-dev-nwiao-1301582346/test1.png'
      }, 
      {
      id: 1,
      type: 'image',
        url: 'cloud://dev-nwiao.6465-dev-nwiao-1301582346/test1.png',
      }
    ],
  },

  creade() {
    console.log(1)
  }
})