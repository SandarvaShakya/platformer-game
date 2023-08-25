class Background{
    constructor(imgSrc, x, y,width, height, context){
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.img = new Image()
        this.img.src = imgSrc
        this.context = context
    }

    draw(){
        context.drawImage(this.img, this.x, this.y - this.height)
        context.drawImage(this.img, this.x, this.y)
    }

    update(){
        this.y += 1
        if(this.y > this.height) this.y = 0
        this.draw()
    }
}