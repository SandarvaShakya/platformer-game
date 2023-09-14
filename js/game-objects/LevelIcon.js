class LevelIcon{
    constructor(x, y, imgSrc){
        this.numberOfLevels = Object.keys(levels)
        this.x = x
        this.y = y
        this.isLoaded  = false
        this.img = new Image()
        this.imgSrc = imgSrc
        this.img.src = this.imgSrc
        this.img.onload = () => {
            this.isLoaded = true
        }
    }

    draw(context){
        if(!this.isLoaded) return
        context.drawImage(this.img, this.x, this.y)
    }


}