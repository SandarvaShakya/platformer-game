class Trap extends Sprite{
    constructor(x, y, imgSrc, frameRate, animations){
        super(imgSrc, x, y, frameRate, animations)
        this.originalX = this.x
        this.velocity = {
            x: 4,
            y: 0
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

    update(){
        this.x += this.velocity.x
        if(this.x >= this.originalX + 160){
            this.velocity.x = -4
        }else if(this.x <= this.originalX - 160){
            this.velocity.x = 4
        }
        this.draw()
    }
}