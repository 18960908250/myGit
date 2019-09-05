import DataBus from '../dataBus.js'

const dataBus = new DataBus()

const finishImg = new Image()
finishImg.src = './images/Common.png'

export default class GameInfo {
  constructor() {
    this.btnArea = {}
  }
  drawInfo(ctx) {
    ctx.fillStyle = '#fff'
    ctx.font = '25px Arial'
    ctx.fillText(dataBus.score, 20, 40)
  }
  drawFinish(ctx) {
    ctx.drawImage(finishImg, 0, 0, 119, 108, global.screenWidth / 2 - 150, global.screenHeight / 2 - 100, 300, 300 )
    ctx.fillStyle = '#fff'
    ctx.font = '20px Arial'
    ctx.fillText('游戏结束', global.screenWidth / 2 - 40, global.screenHeight / 2 - 100 + 50)

    ctx.fillText(`得分${dataBus.score}`, global.screenWidth / 2 - 40, global.screenHeight / 2 - 100 + 130)

    ctx.drawImage(finishImg, 120, 6, 39, 24, global.screenWidth / 2 - 60, global.screenHeight / 2 - 100 + 180, 120, 40)

    ctx.fillText('重新开始', global.screenWidth / 2 - 40, global.screenHeight / 2 - 100 + 205)

    this.btnArea = {
      startX: global.screenWidth / 2 - 40,
      startY: global.screenHeight / 2 - 100 + 180,
      endX: global.screenWidth / 2 + 50,
      endY: global.screenHeight / 2 - 100 + 255
    }
  }
}