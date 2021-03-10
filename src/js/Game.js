import EventEmmiter from 'eventemitter3'
import InteractiveRect from './components/InteractiveRect'
import Preload from './Preload'

const createjs = window.createjs

export default class Game extends EventEmmiter {
  constructor() {
    super()
    this.canvas = null
    this.stage = null
    this.images = []

    this.prepareCanvas()

  }

  prepareCanvas() {
    this.canvas = document.createElement('canvas')
    let debounceTimer
    document.body.appendChild(this.canvas)


    window.addEventListener('resize', () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        this.canvas.style.width = window.innerWidth   + 'px'
        this.canvas.style.height = window.innerHeight  + 'px'
      }, 50)
    })


    Object.assign(this.canvas.style, {
      width: window.innerWidth  + 'px',
      height: window.innerHeight + 'px',
      position: 'absolute',
      left: 0,
      top: 0,
    })

    this.stage = new createjs.Stage(this.canvas)
    this.stage.enableMouseOver()
    createjs.Touch.enable(this.stage)
    this.update()
    this.buildGame()

  }

  buildGame() {
    const rect = new InteractiveRect(20, 20, this.canvas.width / 2 , 0)
    const rect1 = new InteractiveRect(20, 20, this.canvas.width - 20, this.canvas.height - 20)
    // new Preload(this)

    this.stage.addChild(rect, rect1)



  }

  update = () => {
    this.stage.update()
    window.requestAnimationFrame(this.update)
  }
}
