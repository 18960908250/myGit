const app = getApp()
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  data: {
    userInfo: {
      avatarUrl: '/images/user-unlogin.png',
      nickName: 'かねき'
    }
  },
  created() {},
  lifetimes: {
    attached() {
      console.log(app)
    },
    detached() {},
  },
})