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
  this.darwEnd = (num) => {
    ctx.drawImage(this.dialogImg, 0, 0, 119, 108, this.screenWidth / 2 - 150, this.screenHeight / 2 - 100, 300, 300)
    this.darwEndText(num)
    this.darwEndButton()
  }
  this.darwEndText = (num) => {
    ctx.fillStyle = '#fff'
    ctx.font = '20px arail'
    ctx.fillText(`游戏结束`, this.screenWidth / 2 - 40, this.screenHeight / 2 - 50) 
    ctx.fillText(`得分：${num}分`, this.screenWidth / 2 - 50, this.screenHeight / 2 + 30)
  }
  this.darwEndButton = ()=> {
    ctx.drawImage(this.dialogImg, 120, 6, 39, 24, this.screenWidth / 2 - 60, this.screenHeight / 2 + 80, 120, 40)
    ctx.fillText(`重新开始`, this.screenWidth / 2 - 40, this.screenHeight / 2 + 105)
  }
}