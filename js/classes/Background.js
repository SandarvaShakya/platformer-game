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
        console.log(this.context);
    }

    draw(){
        if(!this.isLoaded){
            console.log("Entered but will return");
            return
        } 
        console.log("drawing image");
        // console.log(this.context);
        this.context.drawImage(this.img, this.x, this.y - this.height)
        this.context.drawImage(this.img, this.x, this.y)
    }

    update(){
        this.y += 1
        if(this.y > this.height) this.y = 0
        this.draw()
    }
}