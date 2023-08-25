class CollisionBlock{
    /**
     * Collision Blocks are the areas where the player cannot go
     * @param {int} x is the x position of the collision block
     * @param {int} y is the y position of the collision block
     */
    constructor(x, y){
        this.gameContext = new Game().getContext()

        this.x = x
        this.y = y
        this.width = 16
        this.height = 16
        this.color = 'rgba(255, 0, 0, 0.5)'
    }

    /**
     * Draws the collision block in the canvas
     */
    draw(){
        this.gameContext.fillStyle = this.color
        this.gameContext.fillRect(this.x, this.y, this.width, this.height)
    }
}