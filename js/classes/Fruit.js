class Fruit extends Sprite{
    constructor(x, y, imgSrc, frameRate, animations){
        super(imgSrc, x, y, frameRate, animations)
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