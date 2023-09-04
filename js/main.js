initializeConstantGameButtons()

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
            generateFruits('pineapple', 882, 294, 'rect', 2, 3)
            generateFruits('orange', 260, 110, 'triangle', 3, 3)
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

const gameLoop = () => {
    gameAnimationId = requestAnimationFrame(gameLoop)

    // background and map
    background.update()
    gameMap.draw(context)

    // collisionBlocks.forEach(block => {
    //     block.draw()
    // })

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
                displayGameover()
                game.state = 'gameover'
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
                displayGameover()
                game.state = 'gameover'
                cancelAnimationFrame(gameAnimationId)
            }
        }
    } 

    finish.draw(context)
    if(player.score === TARGET_SCORE){
        finish.switchSprite('endReached')
    }

    if(hasCollided(player, finish)){
        if(player.score === TARGET_SCORE){
            if(finish.currentFrame === finish.frameRate - 1){
                displayNextLevel()
                game.changeStateTo('next-level')
                cancelAnimationFrame(gameAnimationId)
            }
        }
    }

    checkpoint && checkpoint.draw(context)
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

    if(enemy){
        enemy.update(context)

        if(hasCollided(player, enemy)){
            player.decreaseHealth()
            hearts.splice(player.health, 1)
            if(player.health === 0){
                displayGameover()
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

    player.update(context)
}

const showMainMenu = () => {
    game.changeStateTo('main-menu')
    cancelAnimationFrame(menuAnimationId)
    mainMenuBackground = new Background('assets/backgrounds/bg1.png', 0, 0, game.width, game.height, context)
    mainMenuImg = new Sprite('assets/main-menu.png', -3, -60, 1)
    animateMenu()
}

const animateMenu = () => {
    menuAnimationId = requestAnimationFrame(animateMenu)
    if(game.state === 'main-menu'){
        mainMenuBackground.update()
        mainMenuImg.draw(context)

        // Menu Buttons
        playButton.draw(context)
        choosePlayerButton.draw(context)
        levelMakerButton.draw(context)
        levelSelectionButton.draw(context)
    }
}

/////////////////////////////////////////////////////////////
const showLevelBuilder = () => {
    game.changeStateTo('levelBuilder')
    levelBuilderContext.clearRect(0, 0, levelBuilder.width, levelBuilder.height)
    collisionBlocks = []
    generateCustomLevelDataArrays()

    cancelAnimationFrame(menuAnimationId)
    cancelAnimationFrame(gameAnimationId)

    game.hide()
    levelBuilder.show()
    terrianSpriteSheet.show()

    renderGrid()
}

let selectedBoxes = []
levelBuilderCanvas.addEventListener('click', (event) => {
    let { mouseX, mouseY } = findMousePos(levelBuilderCanvas, event)
    parsedCustomLevelData.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            showSelectedRegion(mouseX, mouseY, columnIndex, rowIndex)
        })
    })
})

const parsedTerrianData = parseArrayIn2D(terrianData, 22)
let clickedImg = new Image()
terrianSpriteSheet.canvas.addEventListener('click', (event) => {
    const { mouseX, mouseY } = findMousePos(terrianSpriteSheet.canvas, event)

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
                let imgSrc = mapTile(column)
                clickedImg.src = imgSrc
                clickedImg.onload = () => {
                    selectedBoxes.forEach(selectedBox => {
                        levelBuilderContext.fillStyle = 'rgba(0,0,0,0)'
                        levelBuilderContext.clearRect(selectedBox.x, selectedBox.y, 16, 16)
                        levelBuilderContext.drawImage(clickedImg, selectedBox.x, selectedBox.y, 16, 16)
                        parsedCustomLevelData[selectedBox.rowIndex][selectedBox.columnIndex] = column
                        parsedCustomMapCollisionData[selectedBox.rowIndex][selectedBox.columnIndex] = 733
                    })
                    selectedBoxes = []
                }
            }
        })
    })
})

const renderCustomGameUI = () => {
    customBlocks = []
    parsedCustomLevelData.forEach((row, rowIndex) => {
        row.forEach((blockData, blockDataIndex) => {
            let imgSrc = mapTile(blockData)
            blockX = blockDataIndex * 16
            blockY = rowIndex * 16
            if(imgSrc) customBlocks.push(new RenderBlock(blockX, blockY, 16, 16, imgSrc, customGameContext))
        })
    })
}

const initCustomLevel = () => {
    customGameContext.clearRect(0, 0, customGameCanvas.width, customGameCanvas.height)
    addParsedCollisionBlocks(parsedCustomMapCollisionData, 733, customGameContext)

    player = new Player(20, 20, 32, 32, selectedPlayer.imgSrc, collisionBlocks, 11, selectedPlayer.animations)
    customGameBackground = new Background('assets/backgrounds/bg1.png', 0, 0, canvas.width, canvas.height, customGameContext)
    renderCustomGameUI()
    startCustomGame()
}

const startCustomGame = () => {
    game.changeStateTo('playing')
    customGameId = requestAnimationFrame(startCustomGame)
    customGameBackground.update()
    customBlocks.forEach(block => {
        block.draw()
    })
    renderConstantGameItems(customGameContext)
    player.update(customGameContext)
}

window.onload = () => {
    showMainMenu()
}
////////////////////////////////////////////////////////////
const showLevelSelection = () => {
    game.changeStateTo('playerSelection')
    cancelAnimationFrame(gameAnimationId)
    game.hide()
    playerSelection.show()

    selectionBackground = new Background('assets/select-bg.png', 0, 0, playerSelectionCanvas.width, playerSelectionCanvas.height, playerSelectionContext)

    player1 = new Player(maskMan.x, maskMan.y, 120, 120, maskMan.imgSrc, [], maskMan.frameRate)
    player2 = new Player(pinkMan.x, pinkMan.y, 120, 120, pinkMan.imgSrc, [], pinkMan.frameRate)
    player3 = new Player(virtualGuy.x, virtualGuy.y, 120, 120, virtualGuy.imgSrc, [], virtualGuy.frameRate)

    animateSelection()
}

const animateSelection = () => {
    playerSelectionAnimationId = requestAnimationFrame(animateSelection)
    selectionBackground.draw()
    player1.draw(playerSelectionContext)
    player2.draw(playerSelectionContext)
    player3.draw(playerSelectionContext)
    backButton.draw(playerSelectionContext)
}