import Sprite from '../base/sprite.js'

class Background extends Sprite {
  constructor() {
    super({
      src: 'images/bg.jpg',
      width: global.screenWidth,
      height: global.screenHeight
    })
    this.init()
  }
  init() {
    this.top = 0
  }
  bgMove() {
    this.top++
    if (this.top > global.screenHeight) this.top = 0
  }
  render(ctx) {
    this.drawToCanvas({ ctx, y:this.top})
    this.drawToCanvas({ ctx, y: -global.screenHeight + this.top  })
  }
}
export default Background