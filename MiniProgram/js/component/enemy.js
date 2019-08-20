export default function(ctx) {
  this.defaultEnemy = new Image()
  this.defaultEnemy.src = 'images/enemy.png'
  this.defaultEnemy.width = 120
  this.defaultEnemy.height = 79
  this.isShow = true
  this.width = 60
  this.height = 60
  this.x = Math.random() * (window.innerWidth - this.width)
  this.y = -60
  
  this.drawEnemy = function () {
    this.y += 3
    if (this.y > window.innerHeight) this.isShow = false
    var defaultEnemy = this.defaultEnemy
    ctx.drawImage(defaultEnemy, 0, 0, defaultEnemy.width, defaultEnemy.height, this.x, this.y, this.width, this.height)
  }
  this.isBang = function(bullet) {
    var centerX = bullet.x + bullet.imgWidth / 2
    var centerY = bullet.y + bullet.imgHeight / 2
    var isX = centerX > this.x && centerX < this.x + this.width
    var isY = centerY < this.y && centerY > this.y - this.height
    if (isX && isY) {
      this.isShow = false
      return true
    }
    
  }
}