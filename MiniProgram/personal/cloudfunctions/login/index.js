// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const userDate = {
    _id: wxContext.OPENID,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID
  }
  const {
    data
  } = await db.collection("user").where({
      openid: wxContext.OPENID
  }).get()
  if (data.length > 0) {
    return {
      openId: wxContext.OPENID,
      isLogin: true
    }
  } else {
    const res = await db.collection("user").add({
      data: userDate,
    })
    console.log(res)
    if(res.errMsg.indexOf('ok') !== -1) {
      return {
        ...res
      }
    } else {
      return {
        openId: wxContext.OPENID,
        isLogin: true
      }
    }
    
  }
}