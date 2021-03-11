import EventEmmiter from 'eventemitter3'
import InteractiveRect from './components/InteractiveRect'
import Preload from './Preload'

const createjs = window.createjs

export default class Game extends EventEmmiter {
  constructor() {
    super()
    this.canvas = null
    this.stage = null
    this.images = {}

    new Preload(this)
    this.prepareCanvas()


  }

  prepareCanvas() {
    this.canvas = document.createElement('canvas')

    document.body.appendChild(this.canvas)



    Object.assign(this.canvas.style, {
      width: window.innerWidth   + 'px',
      height: window.innerHeight  + 'px',
      position: 'absolute',
      left: 0,
      top: 0,
    })

    // this.resizeWindow()

    this.stage = new createjs.Stage(this.canvas)
    this.stage.enableMouseOver()
    createjs.Touch.enable(this.stage)


    this.buildGame()
    this.update()
  }

  resizeWindow() {
    let debounceTimer
    const {background} = this.images
    window.addEventListener('resize', () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        this.canvas.width = window.innerWidth
        this.canvas.height= window.innerHeight
        this.canvas.style.width = window.innerWidth   + 'px'
        this.canvas.style.height = window.innerHeight  + 'px'
      }, 50)
    })

    console.log(background)
  }

  buildGame() {
    // const {background} = this.images
    const rect = new InteractiveRect(20, 20, this.canvas.width /  2  , 20)
    // const rect1 = new InteractiveRect(20, 20, this.canvas.width - 20, this.canvas.height - 20)

    this.stage.addChild(rect)
  }

  update = () => {
    this.stage.update()
    window.requestAnimationFrame(this.update)
  }
}
