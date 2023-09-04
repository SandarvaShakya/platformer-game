// All functions related to the player selection

const showPlayerSelection = () => {
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