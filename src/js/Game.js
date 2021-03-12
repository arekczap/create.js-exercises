import EventEmmiter from 'eventemitter3'
import InteractiveRect from './components/InteractiveRect'
import Preload from './Preload'
import AnimationRect from './AnimationRect'

const createjs = window.createjs

export default class Game extends EventEmmiter {
  constructor() {
    super()
    this.canvas = null
    this.stage = null
    this.images = {}

    new Preload(this)
    this.rect = new InteractiveRect(this, 25, 25)
    // this.rect1 = new InteractiveRect(50, 50, this.canvas.width - 50, this.canvas.height - 50)
    this.animationRect = new AnimationRect(this)

    this.prepareCanvas()
  }

  prepareCanvas() {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)

    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

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

    this.rect.setRect(this.canvas.width /2, 50)

    this.update()
  }

  resizeWindow() {
    let debounceTimer
    // const {background} = this.images
    window.addEventListener('resize', () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        this.canvas.width = window.innerWidth
        this.canvas.height= window.innerHeight
        this.canvas.style.width = window.innerWidth   + 'px'
        this.canvas.style.height = window.innerHeight  + 'px'
        this.rect.setRect(this.canvas.width /2, 50)
      }, 50)
    })
  }

  buildGame() {
    this.stage.addChild(this.rect)
  }

  update = () => {
    this.stage.update()
    window.requestAnimationFrame(this.update)
  }
}
