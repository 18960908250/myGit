import Sprit from './sprite.js'
import DataBus from '../dataBus.js'

const __ = {
  timer: Symbol('timer')
}
const dataBus = new DataBus()
export default class boom extends Sprit {
  constructor(options) {
    super(options)
    this.imgList = []
    this.count = 0
    this.imgIndex = -1
    this.interval = 1000 / 60
    this[__.timer] = null
    this.playing = false
    dataBus.animations.push(this)
  }
  explosionImg(imgList) {
    imgList.forEach(item => {
      const img = new Image()
      img.src = item
      this.imgList.push(img)
    })
    this.count = imgList.length
  }
  playBoomImg() {
    this.imgIndex++
    if (this.imgIndex === this.count) {
      this.imgIndex = 0
      this.stopBoomImg()
    }
  }
  stopBoomImg() {
    this.playing = false
    clearInterval(this[__.timer])
  }
  drawBoomImg(ctx) {
    try {
      ctx.drawImage(
        this.imgList[this.imgIndex],
        this.x,
        this.y,
        this.width * 1.2,
        this.height * 1.2
      )
    } catch(e) {
      console.log(this.imgIndex)
    }
  }
  playExplosion() {
    this.playing = true
    this.visiable = false
    this[__.timer] = setInterval(() => {
      this.playBoomImg()
    },this.interval)
  }
}