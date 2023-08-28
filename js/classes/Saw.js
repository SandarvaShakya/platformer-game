class Saw extends Trap{
    constructor(x, y, imgSrc, frameRate, animations){
        super(x, y, imgSrc, frameRate, animations)
        this.originalX = this.x
        this.velocity = {
            x: 4,
            y: 0
        }
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