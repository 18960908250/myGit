export default function() {
  this.bgm = new Audio()
  this.bgm.src = 'audio/bgm.mp3'
  this.stratBgm = () => this.bgm.play()
 
  this.bulletBgm = new Audio()
  this.bulletBgm.src = 'audio/bullet.mp3'
  this.playbullet = () => this.bulletBgm.play()

  this.boomBgm = new Audio()
  this.boomBgm.src = 'audio/boom.mp3'
  this.playBoom = () => this.boomBgm.play()

}