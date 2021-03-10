const createjs = window.createjs

export default class Preload extends createjs.LoadQueue{
    constructor(game) {
        super(true, null, true)
        this.game = game
        this.installPlugin(createjs.Sound)
        this.setMaxConnections(16)
        this.on('complete', this.handleComplete, this)


        this.loadManifest([
            {id: 'background', src:'./assets/sky.png', type: createjs.Types.IMAGE},
            {id: 'star', src: './assets/star.png', type: createjs.Types.IMAGE}
    ])
    }


    handleComplete() {
        let image = this.getResult('background')

        // console.log(image)
        image.width = window.innerWidth
        image.height = window.innerHeight
        document.body.appendChild(image)
        this.game.update()
    }


}