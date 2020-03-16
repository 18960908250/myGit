const http = require('http')
const fs = require('fs')
const post = 8888

http.createServer((request,response) => {
  const url = request.url
  response.writeHead(200, {
    "Content-Type": "text/json;charset=utf-8"
  });
  // 发送响应数据 "Hello World"
  const targetObj = {
    a: 1,
    b: 2
  }
  response.write(JSON.stringify(targetObj));
  // 结束
  response.end();
}).listen(post);
// 终端打印如下信息
console.log("Server running at http://127.0.0.1:" + post + "/");