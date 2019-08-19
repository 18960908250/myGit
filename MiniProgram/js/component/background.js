import '../lib/weapp-adapter.js'
export default function (ctx) {
  
  // var bg = wx.createImage()
  this.bg = new Image()
  this.bg.src = './images/bg.jpg'
  this.bg.width = 512
  this.bg.height = 512

  // var width = GameGlobal.innerWidth
  // var height = GameGlobal.innerHeight
  this.width = window.innerWidth
  this.height = window.innerHeight

  this.BgTop = 0
  this.move = function() {
    var _self = this
    this.BgTop++
    if (this.BgTop > this.height) this.BgTop = 0
    requestAnimationFrame(function () {
      ctx.clearRect(0, 0, _self.width, _self.height)
      ctx.drawImage(_self.bg, 0, 0, _self.bg.width, _self.bg.height, 0, _self.BgTop, _self.width, _self.height)
      ctx.drawImage(_self.bg, 0, 0, _self.bg.width, _self.bg.height, 0, -_self.height + _self.BgTop, _self.width, _self.height)
      _self.move()
    })
  }
}