class Sprit {
  constructor({src='',width=0,height=0,x=0,y=0}) {
    this.image = new Image()
    this.image.src = src
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.visiable = true
  }
  drawToCanvas({ ctx, x, y, width, height }){
    if (arguments[0].canvas) {
      ctx = arguments[0]
    }
    if (!this.visiable) return
    x = x || this.x
    y = y || this.y
    width = width || this.width
    height = height || this.height
    ctx.drawImage(this.image, x, y, width, height)
  }
  isBang(element) {
    const centerX = element.x + element.width / 2
    const centerY = element.y + element.height / 2
    if (!this.visiable || !element.visiable) return
    return (centerX > this.x && centerX < this.x + this.width && centerY > this.y && centerY < this.y + this.height)
  }
}
export default Sprit