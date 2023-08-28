class Player extends Sprite{
    /**
     * The main character that the user controls
     * 
     * @param {int} x is the x position of the player
     * @param {int} y is the y position of the player
     * @param {int} width is the width of the player block
     * @param {int} height is the height of the player block
     * @param {string} imgSrc is the path of the sprite image
     * @param {Array} collisionBlocks are all the collision blocks in the level 
     * @param {int} frameRate is the number of images in a sprite
     * @param {Array} animations are all the types of sprite a player can be 
     */
    constructor(x, y, width, height, imgSrc, collisionBlocks, frameRate, animations){
        super(imgSrc, x, y, frameRate, animations)
        this.canvas = new Game().getCanvas()
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
        this.isFacing = 'left'
        this.isHit = false
    }

    // /**
    //  * Draws the player on the screen
    //  */
    // draw(){
    //     context.fillStyle = 'green'
    //     context.fillRect(this.x, this.y, this.width, this.height)
    // }

    /**
     * All visible modifications to the player are done
     */
    update(){
        // context.fillStyle = 'blue'
        // context.fillRect(this.x, this.y, this.width, this.height)
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

    switchSprite(spriteName){
        if(this.image === this.animations[spriteName].image) return
        this.currentFrame = 0
        this.image = this.animations[spriteName].image
        this.frameRate = this.animations[spriteName].frameRate
        this.frameBuffer = this.animations[spriteName].frameBuffer
        this.loop = this.animations[spriteName].loop
    }

    /**
     * Makes the player move to the left i.e.
     * decrease the x value of the player
     */
    moveLeft(){
        if(this.isMovingLeft){
            if(!this.isHit) this.switchSprite('runLeft')
            else this.switchSprite('hitLeft')
            this.isFacing = 'left'
            this.velocity.x = -4
        } 
    }

    /**
     * Stops the player from moving to the left
     */
    stopLeft(){
        if(!this.isHit) this.switchSprite('idleLeft')
        else this.switchSprite('hitLeft')
        this.isFacing = 'left'
        this.velocity.x = 0
    }

    /**
     * Makes the player move to the right i.e.
     * increase the x value of the player
     */
    moveRight(){
        if(this.isMovingRight){
            if(!this.isHit) this.switchSprite('runRight')
            else this.switchSprite('hit')
            this.isFacing = 'right'
            this.velocity.x = 4
        } 
    }

    /**
     * Stops the player from moving to the right
     */
    stopRight(){
        if(!this.isHit) this.switchSprite('idleRight')
        else this.switchSprite('hit')
        this.isFacing = 'right'
        this.velocity.x = 0
    }

    /**
     * Makes the player jump i.e.
     * decrease the y value of the player
     */
    jump(){
        if(this.isFacing === 'right') this.switchSprite('jumpRight')
        if(this.isFacing === 'left') this.switchSprite('jumpLeft')
        this.velocity.y = -16
    }

    /**
     * Changes the sprite after jumping
     */
    stopJump(){
        if(this.isFacing === 'right') this.switchSprite('idleRight')
        if(this.isFacing === 'left') this.switchSprite('idleLeft')
    }
}