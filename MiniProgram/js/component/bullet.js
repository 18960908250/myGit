import Audio from './audio.js'
export default function(option) {
  // new Audio().playbullet()
  this.defaultBulletBg = new Image()
  this.defaultBulletBg.src = 'images/bullet.png'
  this.defaultBulletBg.width = 62
  this.defaultBulletBg.height = 108
  this.isShow = true
  this.imgWidth = 16
  this.imgHeight = 16
  this.x = option.plane.x + option.plane.imageWidth / 2 - this.imgWidth / 2
  this.y = option.plane.y +20
  
  this.darwDefatutBullet = function() {
    this.y -= 8
    var defaultBulletBg = this.defaultBulletBg
    if (this.y < -this.imgHeight - 100) {
      this.isShow = false
    } 
    option.ctx.drawImage(defaultBulletBg, 0, 0, defaultBulletBg.width, defaultBulletBg.height, this.x, this.y, this.imgWidth, this.imgHeight)
  }
}