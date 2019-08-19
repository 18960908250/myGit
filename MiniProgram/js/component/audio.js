export default function() {
  this.bgm = new Audio()
  this.bgm.src = './audio/bgm.mp3'
  this.stratBgm = function() {
    this.bgm.play()
  }
}