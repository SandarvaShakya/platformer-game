const canvas = document.querySelector('#canvas')
const canvasBg = document.querySelector('#canvas-bg')
/** @type {HTMLCanvasElement} */
const context = canvas.getContext('2d')
const context1 = canvasBg.getContext('2d')

// 1024
canvas.width = 16 * 64 
canvasBg.width = 16 * 64
// 512
canvas.height = 16 * 32
canvasBg.height = 16 * 32

// The player
let player
let gameMap
let background
let sawTrap
let spike
let checkpoint
let finish
let enemy
let hearts = []

// Buttons
let restartButton = new Sprite('assets/buttons/Restart.png', canvas.width - 38, canvas.height - 36, 1)
let backButton = new Sprite('assets/buttons/Backmedium.png', canvas.width - 38, canvas.height - 36 - 22, 1)
let levelsButton = new Sprite('assets/buttons/Levels.png', canvas.width - 38, canvas.height - 36 - 44, 1)
let volumeButton = new Sprite('assets/buttons/Volume.png', canvas.width - 38, canvas.height - 36 - 66, 1)

levels = {
    1: {
        init: () => {
            // map
            gameMap = new Sprite('assets/maps/Map2.png', 0, 0, 1)
            background = new Background('assets/backgrounds/bg3.png', 0, 0, canvasBg.width, canvasBg.height, context1)

            // traps
            sawTrap = new Saw(300, 160, 'assets/traps/saw/on.png', 8, sawAnimations, 1)
            spike = new Trap(750, 304, 'assets/traps/spikes/idle.png', 1)

            // fruits

            // checkpoint end finish
            checkpoint = new CheckPoint(460, 289, 'assets/checkpoint/checkpoint.png', 1, checkPointAnimations)
            finish = new Sprite('assets/end/end.png', 20, 304, 1, endAnimations)

            // player
            player = new Player(920, 20, 32, 32, 'assets/player/idleLeft.png', collisionBlocks, 11,playerAnimations)
            
            for(let i = 0; i < player.health; i++){
                let heart = new Sprite('assets/heart/heart.png', 18 + i * 22, 18, 1)
                hearts.push(heart)
            }

            addCollisionBlocks(collisionData1, 672)
            generateFruits('orange', 20, 200, 'rect', 2, 5)
            generateTargetScore()
            animate()
        }
    },
    2: {
        init: () => {
            collisionBlocks = []
            // map
            gameMap = new Sprite('assets/maps/Map1.png', 0, 0, 1)
            background = new Background('assets/backgrounds/bg1.png', 0, 0, canvasBg.width, canvasBg.height, context1)

            // traps
            sawTrap = new Saw(180, 160, 'assets/traps/saw/on.png', 8, sawAnimations, 2)
            spike = new Trap(750, 304, 'assets/traps/spikes/idle.png', 1)

            enemy = new Enemy(950, 205, 'assets/enemies/rhino/idle.png', 11, rhinoAnimations)

            // checkpoint and finish
            checkpoint = null
            finish = new Sprite('assets/end/end.png', 20, 256, 1, endAnimations)

            // player
            player = new Player(100, 20, 32, 32, 'assets/player/idleLeft.png', collisionBlocks, 11,playerAnimations)
            player.isFacing = 'right'
            
            for(let i = 0; i < player.health; i++){
                let heart = new Sprite('assets/heart/heart.png', 18 + i * 22, 18, 1)
                hearts.push(heart)
            }
            addCollisionBlocks(collisionData2, 773)
            fruits = []
            generateFruits('pineapple', 882, 294, 'rect', 2, 3)
            generateFruits('orange', 260, 110, 'triangle', 3, 3)
            generateTargetScore()

            console.log(fruits);
            animate()
        }

    }
}


