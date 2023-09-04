// Player Movements Event Listeners
window.addEventListener('keydown', (event) => {
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

let selectionClick = false
// Various Ingame button clicks listener
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
        console.log("You pressed Choose player");
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
            game.changeStateTo('levelSelection')
            showLevels()
            console.log(selectionClick);
        }else{
            selectionClick = false
            game.changeStateTo('main-menu')
            showMainMenu()
            console.log(selectionClick);
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

// The Play button in level editor
const levelPlayButton = document.getElementById('play-btn')
levelPlayButton.addEventListener('click', (event) => {
    customGame.show()
    levelBuilder.hide()
    terrianSpriteSheet.hide()

    initCustomLevel()
})