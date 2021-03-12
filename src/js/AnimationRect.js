const createjs = window.createjs

export default  class AnimationRect extends createjs.Tween {
    constructor(rectangle) {
        super()
        this.rectangle = rectangle

        // this.rectangle.x =  150 + 'px'

    }
}