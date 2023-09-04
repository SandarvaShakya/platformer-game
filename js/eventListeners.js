// Player Movements Event Listeners
window.addEventListener('keydown', (event) => {
    if(game.state !== 'playing') return
    switch(event.key){
        case 'w':
            if(player.velocity.y === 0) player.jump()
            break
        case ' ': 
            if(player.velocity.y === 0) player.jump()
            break
        case 'ArrowUp':
            if(player.velocity.y === 0) player.jump()
            break
        case 'a':
            player.isMovingLeft = true
            player.moveLeft()
            break
        case 'ArrowLeft':
            player.isMovingLeft = true
            player.moveLeft()
            break
        case 'd':
            player.isMovingRight = true
            player.moveRight()
            break
        case 'ArrowRight':
            player.isMovingRight = true
            player.moveRight()
            break
    }
})

// Player Movements Event Listeners
window.addEventListener('keyup', (event) => {
    if(game.state !== 'playing') return
    switch(event.key){
        case 'w':
            player.stopJump()
            break
        case ' ': 
            player.stopJump()
            break
        case 'ArrowUp': 
            player.stopJump()
            break
        case 'a':
            player.isMovingLeft = false
            player.stopLeft()
            break
        case 'ArrowLeft':
            player.isMovingLeft = false
            player.stopLeft()
            break
        case 'd':
            player.isMovingRight = false
            player.stopRight()
            break
        case 'ArrowRight':
            player.isMovingRight = false
            player.stopRight()
            break
    }
})

// to check if the level selection button is clicked in the main menu
let selectionClick = false
// click events in the actual game and menu
canvas.addEventListener("click", (event) => {
    const {mouseX, mouseY} = findMousePos(canvas, event)

    // Check for play press
    if(
        mouseX > playButton.x &&
        mouseX < playButton.x + playButton.width &&
        mouseY > playButton.y &&
        mouseY < playButton.y + playButton.height &&
        game.state === 'main-menu'
    ){
        cancelAnimationFrame(menuAnimationId)
        if(levels[currentLevel]){
            levels[currentLevel].init()
        }
    }

    // Check for choose player press
    if(
        mouseX >= choosePlayerButton.x &&
        mouseX <= choosePlayerButton.x + choosePlayerButton.width &&
        mouseY >= choosePlayerButton.y &&
        mouseY <= choosePlayerButton.y + choosePlayerButton.height &&
        game.state === 'main-menu'
    ){
        showPlayerSelection()
    }

    if(
        mouseX >= levelMakerButton.x &&
        mouseX <= levelMakerButton.x + levelMakerButton.width &&
        mouseY >= levelMakerButton.y &&
        mouseY <= levelMakerButton.y + levelMakerButton.height &&
        game.state === 'main-menu'
    ){
        game.changeStateTo('levelBuilder')
        showLevelBuilder()
    }

    if(
        mouseX >= levelSelectionButton.x &&
        mouseX <= levelSelectionButton.x + levelSelectionButton.width &&
        mouseY >= levelSelectionButton.y &&
        mouseY <= levelSelectionButton.y + levelSelectionButton.height &&
        game.state === 'main-menu' || game.state === 'levelSelection'
    ){
        if(!selectionClick){
            selectionClick = true
            game.showLevels()
        }else{
            selectionClick = false
            showMainMenu()
        }
    }

    // Restart the game
    if(
        mouseX >= restartButton.x &&
        mouseX <= restartButton.x + restartButton.width &&
        mouseY >= restartButton.y &&
        mouseY <= restartButton.y + restartButton.height &&
        game.state === 'playing'
    ){
        restartGame()
    }

    // Go back to main menu on back press
    if(
        mouseX >= backButton.x &&
        mouseX <= backButton.x + backButton.width &&
        mouseY >= backButton.y &&
        mouseY <= backButton.y + backButton.height &&
        game.state === 'playing'
    ){
        cancelAnimationFrame(gameAnimationId)
        showMainMenu()
    }

    // check for back press
    if(
        mouseX >= 361 &&
        mouseX <= 417 &&
        mouseY >= 241 &&
        mouseY <= 285 &&
        (game.state === 'next-level' || game.state === 'gameover')
    ){
        game.state = 'back'
        currentLevel = 1
        showMainMenu()
    }

    if(
        mouseX >= 480 &&
        mouseX <= 527 &&
        mouseY >= 240 &&
        mouseY <= 285 &&
        game.state === 'next-level'
    ){
        currentLevel++
        if(levels[currentLevel]){
            levels[currentLevel].init()
            game.state = 'playing'
        }
    }
});

