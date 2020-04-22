// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const { pageSize, pageNum, dateTime, payType, costCategories, consumptionType } = event
  const { OPENID } = cloud.getWXContext()
  const { startTime, endTime } = getRange(dateTime)
  let queryOption = { 'userInfo.openId': OPENID }
  if (startTime) queryOption.date = _.and(_.gt(startTime), _.lt(endTime))
  if (payType) queryOption.payType = payType
  if (costCategories) queryOption.costCategories = costCategories
  if (consumptionType) queryOption.consumptionType = consumptionType
  const res = await db.collection('bill').where(queryOption).limit(pageSize).skip(pageNum * pageSize).get()

  return res.data
}

function getRange(dateTime) {
  if(!dateTime) return {}
  let year = new Date(dateTime).getFullYear()
  let month = new Date(dateTime).getMonth()
  if (month === 0) {
    month = 12;
    year = year - 1;
  }
  return {
    startTime: new Date(year, month).getTime(),
    endTime: new Date(year, month + 1 > 12 ? 1 : month + 1, 0).getTime()
  }
}