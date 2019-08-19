import './js/lib/weapp-adapter.js' // 模拟DOM&BOM的API
import MyAudio from './js/component/audio.js'
import Background from './js/component/background.js'

// var canvas = wx.createCanvas()
var ctx = canvas.getContext('2d')

var audio = new MyAudio()
var backGround = new Background(ctx)


backGround.move()
audio.stratBgm()




