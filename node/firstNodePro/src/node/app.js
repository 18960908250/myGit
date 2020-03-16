const api = require('./api/index')
const express = require('express')
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.all("*",function(req,res,next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() === 'options') {
    res.send(200);  //让options尝试请求快速结束
  } else {
    next();
  }
})
Object.keys(api).forEach(name => {
  const item = api[name]
  app[item.method](name,item.callback)
})
//配置服务端口
const server = app.listen(10010, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
})