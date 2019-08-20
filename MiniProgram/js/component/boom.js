import Audio from './audio.js'

var imgArr = []
for(let i = 1; i < 20; i ++) {
  const img = new Image()
  img.src = `images/explosion${i}.png`
  img.width = 64
  img.height = 48
  imgArr.push(img)
}


export default function(option) {
  this.image = new Image()
  this.image.src = 'images/explosion19.png'
  this.image.width = 64
  this.image.height = 48
  this.x = option.x
  this.y = option.y
  this.width = 60
  this.height = 60
  this.num = 0
  this.isShow = true
  new Audio().playBoom()
  this.drawBoom = function() {
    if (this.num > 18) {
      this.num = 18
      this.isShow = false
    }
    this.image = imgArr[this.num]
    option.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.width, this.height)
    this.num++
  }
}