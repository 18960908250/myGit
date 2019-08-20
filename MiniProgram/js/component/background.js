import '../lib/weapp-adapter.js'
export default function (ctx) {
  
  // var bg = wx.createImage()
  this.bg = new Image()
  this.bg.src = 'images/bg.jpg'
  this.bg.width = 512
  this.bg.height = 512

  // var width = GameGlobal.innerWidth
  // var height = GameGlobal.innerHeight
  this.width = window.innerWidth
  this.height = window.innerHeight

  
  this.move = function(top) {
    ctx.clearRect(0, 0, this.width, this.height)
    ctx.drawImage(this.bg, 0, 0, this.bg.width, this.bg.height, 0, top, this.width, this.height)
    ctx.drawImage(this.bg, 0, 0, this.bg.width, this.bg.height, 0, -this.height + top, this.width, this.height)
  }
}