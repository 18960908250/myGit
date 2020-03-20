// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = (event, context) => {
  // console.log('event========',event)
  // console.log('context======', context)

  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看
  db.collection('todos').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
      description: "learn cloud database",
      due: new Date("2018-09-01"),
      tags: [
        "cloud",
        "database"
      ],
      // 为待办事项添加一个地理位置（113°E，23°N）
      location: new db.Geo.Point(113, 23),
      done: false
    },
    success: function (res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    }
  })
  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息
  const wxContext = cloud.getWXContext()

  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    env: wxContext.ENV,
  }
}

