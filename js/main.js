const canvas = document.getElementById('canvas-game')
// const canvasBg = document.getElementById('canvas-background')
/** @type {HTMLCanvasElement} */
const context = canvas.getContext('2d')
// const context1 = canvasBg.getContext('2d')

// 1024
canvas.width = 16 * 64 
// // 512
canvas.height = 16 * 32

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
let playButton = new Sprite('assets/playButton.png', 295, 260, 1)
let choosePlayerButton = new Sprite('assets/choosePlayerButton.png', 295, 260 + 120, 1)
let levelMakerButton = new Sprite('assets/levelMakerButton.png', 0, 0, 1)

levels = {
    1: {
        init: () => {
            // map
            gameMap = new Sprite('assets/maps/Map2.png', 0, 0, 1)
            background = new Background('assets/backgrounds/bg3.png', 0, 0, canvas.width, canvas.height)

            // traps
            sawTrap = new Saw(300, 160, 'assets/traps/saw/on.png', 8, sawAnimations, 1)
            spike = new Trap(750, 304, 'assets/traps/spikes/idle.png', 1)

            enemy = null

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
            fruits = []
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
            background = new Background('assets/backgrounds/bg1.png', 0, 0, canvas.width, canvas.height)

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

let currentLevel = 1
let gameAnimationId
const animate = () => {
    // cancelAnimationFrame(bgId)
    gameAnimationId = requestAnimationFrame(animate)
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
                cancelAnimationFrame(gameAnimationId)
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
                cancelAnimationFrame(gameAnimationId)
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
                cancelAnimationFrame(gameAnimationId)
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
                cancelAnimationFrame(gameAnimationId)
            }
        }

        if(measureXDistance(player, enemy) < 140){
            enemy.isClose = true
        }else{
            enemy.isClose = false
        }
    }
}

let mainMenuBackground
let mainMenuImage
const showMainMenu = () => {
    gameState = 'main-menu'
    mainMenuBackground = new Background('assets/backgrounds/bg1.png', 0, 0, canvas.width, canvas.height)
    mainMenuImage = new Sprite('assets/main-menu.png', 0, -60, 1)
    animateBg()
}

let bgId
const animateBg = () => {
    bgId = requestAnimationFrame(animateBg)
    mainMenuBackground.update()
    mainMenuImage.draw()

    if(gameState === 'main-menu'){
        playButton.draw()
        choosePlayerButton.draw()
        levelMakerButton.draw()
    }
}

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
    'choosing-player',
    'back',
    'levelBuilder'
]

const levelBuilderCanvas = document.getElementById('canvas-editor')
const contextLevelBuilder = levelBuilderCanvas.getContext('2d')

levelBuilderCanvas.width = canvas.width
levelBuilderCanvas.height = canvas.height

const showLevelBuilder = () => {
    if(gameState === 'levelBuilder'){
        cancelAnimationFrame(bgId)
        cancelAnimationFrame(gameAnimationId)
        context.clearRect(0, 0, canvas.width, canvas.height)
        // context1.clearRect(0, 0, canvas.width, canvas.height)
        canvas.style.display = 'none'
        const gridImg = new Image()
        gridImg.src = 'assets/grids.png'
        gridImg.onload = () => {
            contextLevelBuilder.drawImage(gridImg, -3, -60)
        }

        const parsedGridData = parseArrayIn2D(gridData)
        console.log(parsedGridData);
        parsedGridData.forEach((row, rowIndex) => {
            row.forEach((tile, tileIndex) => {
                // contextLevelBuilder.fillStyle = 'red'
                // contextLevelBuilder.fillRect(tileIndex * 16, rowIndex * 16, 16, 16)
                if(tile === 1){
                    contextLevelBuilder.fillStyle = 'green'
                    contextLevelBuilder.fillRect(tileIndex * 16, rowIndex * 16, 16, 16)
                }
            })
        })

    }
}

canvas.addEventListener("click", function(event) {
    // To get the x and y of the canvas i.e. the distance from the x and y of browser 
    const rect = canvas.getBoundingClientRect();
    // To get the scaling factor
    const canvasScale = canvas.width / rect.width;
    // The x position of mouse in the canvas
    const mouseX = (event.clientX - rect.left) * canvasScale
    // The y position of mouse in the canvas
    const mouseY = (event.clientY - rect.top) * canvasScale

    console.log(mouseX, mouseY, rect.left, rect.top);

    // Check for play press
    if(
        mouseX > playButton.x &&
        mouseX < playButton.x + playButton.width &&
        mouseY > playButton.y &&
        mouseY < playButton.y + playButton.height &&
        gameState === 'main-menu'
    ){
        cancelAnimationFrame(bgId)
        if(levels[currentLevel]){
            levels[currentLevel].init()
            gameState = 'playing'
        }
        console.log("You pressed play");
    }

    // Check for choose player press
    if(
        mouseX >= choosePlayerButton.x &&
        mouseX <= choosePlayerButton.x + choosePlayerButton.width &&
        mouseY >= choosePlayerButton.y &&
        mouseY <= choosePlayerButton.y + choosePlayerButton.height &&
        gameState === 'main-menu'
    ){
        console.log("You pressed Choose player");
    }

    if(
        mouseX >= levelMakerButton.x &&
        mouseX <= levelMakerButton.x + levelMakerButton.width &&
        mouseY >= levelMakerButton.y &&
        mouseY <= levelMakerButton.y + levelMakerButton.height &&
        gameState === 'main-menu'
    ){
        gameState = 'levelBuilder'
        showLevelBuilder()
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
        currentLevel = 1
        showMainMenu()
    }

    if(
        mouseX >= 480 &&
        mouseX <= 527 &&
        mouseY >= 240 &&
        mouseY <= 285 &&
        gameState === 'next-level'
    ){
        currentLevel++
        if(levels[currentLevel]){
            levels[currentLevel].init()
            gameState = 'playing'
        }
    }
});