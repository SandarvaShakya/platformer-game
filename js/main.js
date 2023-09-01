const canvas = document.getElementById('canvas-game')
const context = canvas.getContext('2d')

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
let restartButton = new Sprite('assets/buttons/Restart.png', canvas.width - 38, canvas.height - 36, 1, context)
let backButton = new Sprite('assets/buttons/Backmedium.png', canvas.width - 38, canvas.height - 36 - 22, 1, context)
let levelsButton = new Sprite('assets/buttons/Levels.png', canvas.width - 38, canvas.height - 36 - 44, 1, context)
let volumeButton = new Sprite('assets/buttons/Volume.png', canvas.width - 38, canvas.height - 36 - 66, 1, context)
let playButton = new Sprite('assets/playButton.png', 295, 260, 1, context)
let choosePlayerButton = new Sprite('assets/choosePlayerButton.png', 295, 260 + 120, 1, context)
let levelMakerButton = new Sprite('assets/levelMakerButton.png', 0, 0, 1, context)

levels = {
    1: {
        init: () => {
            // map
            gameMap = new Sprite('assets/maps/Map2.png', 0, 0, 1, context)
            background = new Background('assets/backgrounds/bg3.png', 0, 0, canvas.width, canvas.height, context)

            // traps
            sawTrap = new Saw(300, 160, 'assets/traps/saw/on.png', 8, 1, context, sawAnimations)
            spike = new Trap(750, 304, 'assets/traps/spikes/idle.png', 1, context)

            enemy = null

            // fruits

            // checkpoint end finish
            checkpoint = new CheckPoint(460, 289, 'assets/checkpoint/checkpoint.png', 1, context, checkPointAnimations)
            finish = new Sprite('assets/end/end.png', 20, 304, 1, context, endAnimations)

            // player
            player = new Player(920, 20, 32, 32, 'assets/player/idleLeft.png', collisionBlocks, 11, canvas, context, playerAnimations)

            for(let i = 0; i < player.health; i++){
                let heart = new Sprite('assets/heart/heart.png', 18 + i * 22, 18, 1, context)
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
            gameMap = new Sprite('assets/maps/Map1.png', 0, 0, 1, context)
            background = new Background('assets/backgrounds/bg1.png', 0, 0, canvas.width, canvas.height, context)

            // traps
            sawTrap = new Saw(180, 160, 'assets/traps/saw/on.png', 8, 2, context, sawAnimations)
            spike = new Trap(750, 304, 'assets/traps/spikes/idle.png', 1, context)

            enemy = new Enemy(950, 205, 'assets/enemies/rhino/idle.png', 11, context, rhinoAnimations)

            // checkpoint and finish
            checkpoint = null
            finish = new Sprite('assets/end/end.png', 20, 256, 1, context, endAnimations)

            // player
            player = new Player(100, 20, 32, 32, 'assets/player/idleLeft.png', collisionBlocks, 11, canvas, context, playerAnimations)
            player.isFacing = 'right'
            
            for(let i = 0; i < player.health; i++){
                let heart = new Sprite('assets/heart/heart.png', 18 + i * 22, 18, 1, context)
                hearts.push(heart)
            }
            addCollisionBlocks(collisionData2, 773)
            fruits = []
            generateFruits('pineapple', 882, 294, 'rect', 2, 3)
            generateFruits('orange', 260, 110, 'triangle', 3, 3)
            generateTargetScore()
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
    mainMenuBackground = new Background('assets/backgrounds/bg1.png', 0, 0, canvas.width, canvas.height, context)
    mainMenuImage = new Sprite('assets/main-menu.png', 0, -60, 1, context)
    animateBg()
}

let bgId
let gameItems = new TilesSprites()

const animateBg = () => {
    bgId = requestAnimationFrame(animateBg)
    
    if(gameState === 'main-menu'){
        mainMenuBackground.update()
        mainMenuImage.draw()
        playButton.draw()
        choosePlayerButton.draw()
        levelMakerButton.draw()
    }
}

let gameState = 'main-menu'
// let gameState = 'levelBuilder'

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

/////////////////////////////////////////////////////////////

const levelBuilder = new Editor()
const levelBuilderCanvas = levelBuilder.getCanvas()
const levelBuilderContext = levelBuilderCanvas.getContext('2d')

let levelDataArray = []
let customCollisionArray = []
for(let i = 0; i < 64 * 32; i++){
    levelDataArray[i] = 0
    customCollisionArray[i] = 0
}
const parsedCollisionData = parseArrayIn2D(customCollisionArray, 64)

const parsedLevelData = parseArrayIn2D(levelDataArray, 64)
const showLevelBuilder = () => {
    if(gameState === 'levelBuilder'){
        cancelAnimationFrame(bgId)
        cancelAnimationFrame(gameAnimationId)
        context.clearRect(0, 0, canvas.width, canvas.height)
        canvas.style.display = 'none'

        levelBuilder.show()
        gameItems.show()
        let grid = new Grid(levelBuilderCanvas.width, levelBuilderCanvas.height, 'black', 16, 16, levelBuilderContext)
        grid.draw()
    }
}

// let smallArray
// let animateLevelId
// const animateLevel = () => {
//     animateLevelId = requestAnimationFrame(animateLevel)
//     levelBuilderContext.clearRect(0, 0, levelBuilderCanvas.width, levelBuilderCanvas.height)
//     showLevelBuilder()
//     parsedLevelData.forEach((row, rowIndex) => {
//         row.forEach((column, columnIndex) => {
//             let boxX = columnIndex * 16
//             let boxWidth = (columnIndex * 16) + 16
//             let boxY = rowIndex * 16
//             let boxHeight = (rowIndex * 16) + 16
//             console.log("Collision on", boxX, boxY, mouse.x, mouse.y);
//             if(
//                 mouse.x > boxX &&
//                 mouse.x < boxWidth &&
//                 mouse.y > boxY &&
//                 mouse.y < boxHeight
//             ){
//                 levelBuilderContext.fillStyle = 'rgba(255, 0, 0, 0.5)'
//                 levelBuilderContext.fillRect(columnIndex * 16, rowIndex * 16, 16, 16)
//             }
//         })
//     })
// }

canvas.addEventListener("click", (event) => {
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
        // animateLevel()
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

function objectExistsInArray(object, array) {
    return array.some(item => JSON.stringify(item) === JSON.stringify(object));
}

let selectedBoxes = []
levelBuilderCanvas.addEventListener('click', (event) => {
    // To get the x and y of the canvas i.e. the distance from the x and y of browser 
    const rect = levelBuilderCanvas.getBoundingClientRect();
    // To get the scaling factor
    const canvasScale = levelBuilderCanvas.width / rect.width;
    // The x position of mouse in the canvas
    const mouseX = (event.clientX - rect.left) * canvasScale
    // The y position of mouse in the canvas
    const mouseY = (event.clientY - rect.top) * canvasScale

    parsedLevelData.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            let boxX = columnIndex * 16
            let boxWidth = (columnIndex * 16) + 16
            let boxY = rowIndex * 16
            let boxHeight = (rowIndex * 16) + 16
            let selectedBox = {
                x: boxX,
                y: boxY,
                width: boxWidth,
                height: boxHeight,
                rowIndex,
                columnIndex
            }
            if(
                mouseX > boxX &&
                mouseX < boxWidth &&
                mouseY > boxY &&
                mouseY < boxHeight &&
                !objectExistsInArray(selectedBox, selectedBoxes)
            ){
                levelBuilderContext.fillStyle = 'rgba(255, 0, 0, 0.5)'
                levelBuilderContext.fillRect(columnIndex * 16, rowIndex * 16, 16, 16)
                selectedBoxes.push(selectedBox)
            }
        })
    })
})


const parsedTerrianData = parseArrayIn2D(terrianData, 22)
let selectedImg = new Image()
gameItems.canvas.addEventListener('click', (event) => {
    // To get the x and y of the canvas i.e. the distance from the x and y of browser 
    const rect = gameItems.canvas.getBoundingClientRect();
    // To get the scaling factor
    const canvasScale = gameItems.canvas.width / rect.width;
    // The x position of mouse in the canvas
    const mouseX = (event.clientX - rect.left) * canvasScale
    // The y position of mouse in the canvas
    const mouseY = (event.clientY - rect.top) * canvasScale

    parsedTerrianData.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            let boxX = columnIndex * 16
            let boxWidth = (columnIndex * 16) + 16
            let boxY = rowIndex * 16
            let boxHeight = (rowIndex * 16) + 16
            if(
                mouseX > boxX &&
                mouseX < boxWidth &&
                mouseY > boxY &&
                mouseY < boxHeight
                ){
                mapTile(column)
                selectedImg.onload = () => {
                    selectedBoxes.forEach(selectedBox => {
                        levelBuilderContext.fillStyle = 'rgba(0,0,0,0)'
                        levelBuilderContext.clearRect(selectedBox.x, selectedBox.y, 16, 16)
                        levelBuilderContext.drawImage(selectedImg, selectedBox.x, selectedBox.y, 16, 16)
                        parsedLevelData[selectedBox.rowIndex][selectedBox.columnIndex] = column
                        parsedCollisionData[selectedBox.rowIndex][selectedBox.columnIndex] = 733
                    })
                    selectedBoxes = []
                }
            }
        })
    })
})

