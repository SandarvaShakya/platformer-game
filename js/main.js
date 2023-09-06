// All the available levels
levels = {
    1: {
        init: () => {
            // Collision Data
            collisionBlocks = []
            addCollisionBlocks(collisionData1, 672)
            
            // Map
            gameMap = new Sprite('assets/maps/Map1.png', 0, 0, 1)
            background = new Background('assets/backgrounds/bg3.png', 0, 0, canvas.width, canvas.height, context)

            // Traps
            sawTrap = new Saw(300, 160, 'assets/traps/saw/on.png', 8, 1, sawAnimations)
            spike = new Trap(750, 304, 'assets/traps/spikes/idle.png', 1)

            // Enemies
            enemy = null

            // Fruits
            fruits = []
            generateFruits('orange', 20, 200, 'rect', 2, 5)
            generateTargetScore()

            // Finishing Games
            checkpoint = new CheckPoint(460, 289, 'assets/checkpoint/checkpoint.png', 1, checkPointAnimations)
            finish = new Sprite('assets/end/end.png', 20, 304, 1, endAnimations)

            // Player
            player = new Player(920, 20, 32, 32, selectedPlayer.imgSrc, collisionBlocks, 11, selectedPlayer.animations)

            // Hearts
            for(let i = 0; i < player.health; i++){
                let heart = new Sprite('assets/heart/heart.png', 18 + i * 22, 18, 1)
                hearts.push(heart)
            }

            game.changeStateTo('playing')
            gameLoop()
        }
    },
    2: {
        init: () => {
            // Collision Data
            collisionBlocks = []
            addCollisionBlocks(collisionData2, 773)

            // Map
            gameMap = new Sprite('assets/maps/Map2.png', 0, 0, 1)
            background = new Background('assets/backgrounds/bg1.png', 0, 0, canvas.width, canvas.height, context)

            // Traps
            sawTrap = new Saw(180, 160, 'assets/traps/saw/on.png', 8, 2, sawAnimations)
            spike = new Trap(750, 304, 'assets/traps/spikes/idle.png', 1)

            // Enemies
            enemy = new Enemy(950, 205, 'assets/enemies/rhino/idle.png', 11, rhinoAnimations)

            // Fruits
            fruits = []
            generateFruits('melon', 882, 294, 'rect', 2, 3)
            generateFruits('orange', 260, 110, 'triangle', 3, 3)
            generateFruits('pineapple', 960, 200, 'rect', 3, 1)
            generateTargetScore()

            // Finishing Games
            checkpoint = null
            finish = new Sprite('assets/end/end.png', 20, 256, 1, endAnimations)

            // Player
            player = new Player(100, 20, 32, 32, selectedPlayer.imgSrc, collisionBlocks, 11, selectedPlayer.animations)
            player.isFacing = 'right'
            
            // Hearts
            for(let i = 0; i < player.health; i++){
                let heart = new Sprite('assets/heart/heart.png', 18 + i * 22, 18, 1)
                hearts.push(heart)
            }

            game.changeStateTo('playing')
            gameLoop()
        }
    }
}

initializeConstantGameButtons()

// the main game loop
const gameLoop = () => {
    gameAnimationId = requestAnimationFrame(gameLoop)

    // background and map
    background.update()
    gameMap.draw(context)

    // constant buttons
    renderConstantGameItems(context)

    // collision with fruits
    if(fruits) {
        fruits.forEach(fruit => {
            fruit.draw(context)
    
            if(hasCollided(player, fruit)){
                fruit.switchSprite('collided')
                if(!fruit.hasBeenEaten){
                    player.increaseScore(fruit.scorePerFruit)
                    fruit.hasBeenEaten = true
                }
            }
        })
    }

    // Traps
    if(sawTrap){
        sawTrap.update(context)
        // collision with traps
        if(hasCollided(player, sawTrap)){
            player.decreaseHealth()
            hearts.splice(player.health, 1)
            if(player.health === 0){
                displayGameover(context)
                // game.state = 'gameover'
                cancelAnimationFrame(gameAnimationId)
            }
        }

    }

    if(spike){
        spike.draw(context)
        // collision with spike
        if(hasCollided(player, spike)){
            player.decreaseHealth()
            hearts.splice(player.health, 1)
            if(player.health === 0){
                displayGameover(context)
                // game.state = 'gameover'
                cancelAnimationFrame(gameAnimationId)
            }
        }
    } 

    // Finish
    finish.draw(context)
    if(player.score === TARGET_SCORE){
        finish.switchSprite('endReached')
    }

    if(hasCollided(player, finish)){
        if(player.score === TARGET_SCORE){
            if(finish.currentFrame === finish.frameRate - 1){
                displayNextLevel(context)
                game.changeStateTo('next-level')
                cancelAnimationFrame(gameAnimationId)
            }
        }
    }

    // Checkpoint
    if(checkpoint){
        checkpoint.draw(context)
        if(hasCollided(player, checkpoint)){
            if(!player.checkpointReached){
                checkpoint.switchSprite('checkpointReached')
                player.checkpointReached = true
            }
        }

        // change checkpoint sprite after the animation of open is finished
        if(checkpoint.currentFrame === checkpoint.frameRate - 1 && player.checkpointReached){
            checkpoint.switchSprite('checkpointIdle')
        }
    }

    // Enemy
    if(enemy){
        enemy.update(context)

        if(hasCollided(player, enemy)){
            player.decreaseHealth()
            hearts.splice(player.health, 1)
            if(player.health === 0){
                displayGameover(context)
                game.state = 'gameover'
                cancelAnimationFrame(gameAnimationId)
            }
        }

        if(measureXDistance(player, enemy) < 140){
            enemy.isClose = true
        }else{
            enemy.isClose = false
        }
    }

    // Player
    player.update(context)
}

window.onload = () => {
    showMainMenu()
}