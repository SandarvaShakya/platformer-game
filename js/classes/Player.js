class Player{
    /**
     * The main character that the user controls
     * 
     * @param {int} x is the x position of the player
     * @param {int} y is the y position of the player
     * @param {int} width is the width of the player block
     * @param {int} height is the height of the player block
     * @param {Array} collisionBlocks are all the collision blocks in the level 
     */
    constructor(x, y, width, height, collisionBlocks){
        this.canvas = new Game().getCanvas()

        this.x = x
        this.y = y
        this.width = width
        this.height = height

        /**
         * The x and y velocity of the player
         * (factor with which the x and y is to be incremented or 
         * decremented)
         */
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 1
        this.collisionBlocks = collisionBlocks

        // movements flags
        this.isMovingLeft = false
        this.isMovingRight = false
        this.isMovingUp = false
        this.isMovingDown = false
    }

    /**
     * Draws the player on the screen
     */
    draw(){
        context.fillStyle = 'green'
        context.fillRect(this.x, this.y, this.width, this.height)
    }

    /**
     * All visible modifications to the player are done
     */
    update(){
        this.x += this.velocity.x
        this.checkXCollision()
        this.applyGravity()
        this.checkYCollision()
        this.draw()
    }

    /**
     * Applies gravity to the player i.e. increase the y direction exponentially
     */
    applyGravity(){
        this.velocity.y += this.gravity
        this.y += this.velocity.y
    }

    /**
     * Checks the collision in the x direction 
     * (left and right) with the collision block
     */
    checkXCollision(){
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]
            
            // checking collision with each collision block
            if(
                this.x < collisionBlock.x + collisionBlock.width &&
                this.x + this.width > collisionBlock.x &&
                this.y < collisionBlock.y + collisionBlock.height &&
                this.y + this.height > collisionBlock.y
            ){
                // collision of right side of the player with the left side of the collision block
                if(this.velocity.x > 0){
                    this.x = collisionBlock.x - this.width
                    break
                }

                // collision of left side of the player with the right side of the collision block
                if(this.velocity.x < 0){
                    this.x = collisionBlock.x +collisionBlock.width
                    break
                }
            }
        }
    }

    /**
     * Checks the collision in the y direction 
     * (top and bottom) with the collision block
     */
    checkYCollision(){
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]
            
            // checking collision with each collision block
            if(
                this.x < collisionBlock.x + collisionBlock.width &&
                this.x + this.width > collisionBlock.x &&
                this.y < collisionBlock.y + collisionBlock.height &&
                this.y + this.height > collisionBlock.y
            ){
                // collision of bottom of the player with the top of the collision block
                if(this.velocity.y > 0){
                    this.velocity.y = 0
                    this.y = collisionBlock.y - this.height
                    break
                }

                // collision of top of the player with the bottom of the collision block
                if(this.velocity.y < 0){
                    this.velocity.y = 0
                    this.y = collisionBlock.y + collisionBlock.height
                    break
                }
            }
        }
    }

    /**
     * Makes the player move to the left i.e.
     * decrease the x value of the player
     */
    moveLeft(){
        if(this.isMovingLeft) this.velocity.x = -4
    }

    /**
     * Stops the player from moving to the left
     */
    stopLeft(){
        this.velocity.x = 0
    }

    /**
     * Makes the player move to the right i.e.
     * increase the x value of the player
     */
    moveRight(){
        if(this.isMovingRight) this.velocity.x = 4
    }

    /**
     * Stops the player from moving to the right
     */
    stopRight(){
        this.velocity.x = 0
    }

    /**
     * Makes the player jump i.e.
     * decrease the y value of the player
     */
    jump(){
        this.velocity.y = -16
    }
}