// Function that maps the number to the image
const mapTile = (mappingNumber) => {
    if(
        mappingNumber === 51 || 
        mappingNumber === 52 || 
        mappingNumber === 53 ||
        mappingNumber === 29 ||
        mappingNumber === 31
    ){
        selectedImg.src = 'assets/16x16-tiles/normal-grass/normal-center.png'
        return
    }

    if(
        mappingNumber === 139 || 
        mappingNumber === 140 || 
        mappingNumber === 141 ||
        mappingNumber === 119 ||
        mappingNumber === 117
    ){
        selectedImg.src = 'assets/16x16-tiles/dark-grass/dark-center.png'
        return
    }

    if(
        mappingNumber === 205 || 
        mappingNumber === 207 || 
        mappingNumber === 227 ||
        mappingNumber === 228 ||
        mappingNumber === 229
    ){
        selectedImg.src = 'assets/16x16-tiles/light-grass/light-center.png'
        return
    }

    if(
        mappingNumber === 150 || 
        mappingNumber === 151 || 
        mappingNumber === 152 ||
        mappingNumber === 128 ||
        mappingNumber === 130
    ){
        selectedImg.src = 'assets/16x16-tiles/brick/brick-center.png'
        return
    }


    switch(mappingNumber){
        // Normal Grass
        case 7:
            selectedImg.src = 'assets/16x16-tiles/normal-grass/normal-top-left.png'  
        case 8:
            selectedImg.src = 'assets/16x16-tiles/normal-grass/normal-top-center.png'  
            break
        case 9:
            selectedImg.src = 'assets/16x16-tiles/normal-grass/normal-top-right.png'  
            break
        case 30:
            selectedImg.src = 'assets/16x16-tiles/normal-grass/normal-center.png'
            break
        // Dark Grass
        case 95:
            selectedImg.src = 'assets/16x16-tiles/dark-grass/dark-top-left.png'
            break
        case 96:
            selectedImg.src = 'assets/16x16-tiles/dark-grass/dark-top-center.png'
            break
        case 97:
            selectedImg.src = 'assets/16x16-tiles/dark-grass/dark-top-right.png'
            break
        case 118:
            selectedImg.src = 'assets/16x16-tiles/dark-grass/dark-center.png'
            break
        // Light Grass
        case 183:
            selectedImg.src = 'assets/16x16-tiles/light-grass/light-top-left.png'
            break
        case 184:
            selectedImg.src = 'assets/16x16-tiles/light-grass/light-top-center.png'
            break
        case 185:
            selectedImg.src = 'assets/16x16-tiles/light-grass/light-top-right.png'
            break
        case 206:
            selectedImg.src = 'assets/16x16-tiles/light-grass/light-center.png'
            break
        // Stone/Steel Blocks
        case 1:
            selectedImg.src = 'assets/16x16-tiles/steel/steel-top-left.png'
            break
        case 2:
            selectedImg.src = 'assets/16x16-tiles/steel/steel-top-center.png'
            break
        case 3:
            selectedImg.src = 'assets/16x16-tiles/steel/steel-top-right.png'
            break
        case 23:
            selectedImg.src = 'assets/16x16-tiles/steel/steel-center-left.png'
            break
        case 24:
            selectedImg.src = 'assets/16x16-tiles/steel/steel-center.png'
            break
        case 25:
            selectedImg.src = 'assets/16x16-tiles/steel/steel-center-right.png'
            break
        case 45:
            selectedImg.src = 'assets/16x16-tiles/steel/steel-bottom-left.png'
            break
        case 46:
            selectedImg.src = 'assets/16x16-tiles/steel/steel-bottom-center.png'
            break
        case 47:
            selectedImg.src = 'assets/16x16-tiles/steel/steel-bottom-right.png'
            break
        // Wood Blocks
        case 89:
            selectedImg.src = 'assets/16x16-tiles/wood/wood-top-left.png'
            break
        case 90:
            selectedImg.src = 'assets/16x16-tiles/wood/wood-top-center.png'
            break
        case 91:
            selectedImg.src = 'assets/16x16-tiles/wood/wood-top-right.png'
            break
        case 111:
            selectedImg.src = 'assets/16x16-tiles/wood/wood-center-left.png'
            break
        case 112:
            selectedImg.src = 'assets/16x16-tiles/wood/wood-center.png'
            break
        case 113:
            selectedImg.src = 'assets/16x16-tiles/wood/wood-center-right.png'
            break
        case 133:
            selectedImg.src = 'assets/16x16-tiles/wood/wood-bottom-left.png'
            break
        case 134:
            selectedImg.src = 'assets/16x16-tiles/wood/wood-bottom-center.png'
            break
        case 135:
            selectedImg.src = 'assets/16x16-tiles/wood/wood-bottom-right.png'
            break
        // Prismarine Block
        case 177:
            selectedImg.src = 'assets/16x16-tiles/prismarine/prismarine-top-left.png'
            break
        case 178:
            selectedImg.src = 'assets/16x16-tiles/prismarine/prismarine-top-center.png'
            break
        case 179:
            selectedImg.src = 'assets/16x16-tiles/prismarine/prismarine-top-right.png'
            break
        case 199:
            selectedImg.src = 'assets/16x16-tiles/prismarine/prismarine-center-left.png'
            break
        case 200:
            selectedImg.src = 'assets/16x16-tiles/prismarine/prismarine-center.png'
            break
        case 201:
            selectedImg.src = 'assets/16x16-tiles/prismarine/prismarine-center-right.png'
            break
        case 221:
            selectedImg.src = 'assets/16x16-tiles/prismarine/prismarine-bottom-left.png'
            break
        case 222:
            selectedImg.src = 'assets/16x16-tiles/prismarine/prismarine-bottom-center.png'
            break
        case 223:
            selectedImg.src = 'assets/16x16-tiles/prismarine/prismarine-bottom-right.png'
            break
        // Brown Platform
        case 13:
            selectedImg.src = 'assets/16x16-tiles/brown-platform/brown-platform-left.png'
            break
        case 14:
            selectedImg.src = 'assets/16x16-tiles/brown-platform/brown-platform-center.png'
            break
        case 15:
            selectedImg.src = 'assets/16x16-tiles/brown-platform/brown-platform-right.png'
            break
        case 16:
            selectedImg.src = 'assets/16x16-tiles/brown-platform/brown-platform-top.png'
            break
        case 38:
            selectedImg.src = 'assets/16x16-tiles/brown-platform/brown-platform-center-v.png'
            break
        case 60:
            selectedImg.src = 'assets/16x16-tiles/brown-platform/brown-platform-bottom.png'
            break
        case 35:
            selectedImg.src = 'assets/16x16-tiles/brown-platform/brown-single-block.png'
            break
        case 36:
            selectedImg.src = 'assets/16x16-tiles/brown-platform/brown-block-top-left.png'
            break
        case 37:
            selectedImg.src = 'assets/16x16-tiles/brown-platform/brown-block-top-right.png'
            break
        case 58:
            selectedImg.src = 'assets/16x16-tiles/brown-platform/brown-block-bottom-left.png'
            break
        case 59:
            selectedImg.src = 'assets/16x16-tiles/brown-platform/brown-block-bottom-right.png'
            break
        // Gray Platforms
        // Orange Platforms
        // Gold Platforms
        // Small Wood Platform
        case 40:
            selectedImg.src = 'assets/16x16-tiles/small-wood/small-wood-left.png'
            break
        case 41:
            selectedImg.src = 'assets/16x16-tiles/small-wood/small-wood-center.png'
            break
        case 42:
            selectedImg.src = 'assets/16x16-tiles/small-wood/small-wood-right.png'
            break
        // Small Steel Platform
        case 62:
            selectedImg.src = 'assets/16x16-tiles/small-steel/small-steel-left.png'
            break
        case 63:
            selectedImg.src = 'assets/16x16-tiles/small-steel/small-steel-center.png'
            break
        case 64:
            selectedImg.src = 'assets/16x16-tiles/small-steel/small-steel-right.png'
            break
        // Small Gold Platform
        case 18:
            selectedImg.src = 'assets/16x16-tiles/small-gold/small-gold-left.png'
            break
        case 19:
            selectedImg.src = 'assets/16x16-tiles/small-gold/small-gold-center.png'
            break
        case 20:
            selectedImg.src = 'assets/16x16-tiles/small-gold/small-gold-right.png'
            break
        // Bricks
        case 106:
            selectedImg.src = 'assets/16x16-tiles/brick/brick-top-left.png'
            break
        case 107:
            selectedImg.src = 'assets/16x16-tiles/brick/brick-top-center.png'
            break
        case 108:
            selectedImg.src = 'assets/16x16-tiles/brick/brick-top-right.png'
            break
        case 129:
            selectedImg.src = 'assets/16x16-tiles/brick/brick-center.png'
            break
    }
}

