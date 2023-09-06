/**
 * This function adds the data of edited map in custom blocks array so that it can be rendered
 */
const addCustomGameBlocks = () => {
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

/**
 * This function inititalizes the required things for playing the custom game
 */
const initCustomLevel = () => {
    customGameContext.clearRect(0, 0, customGameCanvas.width, customGameCanvas.height)
    addParsedCollisionBlocks(parsedCustomMapCollisionData, 733, customGameContext)

    player = new Player(20, 20, 32, 32, selectedPlayer.imgSrc, collisionBlocks, 11, selectedPlayer.animations)
    customGameBackground = new Background('assets/backgrounds/bg1.png', 0, 0, canvas.width, canvas.height, customGameContext)
    addCustomGameBlocks()
    startCustomGame()
}

/**
 * This function is the animation for the custom game
 */
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