class Enemy extends Sprite{
    constructor(x, y, imgSrc, frameRate, context, animations){
        super(imgSrc, x, y, frameRate, context, animations)
        this.velocity = {
            x: 0,
            y: 0
        }
        this.originalX = this.x
        this.isClose = false
    }

    // draw(){
    //     context.fillStyle = 'rgba(255, 0, 0, 0.5)'
    //     context.fillRect(this.x, this.y, this.width, this.height)
    //     super.draw()
    // }

    update(){
        this.x += this.velocity.x

        if(this.isClose){
            if(this.x === this.originalX){
                this.velocity.x = -2
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
    }   
}