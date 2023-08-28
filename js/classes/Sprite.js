class Sprite{
    /**
     * The sprite for all the objects in the game
     * @param {string} imgSrc is the path of the image you want to use for the sprite
     * @param {int} x is the x position for the image 
     * @param {int} y is the y position of the image
     */
    constructor(imgSrc, x, y, frameRate, animations, loop = true){
        this.gameContext = new Game().getContext()
        this.image = new Image()
        this.image.src = imgSrc
        this.isLoaded = false
        this.frameRate = frameRate
        this.currentFrame = 0
        this.elapsedFrame = 0
        this.frameBuffer = 4
        this.loop = loop

        this.image.onload = () => {
            this.isLoaded = true
            this.width = this.image.width / this.frameRate
            this.height = this.image.height
        }

        this.x = x
        this.y = y

        this.animations = animations
        if(this.animations){
            for(let key in this.animations){
                const image = new Image()
                image.src = this.animations[key].imageSrc
                this.animations[key].image = image
            }
        }
    }

    /**
     * Draws the image
     * @returns if the image is not loaded
     */
    draw(){
        if(!this.isLoaded) return

        const cropbox = {
            x: this.width * this.currentFrame,
            y: 0,
            width: this.width,
            height: this.height
        }
        this.gameContext.drawImage(
            this.image,
            cropbox.x,
            cropbox.y,
            cropbox.width,
            cropbox.height,
            this.x, 
            this.y,
            this.width,
            this.height
        )
        this.updateFrames()
    }

    updateFrames(){
        this.elapsedFrame++

        if(this.elapsedFrame % this.frameBuffer === 0){
            if(this.currentFrame < this.frameRate - 1) this.currentFrame += 1
            else if(this.loop) this.currentFrame = 0
        }
    }

    switchSprite(spriteName){
        if(this.image === this.animations[spriteName].image) return
        this.currentFrame = 0
        this.image = this.animations[spriteName].image
        this.frameRate = this.animations[spriteName].frameRate
        this.frameBuffer = this.animations[spriteName].frameBuffer
        this.loop = this.animations[spriteName].loop
    }
}