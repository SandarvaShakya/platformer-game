class Game{
    /**
     * Provides the context to all the objects
     */
    constructor(){
        /** @type {HTMLCanvasElement} */
        this.canvas = document.getElementById('game-canvas')
        /** @type {CanvasRenderingContext2D} */
        this.context = this.canvas.getContext('2d')

        this.levelSelectionImg = new Image()
        this.levelSelectionImg.src = 'assets/levelSelectionScreen.png'
        this.levelSelectionImgIsLoaded = false
        this.levelSelectionImg.onload = () => {
            this.levelSelectionImgIsLoaded = true
        }

        this.canvas.width = 16 * 64 
        this.canvas.height = 16 * 32
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.state = "main-menu" 
    }

    /**
     * 
     * @returns the canvas
     */
    getCanvas(){
        return this.canvas
    }

    /**
     * 
     * @returns the canvas context
     */
    getContext(){
        return this.context
    }

    /**
     * Clears the screen
     */
    clearScreen(){
        this.context.clearRect(0, 0, canvas.width, canvas.height)
    }

    /**
     * 
     * @param {int} x is the x position of the rectangle
     * @param {int} y is the y position of the rectangle
     * @param {int} width is the width of the rectangle
     * @param {int} height is the height of the ractangle
     */
    drawRect(x, y, width, height){
        this.context.fillStyle = 'red'
        this.context.fillRect(x, y, width, height)
    }

    show(){
        this.canvas.style.display = 'block'
    }

    hide(){
        this.canvas.style.display = 'none'
    }

    changeStateTo(state){
        this.state = state
    }

    showLevels(context){
        if(!this.levelSelectionImgIsLoaded) console.log("Not loaded Image");

        this.changeStateTo('levelSelection')
        context.drawImage(this.levelSelectionImg, 0, 0)
        
        const numberOflevels = Object.keys(levels)
        let levelX = 340
        const levelY = 200
        // levelIcons = []
        numberOflevels.forEach(level => {
            let levelIconSrc = `assets/levels/${level}.png`
            levelIcons.push(new LevelIcon(levelX, levelY, levelIconSrc))
            levelX += 40
        })
        
        levelIcons.forEach(levelIcon => {
            levelIcon.draw(this.context)
        })
    }
}