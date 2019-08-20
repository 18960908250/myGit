export default function(ctx) {
  this.dialogImg = new Image()
  this.dialogImg.src = 'images/Common.png'
  this.screenWidth = window.innerWidth
  this.screenHeight = window.innerHeight
  this.scoreText = (text) => {
    ctx.fillStyle = '#fff'
    ctx.font = '20px arail'
    ctx.fillText(`${text}`,20, 50) 
  }
  this.darwEnd = (num, plane) => {
    ctx.drawImage(this.dialogImg, 0, 0, 119, 108, this.screenWidth / 2 - 150, this.screenHeight / 2 - 100, 300, 300)
    this.darwEndText(num)
    this.darwEndButton(plane)
  }
  this.darwEndText = (num) => {
    ctx.fillStyle = '#fff'
    ctx.font = '20px arail'
    ctx.fillText(`游戏结束`, this.screenWidth / 2 - 40, this.screenHeight / 2 - 50) 
    ctx.fillText(`得分：${num}分`, this.screenWidth / 2 - 50, this.screenHeight / 2 + 30)
  }
  this.darwEndButton = (plane)=> {
    ctx.drawImage(this.dialogImg, 120, 6, 39, 24, this.screenWidth / 2 - 60, this.screenHeight / 2 + 80, 120, 40)
    ctx.fillText(`重新开始`, this.screenWidth / 2 - 40, this.screenHeight / 2 + 105)
    this.restart(plane)
  }
  this.restart = (plane) => {
    canvas.addEventListener('touchstart', function (e) {
      e.preventDefault()
      var clientX = e.changedTouches[0].clientX
      var clientY = e.changedTouches[0].clientY
      var inRestartX = clientX > window.innerWidth / 2 - 60 && clientX < window.innerWidth / 2 - 60 +120
      var inRestartY = clientY > (window.innerHeight / 2) && clientY < window.innerHeight / 2 + 80 + 40
      
      if (inRestartX && inRestartY) {
        plane.isRender = true
      }
    })
  }
}