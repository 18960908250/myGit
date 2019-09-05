import Background from './runtime/background.js'
import Plane from './player/defaultPlane.js'
import DataBus from './dataBus.js'
import Enemy from './npc/enemy.js'
import Animation from './base/animation.js'
import Music from '../js/runtime/music.js'
import GameInfo from '../js/runtime/gameInfo.js'

const ctx = canvas.getContext('2d')
const dataBus = new DataBus()

export default class main {
  constructor() {
    this.init()
    this.id = null
  }
  init() {
    this.isRestart = false
    dataBus.init()
    this.background = new Background()
    this.plane = new Plane()
    this.frame = 0
    this.music = new Music()
    this.gameInfo = new GameInfo()
    this.music.BGM.play()

    canvas.removeEventListener('touchstart', () => {
      this.touchHandel
    })

    window.cancelAnimationFrame(this.id)
    this.loop()

  }
  // 全局碰撞检测
  bang() {
    dataBus.bullets.forEach(item => {
      dataBus.enemys.forEach(item_ => {
        const bangStatus = item_.isBang(item)
        if (bangStatus) {
          dataBus.score += 10
          this.music.boomBGM.play(0)
          item_.playExplosion()
          item.visiable = false
        }
      })
    })
    dataBus.enemys.forEach(enemy => {
      const isBoom = enemy.isBang(this.plane)
      if (isBoom) {
        dataBus.gameover = true
      }
    })
  }
  // 创建敌机
  createEnemy() {
    if (dataBus.frame % 30 === 0) {
      const enemy = dataBus.pool.checkPoolDicNum('enemy', Enemy)
      enemy.init(6)
      dataBus.enemys.push(enemy)
    }
  }
  // 绘制子弹跟敌机
  draw() {
    dataBus.bullets.concat(dataBus.enemys).forEach(item => {
      item.drawToCanvas(ctx)
    })
  }
  // 更新绘制
  render() {
    ctx.clearRect(0, 0, global.screenWidth, global.screenHeight)
    this.background.render(ctx)
    this.draw()
    this.plane.drawToCanvas(ctx)
    this.plane.initEvent()
    dataBus.animations.forEach(item => {
      if (item.playing) {
        item.drawBoomImg(ctx)
      }
    })
    this.gameInfo.drawInfo(ctx)
    if (dataBus.gameover) {
      this.gameInfo.drawFinish(ctx)
      if (!this.isRestart) {
        this.isRestart = true
        this.touchHandel()
      }
    }
  }
  // 更新数据
  update() {
    if (dataBus.gameover) return
    this.createEnemy()
    this.background.bgMove()
    if (dataBus.frame % 30 === 0) {
      this.plane.shoot()
      this.music.shootBGM.play(0)
    }
    dataBus.bullets.concat(dataBus.enemys).forEach(item => {
      item.update()
    })
    this.bang()
  }
  touchHandel() {
    canvas.addEventListener('touchstart', (e) => {
      const x = e.touches[0].clientX
      const y = e.touches[0].clientY
      const { startX, startY, endX, endY} = this.gameInfo.btnArea
      if (x > startX && x < endX && y > startY && y < endY) {
        this.init()
        console.log(dataBus.gameover)
      }
    })
  }
  // 循环
  loop() {
    dataBus.frame++
    this.id = window.requestAnimationFrame(() => {
      this.render()
      this.update()
      this.loop()
    })
  }
}