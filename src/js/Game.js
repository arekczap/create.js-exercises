import EventEmmiter from 'eventemitter3'
import InteractiveRect from './components/InteractiveRect'

const createjs = window.createjs

export default class Game extends EventEmmiter {
  constructor() {
    super()
    this.canvas = null
    this.stage = null

    this.prepareCanvas()
  }

  prepareCanvas() {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
    Object.assign(this.canvas.style, {
      width: window.innerWidth + 'px',
      height: window.innerHeight + 'px',
      position: 'absolute',
      left: 0,
      top: 0,
    })
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    this.stage = new createjs.Stage(this.canvas)
    this.stage.enableMouseOver()
    createjs.Touch.enable(this.stage)
    this.update()

    this.buildGame()

  }

  buildGame() {
    const rect = new InteractiveRect(10, 10)
    this.stage.addChild(rect)

  }

  update = () => {
    this.stage.update()
    window.requestAnimationFrame(this.update)
  }
}
