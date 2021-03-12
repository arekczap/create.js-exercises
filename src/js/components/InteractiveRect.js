const createjs = window.createjs

export default class InteractiveRect extends createjs.Shape {
  constructor(game, width, height) {
    super()
    this.game = game
    this.width = width
    this.height = height

  }

  setRect = (positionX, positionY) => {
    this.graphics
        .clear()
        .beginFill('red')
        .drawCircle(positionX, positionY, this.width)
        .setStrokeStyle(2)
        .beginStroke('white')
        .moveTo(0,0)
        .lineTo(0,this.width)
        .endStroke()
  }






}
