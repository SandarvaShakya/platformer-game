class Sprite{
    /**
     * The sprite for all the objects in the game
     * @param {string} imgSrc is the path of the image you want to use for the sprite
     * @param {int} x is the x position for the image 
     * @param {int} y is the y position of the image
     */
    constructor(imgSrc, x, y){
        this.gameContext = new Game().getContext()
        this.image = new Image()
        this.image.src = imgSrc
        this.isLoaded = false
        this.image.onload = () => {
            this.isLoaded = true
        }

        this.x = x
        this.y = y
    }

    /**
     * Draws the image
     * @returns if the image is not loaded
     */
    draw(){
        if(!this.isLoaded) return
        this.gameContext.drawImage(this.image, this.x, this.y)
    }
}