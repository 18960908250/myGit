import Pool from './base/pool.js'

let instance
// 单例
export default class DataBus {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
    this.init()
  }
  init() {
    this.pool = new Pool()
    this.bullets = []
    this.enemys = []
    this.animations = []
    this.frame = 0
    this.score = 0
    this.gameover = false
  }
  remove(key,element) {
    const temp = this[`${key}s`].shift()
    this.pool.recover(key, element)
  }
}