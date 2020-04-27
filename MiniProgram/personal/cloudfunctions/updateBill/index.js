// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const { _id, shoppingName, money, consumptionType, costCategories, date, payType, province, city, district, postcode } = event
  return await db.collection('bill').where({ _id }).update({
    data: {
      shoppingName,
      money,
      consumptionType,
      costCategories,
      date,
      payType,
      province,
      city,
      district,
      postcode
    }
  })
}