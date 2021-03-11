const createjs = window.createjs
let mouseClickOffset

let KEYCODE_UP = 38
let KEYCODE_DOWN = 40
let KEYCODE_LEFT = 37
let KEYCODE_RIGHT = 39

export default class InteractiveRect extends createjs.Shape {
  constructor(width, height, posX, posY) {
    super()
    this.width = width
    this.height = height
    this.velX = 5
    this.velY = 5
    this.posX = posX
    this.posY = posY


    // this.inputDirection = {x:  this.velX, y: 0}

    this.setRect()
    // this.on('mousedown', this.onClick)
    // this.on('pressmove', this.moveRectWithMouse)
    // window.onkeydown = this.changePlayerDirection
    // createjs.Ticker.on('tick', this.playerMovement)
    // createjs.Ticker.framerate = 60
  }


  setRect = () => {
    this.graphics
        .clear()
        .beginFill('black')
        .drawRect(this.posX, this.posY, this.width, this.height)
  }

  onClick = (evt) => {
    mouseClickOffset = {x: this.x - evt.stageX, y: this.y - evt.stageY}
  }
  moveRectWithMouse = (evt) => {
    this.x = evt.stageX  + mouseClickOffset.x
    this.y = evt.stageY  + mouseClickOffset.y
  }

  collisionDetection = () => {
    if (this.x + this.width > window.innerWidth || this.x<= 0 || this.y + this.height > window.innerHeight || this.y<= 0) {
      // this.setRandomRect()
    }
  }

  changePlayerDirection = (evt) => {
    switch (evt.keyCode) {
        case KEYCODE_UP:
          this.inputDirection = {x: 0, y: - this.velY}
          break
        case KEYCODE_DOWN:
          this.inputDirection = {x: 0, y: this.velY}
          break
        case KEYCODE_LEFT:
          this.inputDirection = {x: -this.velX, y: 0}
          break
        case KEYCODE_RIGHT:
          this.inputDirection = {x: this.velX, y: 0}
          break
    }

  }

  playerMovement = () => {
    this.x = this.x + this.inputDirection.x
    this.y = this.y + this.inputDirection.y

    this.collisionDetection()
  }


}
