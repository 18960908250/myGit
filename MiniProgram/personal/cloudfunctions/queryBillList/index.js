// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async(event, context) => {
  const {
    pageSize,
    pageNum,
    dateTime,
    dateType,
    payType,
    costCategories,
    consumptionType
  } = event
  const {
    OPENID
  } = cloud.getWXContext()
  const {
    startTime,
    endTime
  } = getRange(dateTime, dateType)
  let queryOption = {
    'userInfo.openId': OPENID
  }
  if (startTime) queryOption.date = _.and(_.gt(startTime), _.lt(endTime))
  if (payType) queryOption.payType = payType
  if (costCategories) queryOption.costCategories = costCategories
  if (consumptionType) queryOption.consumptionType = consumptionType
  const {
    total
  } = await db.collection('bill').where(queryOption).count()
  if (total > pageNum * pageSize) {
    const {
      data
    } = await db.collection('bill').where(queryOption).limit(pageSize).skip(pageNum * pageSize).get()
    const payTypeList = await queryPayType()
    const consumptionList = await queryConsumptionType()
    const categoriesList = await queryCategories()
    data.forEach(item => {
      item.payTypeName = payTypeList.filter(fitem => item.payType === fitem.id)[0].name
      item.consumptionName = consumptionList.filter(fitem => item.consumptionType === fitem.id)[0].name
      item.costCategoriesName = categoriesList.filter(fitem => item.costCategories === fitem.id)[0].name
    })
    return {
      list:data,
      pageNum,
      pageSize,
      total
    }
  }
  return {
    pageNum,
    pageSize,
    total
  }
}

function getRange(dateTime, dateType = 'month') {
  if (!dateTime) return {}
  let year = new Date(dateTime).getFullYear()
  let month = new Date(dateTime).getMonth()
  switch (dateType) {
    case 'month':
      let endTime = 0
      if (month + 1 === 12) {
        endTime = new Date(year + 1, 1, 0).getTime()
      } else {
        endTime = new Date(year, month + 1, 0).getTime()
      }
      return {
        startTime: new Date(year, month).getTime(),
        endTime,
      }
    case 'year':
      return {
        startTime: new Date(year, 0).getTime(),
        endTime: new Date(year + 1, 0, 0).getTime()
      }
    default:
      return {}
  }

}
async function queryPayType() {
  const res = await cloud.callFunction({
    name: 'queryPayType',
    data: {},
  })
  let list = []
  res.result.forEach(item => {
    item = item.children.map(citem => {
      return {
        id: citem.id,
        name: `${item.name}/${citem.name}`
      }
    })
    list = list.concat(item)
  })
  return list
}
async function queryConsumptionType() {
  const res = await cloud.callFunction({
    name: 'queryConsumption',
    data: {},
  })
  return res.result
}
async function queryCategories() {
  const res = await cloud.callFunction({
    name: 'queryCategories',
    data: {},
  })
  return res.result
}