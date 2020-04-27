// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  const { startTime, endTime } = event
  const {OPENID} = cloud.getWXContext()
  let { list } = await db.collection('bill').aggregate().match({
    'userInfo.openId': OPENID,
    date: _.and(_.gt(startTime), _.lt(endTime))
  }).group({
      _id: '$costCategories',
      sumMoney: $.sum('$money')
    }).end()
  const categoriesList = await queryCategories()
  let sum = 0
  list.forEach(item => {
    categoriesList.forEach(items => {
      if(item._id === items.id) {
        item.name = items.name
      }
    })
    sum += item.sumMoney
  })
  return {
    list,
    sum
  }
}
async function queryCategories() {
  const res = await cloud.callFunction({
    name: 'queryCategories',
    data: {},
  })
  return res.result
}