const customGame = new CustomGame()
const customGameCanvas = customGame.getCanvas()
const customGameContext = customGame.getContext()

const levelPlayButton = document.getElementById('play-btn')
levelPlayButton.addEventListener('click', (event) => {
    // console.log(editedGameCanvas);
    customGame.show()
    levelBuilder.hide()
    gameItems.hide()

    initCustomLevel()
})

let customBlocks = []
const mapBlocks = (mappingNumber, x, y) => {
    let selectedImg
    if(
        mappingNumber === 51 || 
        mappingNumber === 52 || 
        mappingNumber === 53 ||
        mappingNumber === 29 ||
        mappingNumber === 31
    ){
        selectedImg = 'assets/16x16-tiles/normal-grass/normal-center.png'
    }

    if(
        mappingNumber === 139 || 
        mappingNumber === 140 || 
        mappingNumber === 141 ||
        mappingNumber === 119 ||
        mappingNumber === 117
    ){
        selectedImg = 'assets/16x16-tiles/dark-grass/dark-center.png'
        // return
    }

    if(
        mappingNumber === 205 || 
        mappingNumber === 207 || 
        mappingNumber === 227 ||
        mappingNumber === 228 ||
        mappingNumber === 229
    ){
        selectedImg = 'assets/16x16-tiles/light-grass/light-center.png'
        // return
    }

    if(
        mappingNumber === 150 || 
        mappingNumber === 151 || 
        mappingNumber === 152 ||
        mappingNumber === 128 ||
        mappingNumber === 130
    ){
        selectedImg = 'assets/16x16-tiles/brick/brick-center.png'
        // return
    }


    switch(mappingNumber){
        // Normal Grass
        case 7:
            selectedImg = 'assets/16x16-tiles/normal-grass/normal-top-left.png'  
        case 8:
            selectedImg = 'assets/16x16-tiles/normal-grass/normal-top-center.png'  
            break
        case 9:
            selectedImg = 'assets/16x16-tiles/normal-grass/normal-top-right.png'  
            break
        case 30:
            selectedImg = 'assets/16x16-tiles/normal-grass/normal-center.png'
            break
        // Dark Grass
        case 95:
            selectedImg = 'assets/16x16-tiles/dark-grass/dark-top-left.png'
            break
        case 96:
            selectedImg = 'assets/16x16-tiles/dark-grass/dark-top-center.png'
            break
        case 97:
            selectedImg = 'assets/16x16-tiles/dark-grass/dark-top-right.png'
            break
        case 118:
            selectedImg = 'assets/16x16-tiles/dark-grass/dark-center.png'
            break
        // Light Grass
        case 183:
            selectedImg = 'assets/16x16-tiles/light-grass/light-top-left.png'
            break
        case 184:
            selectedImg = 'assets/16x16-tiles/light-grass/light-top-center.png'
            break
        case 185:
            selectedImg = 'assets/16x16-tiles/light-grass/light-top-right.png'
            break
        case 206:
            selectedImg = 'assets/16x16-tiles/light-grass/light-center.png'
            break
        // Stone/Steel Blocks
        case 1:
            selectedImg = 'assets/16x16-tiles/steel/steel-top-left.png'
            break
        case 2:
            selectedImg = 'assets/16x16-tiles/steel/steel-top-center.png'
            break
        case 3:
            selectedImg = 'assets/16x16-tiles/steel/steel-top-right.png'
            break
        case 23:
            selectedImg = 'assets/16x16-tiles/steel/steel-center-left.png'
            break
        case 24:
            selectedImg = 'assets/16x16-tiles/steel/steel-center.png'
            break
        case 25:
            selectedImg = 'assets/16x16-tiles/steel/steel-center-right.png'
            break
        case 45:
            selectedImg = 'assets/16x16-tiles/steel/steel-bottom-left.png'
            break
        case 46:
            selectedImg = 'assets/16x16-tiles/steel/steel-bottom-center.png'
            break
        case 47:
            selectedImg = 'assets/16x16-tiles/steel/steel-bottom-right.png'
            break
        // Wood Blocks
        case 89:
            selectedImg = 'assets/16x16-tiles/wood/wood-top-left.png'
            break
        case 90:
            selectedImg = 'assets/16x16-tiles/wood/wood-top-center.png'
            break
        case 91:
            selectedImg = 'assets/16x16-tiles/wood/wood-top-right.png'
            break
        case 111:
            selectedImg = 'assets/16x16-tiles/wood/wood-center-left.png'
            break
        case 112:
            selectedImg = 'assets/16x16-tiles/wood/wood-center.png'
            break
        case 113:
            selectedImg = 'assets/16x16-tiles/wood/wood-center-right.png'
            break
        case 133:
            selectedImg = 'assets/16x16-tiles/wood/wood-bottom-left.png'
            break
        case 134:
            selectedImg = 'assets/16x16-tiles/wood/wood-bottom-center.png'
            break
        case 135:
            selectedImg = 'assets/16x16-tiles/wood/wood-bottom-right.png'
            break
        // Prismarine Block
        case 177:
            selectedImg = 'assets/16x16-tiles/prismarine/prismarine-top-left.png'
            break
        case 178:
            selectedImg = 'assets/16x16-tiles/prismarine/prismarine-top-center.png'
            break
        case 179:
            selectedImg = 'assets/16x16-tiles/prismarine/prismarine-top-right.png'
            break
        case 199:
            selectedImg = 'assets/16x16-tiles/prismarine/prismarine-center-left.png'
            break
        case 200:
            selectedImg = 'assets/16x16-tiles/prismarine/prismarine-center.png'
            break
        case 201:
            selectedImg = 'assets/16x16-tiles/prismarine/prismarine-center-right.png'
            break
        case 221:
            selectedImg = 'assets/16x16-tiles/prismarine/prismarine-bottom-left.png'
            break
        case 222:
            selectedImg = 'assets/16x16-tiles/prismarine/prismarine-bottom-center.png'
            break
        case 223:
            selectedImg = 'assets/16x16-tiles/prismarine/prismarine-bottom-right.png'
            break
        // Brown Platform
        case 13:
            selectedImg = 'assets/16x16-tiles/brown-platform/brown-platform-left.png'
            break
        case 14:
            selectedImg = 'assets/16x16-tiles/brown-platform/brown-platform-center.png'
            break
        case 15:
            selectedImg = 'assets/16x16-tiles/brown-platform/brown-platform-right.png'
            break
        case 16:
            selectedImg = 'assets/16x16-tiles/brown-platform/brown-platform-top.png'
            break
        case 38:
            selectedImg = 'assets/16x16-tiles/brown-platform/brown-platform-center-v.png'
            break
        case 60:
            selectedImg = 'assets/16x16-tiles/brown-platform/brown-platform-bottom.png'
            break
        case 35:
            selectedImg = 'assets/16x16-tiles/brown-platform/brown-single-block.png'
            break
        case 36:
            selectedImg = 'assets/16x16-tiles/brown-platform/brown-block-top-left.png'
            break
        case 37:
            selectedImg = 'assets/16x16-tiles/brown-platform/brown-block-top-right.png'
            break
        case 58:
            selectedImg = 'assets/16x16-tiles/brown-platform/brown-block-bottom-left.png'
            break
        case 59:
            selectedImg = 'assets/16x16-tiles/brown-platform/brown-block-bottom-right.png'
            break
        // Gray Platforms
        // Orange Platforms
        // Gold Platforms
        // Small Wood Platform
        case 40:
            selectedImg = 'assets/16x16-tiles/small-wood/small-wood-left.png'
            break
        case 41:
            selectedImg = 'assets/16x16-tiles/small-wood/small-wood-center.png'
            break
        case 42:
            selectedImg = 'assets/16x16-tiles/small-wood/small-wood-right.png'
            break
        // Small Steel Platform
        case 62:
            selectedImg = 'assets/16x16-tiles/small-steel/small-steel-left.png'
            break
        case 63:
            selectedImg = 'assets/16x16-tiles/small-steel/small-steel-center.png'
            break
        case 64:
            selectedImg = 'assets/16x16-tiles/small-steel/small-steel-right.png'
            break
        // Small Gold Platform
        case 18:
            selectedImg = 'assets/16x16-tiles/small-gold/small-gold-left.png'
            break
        case 19:
            selectedImg = 'assets/16x16-tiles/small-gold/small-gold-center.png'
            break
        case 20:
            selectedImg = 'assets/16x16-tiles/small-gold/small-gold-right.png'
            break
        // Bricks
        case 106:
            selectedImg = 'assets/16x16-tiles/brick/brick-top-left.png'
            break
        case 107:
            selectedImg = 'assets/16x16-tiles/brick/brick-top-center.png'
            break
        case 108:
            selectedImg = 'assets/16x16-tiles/brick/brick-top-right.png'
            break
        case 129:
            selectedImg = 'assets/16x16-tiles/brick/brick-center.png'
            break
    }

    if(selectedImg){
        customBlocks.push(new RenderBlock(x * 16, y * 16, 16, 16, selectedImg, customGameContext))
    }
}

const renderCustomGameUI = () => {
    console.log("REndering...", parsedLevelData);
    parsedLevelData.forEach((row, rowIndex) => {
        row.forEach((blockData, blockDataIndex) => {
            mapBlocks(blockData, blockDataIndex, rowIndex)
        })
    })
}

let customGameBackground
const initCustomLevel = () => {
    addParsedCollisionBlocks(parsedCollisionData, 733, customGameContext)

    player = new Player(20, 20, 32, 32, 'assets/player/idle.png', collisionBlocks, 11, customGameCanvas, customGameContext, playerAnimations)
    customGameBackground = new Background('assets/backgrounds/bg1.png', 0, 0, canvas.width, canvas.height, customGameContext)
    
    renderCustomGameUI()
    startCustomGame()
}

let customGameId
const startCustomGame = () => {
    customGameId = requestAnimationFrame(startCustomGame)
    customGameBackground.update()
    console.log("Testing cutsom game");
    collisionBlocks.forEach(block => {
        block.draw()
    })
    customBlocks.forEach(block => {
        block.draw()
    })
    player.update()
}

window.onload = () => {
    showMainMenu()
}


