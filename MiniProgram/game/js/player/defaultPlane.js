import Sprite from '../base/sprite.js'
import Bullet from '../player/bullet.js'
import DataBus from '../dataBus.js'


const dataBus = new DataBus()

class Plane extends Sprite {
  constructor() {
    super({
      src: 'images/hero.png',
      width: 80,
      height: 80,
    })
    this.touched = false
    this.speed = 10
    this.init()
  }
  init() {
    this.x = global.screenWidth / 2 - 40
    this.y = global.screenHeight - 80 - 30
  }
  isCheckPlane(x, y) {
    return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height
  }
  planeBoundary(x, y) {
    let DisX = x - this.width / 2
    let DisY = y - this.height / 2
    if (DisX < 0) DisX = 0
    if (DisX + this.width > global.screenWidth) DisX = global.screenWidth - this.width
    if (DisY < 0) DisY = 0
    if (DisY + this.height > global.screenHeight) DisY = global.screenHeight - this.height
    this.x = DisX
    this.y = DisY
  }
  initEvent() {
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault()
      const X = e.changedTouches[0].clientX
      const Y = e.changedTouches[0].clientY

      if (this.isCheckPlane(X, Y)) {
        this.touched = true
      }
    })
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault()
      const x = e.changedTouches[0].clientX
      const y = e.changedTouches[0].clientY
      if (this.touched) {
        this.planeBoundary(x, y)
      }
    })
    canvas.addEventListener('touchend', (e) => {
      e.preventDefault()
      this.touched = false
    })
  }
  shoot() {
    const bullet = dataBus.pool.checkPoolDicNum('bullet', Bullet)
    const bulletX = this.x + this.width / 2 - bullet.width / 2
    const bulletY = this.y - 20
    bullet.init(bulletX, bulletY, this.speed)
    dataBus.bullets.push(bullet)
  }
}
export default Plane