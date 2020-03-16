import BaseMusic from '../base/baseMusic.js'

class BGM extends BaseMusic {
  constructor() {
    super('audio/bgm.mp3')
  }
}

class ShootBGM extends BaseMusic {
  constructor() {
    super('audio/bullet.mp3')
  }
}

class BoomBGM extends BaseMusic {
  constructor() {
    super('audio/boom.mp3')
  }
}

class MusicLibrary {
  constructor() {
    this.BGM = new BGM()
    this.shootBGM = new ShootBGM()
    this.boomBGM = new BoomBGM()
  }
}

export default MusicLibrary