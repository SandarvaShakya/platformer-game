class Background{
    constructor(imgSrc, x, y, width, height, context){
        this.x = x
        this.y = y
        this.height = height
        this.width = width

        this.isLoaded = false

        this.img = new Image()
        this.img.src = imgSrc
        this.img.onload = () => {
            this.isLoaded = true
        }

        this.context = context
    }

    draw(){
        if(!this.isLoaded) return
        this.context.drawImage(this.img, this.x, this.y - this.height)
        this.context.drawImage(this.img, this.x, this.y)
    }

    update(){
        this.y += 1
        if(this.y > this.height) this.y = 0
        this.draw()
    }
}