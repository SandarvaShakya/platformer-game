class RenderBlock{
    constructor(x, y, width, height, imgSrc, context){
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.isLoaded = false
        this.context = context
        this.img = new Image()
        this.img.src = imgSrc

        this.img.onload = () => {
            this.isLoaded = true
        }
    }

    draw(){
        if(!this.isLoaded) return

        this.context.drawImage(this.img, this.x, this.y)
    }
}

