const createjs = window.createjs
let mouseClickOffset

let KEYCODE_UP = 38
let KEYCODE_DOWN = 40
let KEYCODE_LEFT = 37
let KEYCODE_RIGHT = 39

export default class InteractiveRect extends createjs.Shape {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
    this.velX = 5
    this.velY = 5


    this.inputDirection = {x:  this.velX, y: 0}

    this.setRandomRect()
    // this.on('mousedown', this.onClick)
    // this.on('pressmove', this.moveRectWithMouse)
    window.onkeydown = this.changePlayerDirection
    createjs.Ticker.on('tick', this.playerMovement)
    createjs.Ticker.framerate = 60
  }



  setRandomRect = () => {
    this.set({
      x: Math.random() * (window.innerWidth - this.width),
      y: Math.random() * (window.innerHeight  - this.height)
    })
    this.graphics
        .clear()
        .beginFill('black')
        .drawRect(0, 0, this.width, this.height)
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
      this.setRandomRect()
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
