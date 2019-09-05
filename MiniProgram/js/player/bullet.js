import Sprite from '../base/sprite.js'
import DataBus from '../dataBus.js'

const __ = {
  speed: Symbol('speed')
}
const dataBus = new DataBus()

export default class bullet extends Sprite {
  constructor() {
    super({
      src: './images/bullet.png',
      width: 16,
      height: 30,
    })
  }
  init(x, y, speed) {
    this.x = x
    this.y = y
    this[__.speed] = speed
  }
  update() {
    this.y -= this[__.speed]
    if (this.y < 0 - this.height) {
      dataBus.remove('bullet', this)
      this.visiable = true
    }
  }
}