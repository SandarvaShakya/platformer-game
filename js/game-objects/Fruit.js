class Fruit extends Sprite{
    constructor(x, y, imgSrc, frameRate, fruitType, animations){
        super(imgSrc, x, y, frameRate, animations)
        this.hasBeenEaten = false
        this.fruitType = fruitType
        this.scorePerFruit = 0

        if(this.fruitType === 'orange'){
            this.scorePerFruit = 100
        }else if(this.fruitType === 'melon'){
            this.scorePerFruit = 200
        }else if(this.fruitType === 'pineapple'){
            this.scorePerFruit = 500
        }else{
            this.scorePerFruit = 0
        }
    }
}