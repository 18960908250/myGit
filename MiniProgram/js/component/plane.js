export default function(ctx) {
  this.screenWidth = window.innerWidth
  this.screenHeight = window.innerHeight
  this.planeImg = new Image()
  this.planeImg.src = 'images/hero.png'
  this.planeImg.width = 186
  this.planeImg.height = 130
  this.imageWidth = 80
  this.imageHeight = 80
  this.x = this.screenWidth / 2 - this.imageWidth/2
  this.y = this.screenHeight - this.imageHeight -30
  this.isMove = false
  this.isRender = true
  this.drawPlane = function() {
    var planeImg = this.planeImg
    ctx.drawImage(planeImg, 0, 0, planeImg.width, planeImg.height, this.x, this.y, this.imageWidth, this.imageHeight)
  }
  this.planeMove = function() {
    var _self = this
    canvas.addEventListener('touchstart', function(e){
      e.preventDefault()
      var clientX = e.changedTouches[0].clientX
      var clientY = e.changedTouches[0].clientY
     
      var inPlaneX = clientX > _self.x && clientX < _self.x + _self.imageWidth
      var inPlaneY = clientY > _self.y && clientY < _self.y + _self.imageHeight
      if (inPlaneX && inPlaneY) {
        _self.isMove = true
      }
    })
    canvas.addEventListener('touchmove', function (e) {
      e.preventDefault()
      var clientX = e.changedTouches[0].clientX
      var clientY = e.changedTouches[0].clientY
      if(_self.isMove) {
        _self.x = clientX - _self.imageWidth / 2
        _self.y = clientY - _self.imageHeight / 2
        if (_self.x < 0) _self.x = 0
        if (_self.x + _self.imageWidth > _self.screenWidth) _self.x = _self.screenWidth - _self.imageWidth
        if (_self.y < 0) _self.y = 0
        if (_self.y + _self.imageHeight > _self.screenHeight) _self.y = _self.screenHeight - _self.imageHeight
      }
    })
    canvas.addEventListener('touchend', function (e) {
      e.preventDefault()
      _self.isMove = false
    })
  }
  this.isBoom = (enemy) => {
    const centerX = enemy.x + enemy.width / 2
    const centerY = enemy.y + enemy.height / 2

    const isX = centerX > this.x && centerX < this.x + this.imageWidth
    const isY = centerY > this.y && centerY < this.y + this.imageHeight
    if(isX && isY) {
      this.isRender = false
    }

  }
}