/**
 * Created by llb on 2018/10/17.
 */
require.config({
  path: {
    mock: 'http://mockjs.com/dist/mock'
  }
})
require(['mock'],function (Mock) {

  var data = Mock.mock({
    'list|1-10': [{
      'id|1': 1
    }]
  })

  document.body.innerHTML += '<pre>' +
    JSON.stringify(data, null, 4) +
    '</pre>'
})

