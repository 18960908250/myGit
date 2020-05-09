const { cloudRequest } = require('../../utils/util.js')
const app = getApp()
const FATAL_REBUILD_TOLERANCE = 10
const SETDATA_SCROLL_TO_BOTTOM = {
  scrollTop: 100000,
  scrollWithAnimation: true,
}
Page({
  data: {
    chats: [],
    message: '',
    InputBottom: 0,
    groupId: 'demo',
    openId: ''
  },
  onLoad: function() {
    this.setData({
      openId: app.globalData.userInfo.openId
    })
    this.setPagePadding()
    this.init()
  },
  setPagePadding() {
    wx.getSystemInfo({
      success: res => {
        console.log('system info', res)
        if (res.safeArea) {
          const {
            top,
            bottom
          } = res.safeArea
          this.setData({
            containerStyle: `padding-top: ${(/ios/i.test(res.system) ? 10 : 20) + top}px; padding-bottom: ${20 + res.windowHeight - bottom}px`,
          })
        }
      },
    })
  },
  async init() {
    const { result } = await cloudRequest({
      name: 'queryMsgList',
      data: {
        groupId: this.data.groupId,
      }
    })
    const initList = result.list
    console.log('init query chats', initList)

    this.setData({
      chats: initList.reverse(),
      scrollTop: 10000,
    })
    this.initWatch(initList)
  },
  initWatch(list) {
    const db = wx.cloud.database()
    const _ = db.command
    const criteria = list.length ? {
      sendTimeTS: _.gt(list[list.length - 1].sendTimeTS),
    } : {}
    console.warn(`开始监听`, criteria)
    this.messageListener = db.collection('chatroom').where(this.mergeCommonCriteria(criteria)).watch({
      onChange: this.onRealtimeMessageSnapshot.bind(this),
      onError: e => {
        if (!this.inited || this.fatalRebuildCount >= FATAL_REBUILD_TOLERANCE) {
          this.showError(this.inited ? '监听错误，已断开' : '初始化监听失败', e, '重连', () => {
            this.initWatch(this.data.chats)
          })
        } else {
          this.initWatch(this.data.chats)
        }
      },
    })
  },
  onRealtimeMessageSnapshot(snapshot) {
    console.warn(`收到消息`, snapshot)
    if (snapshot.type === 'init') {
      this.setData({
        chats: [
          ...this.data.chats,
          ...[...snapshot.docs].sort((x, y) => x.sendTimeTS - y.sendTimeTS),
        ],
      })
      this.scrollToBottom()
      this.inited = true
    }else{
      let hasNewMessage = false
      let hasOthersMessage = false
      const chats = [...this.data.chats]
      for (const docChange of snapshot.docChanges) {
        switch (docChange.queueType) {
          case 'enqueue': {
            hasOthersMessage = docChange.doc._openid !== this.data.openId
            const ind = chats.findIndex(chat => chat._id === docChange.doc._id)
            if (ind > -1) {
              if (chats[ind].msgType === 'image' && chats[ind].tempFilePath) {
                chats.splice(ind, 1, {
                  ...docChange.doc,
                  tempFilePath: chats[ind].tempFilePath,
                })
              } else chats.splice(ind, 1, docChange.doc)
            } else {
              hasNewMessage = true
              chats.push(docChange.doc)
            }
            break
          }
        }
      }
      this.setData({
        chats: chats.sort((x, y) => x.sendTimeTS - y.sendTimeTS),
      })
      if (hasOthersMessage || hasNewMessage) {
        this.scrollToBottom()
      }
    }
  },
  mergeCommonCriteria(criteria) {
    return {
      groupId: this.data.groupId,
      ...criteria,
    }
  },
  sendMessage(e) {
    let textContent = e.detail.value ? e.detail.value : this.data.message
    cloudRequest({
      name: 'addNewMessage',
      data: {
        _id: `${Math.random()}_${Date.now()}`,
        groupId: this.data.groupId,
        avatar: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName,
        msgType: 'text',
        textContent,
        sendTime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        sendTimeTS: Date.now()
      }
    }).then(res=> {
      this.setData({
        message: ''
      })
    })
  },
  scrollToBottom(force) {
    if (force) {
      console.log('force scroll to bottom')
      this.setData(SETDATA_SCROLL_TO_BOTTOM)
      return
    }

    this.createSelectorQuery().select('.body').boundingClientRect(bodyRect => {
      this.createSelectorQuery().select(`.body`).scrollOffset(scroll => {
        if (scroll.scrollTop + bodyRect.height * 3 > scroll.scrollHeight) {
          console.log('should scroll to bottom')
          this.setData(SETDATA_SCROLL_TO_BOTTOM)
        }
      }).exec()
    }).exec()
  },
  setMessageValue(e) {
    this.setData({
      message: e.detail.value
    })
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  }
})