// click events in the custom map
customGameCanvas.addEventListener('click', (event) => {
    let { mouseX, mouseY } = findMousePos(customGameCanvas, event)
    // Restart the game
    if(
        mouseX >= restartButton.x &&
        mouseX <= restartButton.x + restartButton.width &&
        mouseY >= restartButton.y &&
        mouseY <= restartButton.y + restartButton.height &&
        game.state === 'playing'
    ){
        console.log("Pressed Restart");
    }

    // Go back to main menu on back press
    if(
        mouseX >= backButton.x &&
        mouseX <= backButton.x + backButton.width &&
        mouseY >= backButton.y &&
        mouseY <= backButton.y + backButton.height &&
        game.state === 'playing'
    ){
        cancelAnimationFrame(customGameId)
        customGame.hide()
        game.show()
        showMainMenu()
    }
})

// Click events in player selection screen
playerSelectionCanvas.addEventListener('click', (event) => {
    let { mouseX, mouseY } = findMousePos(playerSelectionCanvas, event)

    // Go back to main menu on back press
    if(
        mouseX >= backButton.x &&
        mouseX <= backButton.x + backButton.width &&
        mouseY >= backButton.y &&
        mouseY <= backButton.y + backButton.height &&
        game.state === 'playerSelection'
    ){
        cancelAnimationFrame(playerSelectionAnimationId)
        playerSelection.hide()
        game.show()
        showMainMenu()
    }

    // If maskMan is clicked
    if(
        mouseX >= player1.x &&
        mouseX <= player1.x + player1.width &&
        mouseY >= player1.y &&
        mouseY <= player1.y + player1.height &&
        game.state === 'playerSelection'
    ){
        selectedPlayer = {
            imgSrc: 'assets/player/player1/idleLeft.png',
            animations: player1Animations
        }
    }

    // If pinkMan is clicked
    if(
        mouseX >= player2.x &&
        mouseX <= player2.x + player2.width &&
        mouseY >= player2.y &&
        mouseY <= player2.y + player2.height &&
        game.state === 'playerSelection'
    ){
        selectedPlayer = {
            imgSrc: 'assets/player/player2/idleLeft.png',
            animations: player2Animations
        }
    }

    // If virtualGuy is clicked
    if(
        mouseX >= player3.x &&
        mouseX <= player3.x + player3.width &&
        mouseY >= player3.y &&
        mouseY <= player3.y + player3.height &&
        game.state === 'playerSelection'
    ){
        selectedPlayer = {
            imgSrc: 'assets/player/player3/idleLeft.png',
            animations: player3Animations
        }
    }
})

// click event when the level editor's grid is clicked
levelBuilderCanvas.addEventListener('click', (event) => {
    let { mouseX, mouseY } = findMousePos(levelBuilderCanvas, event)
    parsedCustomLevelData.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            showSelectedRegion(mouseX, mouseY, columnIndex, rowIndex)
        })
    })
})

// add the clicked terrian data and image on click to the terrian canvas
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

// The Play button in level editor
const levelPlayButton = document.getElementById('play-btn')
levelPlayButton.addEventListener('click', (event) => {
    customGame.show()
    levelBuilder.hide()
    terrianSpriteSheet.hide()

    initCustomLevel()
})