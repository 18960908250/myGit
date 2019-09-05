class BaseMusic {
  constructor(src) {
    this.music = new Audio()
    this.music.src = src
  }
  play(currentTime) {
    if (currentTime || currentTime === 0) {
      this.music.currentTime = currentTime
    }
    this.music.play()
  }
}
export default BaseMusic