/**
 *  Displays the score after the level has finished
 */
const displayScore = (context) => {
    context.fillStyle = 'white'
    context.font = '16px Arial'
    context.fillText(`Score: ${player.score}`, 18, 56)
}

/**
 * This function shows the gameover screen
 * @param {HTMLCanvasElementContext} context the context in which the screen is to shown
 */
const displayGameover = (context) => {
    game.changeStateTo('gameover')
    let gameoverImg = new Image()
    gameoverImg.src = 'assets/gameover.png'
    gameoverImg.onload = () => {
        context.drawImage(gameoverImg, 0, 0)
        backBigButton.draw(context)
        restartBigButton.draw(context)
        levelBigButton.draw(context)
    }
}

/**
 * This function displays the next level screen when you complete a level
 * 
 * @param {HTMLCanvasElementContext} context the context in which the screen is to shown 
 */
const displayNextLevel = (context) => {
    let nextLevelImg = new Image()
    nextLevelImg.src = 'assets/nextLevel.png'
    nextLevelImg.onload = () => {
        context.drawImage(nextLevelImg, 0, 0)
        context.font = '32px Arial'
        context.fillStyle = 'white'
        context.fillText(`${player.score}`, 566, 172)
        backBigButton.draw(context)
        nextBigButton.draw(context)
        levelBigButton.draw(context)
    }
}