let animationId
const animate = () => {
    animationId = requestAnimationFrame(animate)
    
    // background and map
    background.update()
    gameMap.draw()
    // collisionBlocks.forEach(block => {
    //     block.draw()
    // })

    // constant buttons
    restartButton.draw()
    backButton.draw()
    levelsButton.draw()
    volumeButton.draw()
    displayScore()
    hearts.forEach(heart => {
        heart.draw()
    })

    // collision with fruits
    fruits && fruits.forEach(fruit => {
        fruit.draw()

        if(hasCollided(player, fruit)){
            fruit.switchSprite('collided')
            if(!fruit.hasBeenEaten){
                player.increaseScore(fruit.scorePerFruit)
                fruit.hasBeenEaten = true
            }
        }
    })

    // Traps
    sawTrap && sawTrap.update()
    spike && spike.draw()

    // Enemies
    enemy && enemy.draw()

    if(spike){
         // collision with spike
        if(hasCollided(player, spike)){
            player.decreaseHealth()
            hearts.splice(player.health, 1)
            if(player.health === 0){
                displayGameover()
                gameState = 'gameover'
                cancelAnimationFrame(animationId)
            }
        }
    }

    if(sawTrap){
        // collision with traps
        if(hasCollided(player, sawTrap)){
            player.decreaseHealth()
            hearts.splice(player.health, 1)
            if(player.health === 0){
                displayGameover()
                gameState = 'gameover'
                cancelAnimationFrame(animationId)
            }
        }
    }

    finish.draw()
    if(player.score === TARGET_SCORE){
        finish.switchSprite('endReached')
    }

    if(hasCollided(player, finish)){
        if(player.score === TARGET_SCORE){
            if(finish.currentFrame === finish.frameRate - 1){
                displayNextLevel()
                gameState = 'next-level'
                cancelAnimationFrame(animationId)
            }
        }
    }


    checkpoint && checkpoint.draw()
    // check collision with the checkpoint

    if(checkpoint){
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

    player.update()

    if(enemy){
        enemy.update()

        if(hasCollided(player, enemy)){
            player.decreaseHealth()
            hearts.splice(player.health, 1)
            if(player.health === 0){
                displayGameover()
                gameState = 'gameover'
                cancelAnimationFrame(animationId)
            }
        }

        if(measureXDistance(player, enemy) < 140){
            enemy.isClose = true
        }else{
            enemy.isClose = false
        }
    }
}

let mainBackground
let mainMenuImage
const showMainMenu = () => {
    gameState = 'main-menu'
    mainBackground = new Background('assets/backgrounds/bg1.png', 0, 0, canvasBg.width, canvasBg.height, context1)
    mainMenuImage = new Sprite('assets/main-menu.png', 0, -60, 1)
    animateBg()
}

let bgId
const animateBg = () => {
    bgId = requestAnimationFrame(animateBg)
    mainBackground.update()
    mainMenuImage.draw()
}

canvas.addEventListener("click", function(event) {
    // To get the x and y of the canvas i.e. the distance from the x and y of browser 
    const rect = canvas.getBoundingClientRect();
    // The x position of mouse in the canvas
    const mouseX = event.clientX - rect.left;
    // The y position of mouse in the canvas
    const mouseY = event.clientY - rect.top;

    // Check for play press
    if(
        mouseX >= 289 &&
        mouseX <= 719 &&
        mouseY >= 260 &&
        mouseY <= 341 &&
        gameState === 'main-menu'
    ){
        cancelAnimationFrame(bgId)
        levels[1].init()
        gameState = 'playing'
        console.log("You pressed play");
    }

    // Check for choose player press
    if(
        mouseX >= 289 &&
        mouseX <= 719 &&
        mouseY >= 370 &&
        mouseY <= 449 &&
        gameState === 'main-menu'
    ){
        gameState = 'playing'
        console.log("You pressed Choose player");
    }

    // check for back press
    if(
        mouseX >= 361 &&
        mouseX <= 417 &&
        mouseY >= 241 &&
        mouseY <= 285 &&
        (gameState === 'next-level' || gameState === 'gameover')
    ){
        gameState = 'back'
        showMainMenu()
    }

    if(
        mouseX >= 480 &&
        mouseX <= 527 &&
        mouseY >= 240 &&
        mouseY <= 285 &&
        gameState === 'next-level'
    ){
        gameState = 'playing'
        levels[2].init()
    }
});

window.onload = () => {
    showMainMenu()
}

let gameState = 'main-menu'

const gameStates = [
    'main-menu',
    'playing',
    'paused',
    'levels',
    'gameover',
    'next-level',
    'choosing-player'
]