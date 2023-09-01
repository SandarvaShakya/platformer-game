class Saw extends Trap{
    constructor(x, y, imgSrc, frameRate, level, context, animations){
        // console.log(x, y, imgSrc, frameRate, level, context, animations);
        super(x, y, imgSrc, frameRate, context, animations)
        this.originalX = this.x
        this.originalY = this.y
        this.velocity = {
            x: 4,
            y: -2
        }
        this.level = level
    }

    update(){
        if(this.level === 1){
            this.x += this.velocity.x
            if(this.x >= this.originalX + 160){
                this.velocity.x = -4
            }else if(this.x <= this.originalX - 160){
                this.velocity.x = 4
            }
        }

        if(this.level === 2){
            this.y += this.velocity.y
            if(this.y === this.originalY){
                this.velocity.y = -2
            }else if(this.y <= this.originalY - 120){
                this.velocity.y = 2
            }
        }
        this.draw()
    }
}