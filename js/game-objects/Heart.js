class Heart{
    constructor(x, y, imgSrc){
        this.x = x
        this.y = y
        this.img = new Image()
        this.img.src = imgSrc
        this.isLoaded = false

        this.img.onload = () => {
            this.isLoaded = true
        }
    }

    draw(context){
        if(!this.isLoaded) return
        context.drawImage(this.img, this.x, this.y)
    }
}