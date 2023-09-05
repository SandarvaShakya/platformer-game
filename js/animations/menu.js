const showMainMenu = () => {
    game.changeStateTo('main-menu')
    cancelAnimationFrame(menuAnimationId)
    mainMenuBackground = new Background('assets/backgrounds/bg1.png', 0, 0, game.width, game.height, context)
    mainMenuImg = new Sprite('assets/main-menu.png', -3, -60, 1)
    player = new Player(230, 80, 32, 32, selectedPlayer.imgSrc, [], 11, selectedPlayer.animations)
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
        // savedGamesButton.draw(context)

        player.draw(context)
    }
}