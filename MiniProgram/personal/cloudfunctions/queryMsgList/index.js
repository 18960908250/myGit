// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  const { data } = await db.collection('chatroom').where({groupId: event.groupId,}).orderBy('sendTimeTS', 'desc').get()
  return {
    list: data ? data: []
  }
}