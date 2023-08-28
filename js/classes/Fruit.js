class Fruit extends Sprite{
    constructor(x, y, imgSrc, frameRate, animations){
        super(imgSrc, x, y, frameRate, animations)
        this.hasBeenEaten = false
    }
}