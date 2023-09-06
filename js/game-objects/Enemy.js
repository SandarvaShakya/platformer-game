class Enemy extends Sprite{
    constructor(x, y, imgSrc, frameRate, animations){
        super(imgSrc, x, y, frameRate, animations)
        this.velocity = {
            x: 0,
            y: 0
        }
        this.originalX = this.x
        this.isClose = false
    }

    update(context){
        this.x += this.velocity.x

        if(this.isClose){
            if(this.x === this.originalX){
                this.velocity.x = -4
                this.switchSprite('runLeft')
            }else if(this.x === this.originalX - 140){
                this.velocity.x = 0
                this.switchSprite('idle')
            }
        }else{
            if(this.x === this.originalX - 140){
                this.velocity.x = 2
                this.switchSprite('runRight')
            }
            
            if(this.x === this.originalX){
                this.velocity.x = 0
                this.switchSprite('idle')
            }
        }
        this.draw(context)
    }   
}