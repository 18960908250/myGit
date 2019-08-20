import './js/lib/weapp-adapter.js' // 模拟DOM&BOM的API
import MyAudio from './js/component/audio.js'
import Background from './js/component/background.js'
import Plane from './js/component/plane.js'
import Bullet from './js/component/bullet.js'
import Enemy from './js/component/enemy.js'
import Boom from './js/component/boom.js'
import Score from './js/component/score.js'

// var canvas = wx.createCanvas()
var ctx = canvas.getContext('2d')
var num = 0
var audio = new MyAudio()
var backGround = new Background(ctx)
var plane = new Plane(ctx)
var score = new Score(ctx)
var bullet = null
var bulletArr = []
var bulletTimer = setInterval(()=> {
  bullet = new Bullet({ ctx, plane })
  bulletArr.push(bullet)
}, 500)

var enemy = null
var enemyArr = []
var enemyTimter = setInterval(() => {
  enemy = new Enemy(ctx)
  enemyArr.push(enemy)
}, 1000)

var boom = null
var boomArr = []
// audio.stratBgm()
var Top = 0
render()
plane.planeMove()
function render() {
  Top++
  if (Top > window.innerHeight) Top = 0
  requestAnimationFrame(function () {
    enemyArr = enemyArr.filter(item => item.isShow)
    bulletArr = bulletArr.filter(item => item.isShow)
    boomArr = boomArr.filter(item => item.isShow)
    backGround.move(Top)
    //console.log(bulletArr)
    enemyArr.forEach(item => {
      plane.isBoom(item)
      item.drawEnemy()
      for (let i = 0; i < bulletArr.length; i++) {
        var bulletIsShow = item.isBang(bulletArr[i])
        if (bulletIsShow) {
          num += 10
          bulletArr[i].isShow = false
          boom = new Boom({ ctx, x: item.x, y: item.y})
          boomArr.push(boom)       
        } 
      }
    })
    bulletArr.map(item => {
      item.darwDefatutBullet()
    })
    boomArr.forEach(item => {
      item.drawBoom()
    })
    score.scoreText(num)
    plane.drawPlane()
    if (plane.isRender) {
      render()
    } else {
      score.darwEnd(num, plane)
    }
  })
}



