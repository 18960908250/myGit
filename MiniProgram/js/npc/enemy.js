import Sprite from '../base/sprite.js'
import DataBus from '../dataBus.js'
import Animation from '../base/animation.js'

const rud = (start, end) => Math.floor(Math.random() * (end - start) + start)
const dataBus = new DataBus()
const __ = {
  speed: Symbol('speed')
}
export default class Enemy extends Animation {
  constructor() {
    super({
      width: 60,
      height: 60,
      src: './images/enemy.png'
    })
    this.initExplosionAnimation()
  }
  init(speed) {
    this.x = rud(0, global.screenWidth - this.width)
    this.y = - this.height
    this[__.speed] = speed
  }
  update() {
    this.y += this[__.speed]
    if (this.y > global.screenHeight) {
      dataBus.remove('enemy', this)
      this.visiable = true
    }
  }
  // 设置爆炸效果
  initExplosionAnimation(){
    let imgArr = []
    const imgNum = 19
    const imgBaseSrc = './images/explosion'
    for(let i = 1; i<= imgNum; i++) {
      const imgSrc = `${imgBaseSrc}${i}.png`
      imgArr.push(imgSrc)
    }
    this.explosionImg(imgArr)
  }
 }