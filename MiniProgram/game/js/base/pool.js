const __ = {
  poolDic: Symbol('poolDic')
}

export default class pool {
  constructor() {
    this[__.poolDic] = {}
  }
  isPoolDic(key) {
    return this[__.poolDic][key] || (this[__.poolDic][key] = [])
  }
  checkPoolDicNum(key, className) {
    const pool = this.isPoolDic(key)
    const result = pool.length ? pool.shift() : new className
    return result
  }
  recover(name, instance) {
    this.isPoolDic(name).push(instance)
  }
}