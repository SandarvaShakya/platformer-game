/**
 * Parses the 2D array into 2D array
 * @param {Array} array is the representation of the map in 1D array according to the tile
 * @returns the 2D array according to the tiles per row
 */
const parseArrayIn2D = (array, numberOfTiles) => {
    const rows = []
    for(let i = 0; i < array.length; i += numberOfTiles){
        rows.push(array.slice(i, i + numberOfTiles))
    }
    return rows
}

const addCollisionBlocks = (collisionData, block) => {
    let parsedData = parseArrayIn2D(collisionData, 64)
    // generation of collision blocks from the collision data
    parsedData.forEach((row, rowIndex) => {
        row.forEach((tile, tileIndex) => {
            if(tile === block){
                collisionBlocks.push(new CollisionBlock(tileIndex * 16, rowIndex * 16, context))
            }
        })
    })
}

const addParsedCollisionBlocks = (parsedCustomMapCollisionData, block, context) => {
    // generation of collision blocks from the collision data
    parsedCustomMapCollisionData.forEach((row, rowIndex) => {
        row.forEach((tile, tileIndex) => {
            if(tile === block){
                collisionBlocks.push(new CollisionBlock(tileIndex * 16, rowIndex * 16, context))
            }
        })
    })
}

const generateFruits = (fruitType, x, y, shape, rows, columns) => {
    let fruitX = x
    let fruitY = y

    switch(shape){
        case 'rect':
            for(let j = 0; j < rows; j++){
                for(let i = 0; i < columns; i++){
                    let fruit = new Fruit(
                        fruitX, fruitY, 
                        fruitAnimations[fruitType].imageSrc,
                        17,
                        fruitType,
                        fruitAnimations
                    )
                    fruits.push(fruit)
                    fruitX += 30
                }
                fruitX = x
                fruitY -= 40
            }
            break
        case 'triangle':
            for(let j = 0; j < rows; j++){
                for(let i = 0; i < (columns - j); i++){
                    let fruit = new Fruit(
                        fruitX, fruitY, 
                        fruitAnimations[fruitType].imageSrc,
                        17,
                        fruitType,
                        fruitAnimations
                    );
                    fruits.push(fruit);
                    fruitX += 40;
                }
                // fruitX = x + (15 * j);
                fruitX = x + 20 + (20 * j)
                fruitY -= 30;
            }
            break
    }
}

const generateTargetScore = () => {
    TARGET_SCORE = fruits.reduce((sum, currentFruit) => {
        sum += currentFruit.scorePerFruit
        return sum
    }, 0)
}

/**
 * collision detection of the objects
 * @param {object} object1 any square objects
 * @param {object} object2 any two square objects
 * @returns true if the objects has collided
 */
const hasCollided = (object1, object2) => {
    if(
        object1.x + object1.width >= object2.x &&
        object1.x <= object2.x + object2.width &&
        object1.y + object1.height >= object2.y &&
        object1.y <= object2.y + object2.height
    ){
        return true
    }
    return false
}

/**
 *  Displays the score while playing the game
 */
const displayScore = () => {
    context.fillStyle = 'white'
    context.font = '16px Arial'
    context.fillText(`Score: ${player.score}`, 18, 56)
}

const displayGameover = () => {
    let gameoverImg = new Image()
    gameoverImg.src = 'assets/gameover.png'
    console.log("Game over brother");
    gameoverImg.onload = () => {
        context.drawImage(gameoverImg, 0, 0)
    }
}

const displayNextLevel = () => {
    let nextLevelImg = new Image()
    nextLevelImg.src = 'assets/nextLevel.png'
    nextLevelImg.onload = () => {
        context.drawImage(nextLevelImg, 0, 0)
        context.font = '32px Arial'
        context.fillStyle = 'white'
        context.fillText(`${player.score}`, 566, 188)
    }
}

const measureXDistance = (obj1, obj2) => {
    let distance = Math.floor((Math.sqrt(Math.pow((obj2.x - obj1.x),2) + Math.pow((obj2.y - obj1.y), 2))))
    return distance
}

/**
 * Generetare and parses the data and collision arrays for level editor
 */
const generateCustomLevelDataArrays = () => {
    for(let i = 0; i < 64 * 32; i++){
        customLevelDataArray[i] = 0
        customLevelCollisionBlocks[i] = 0
    }
    parsedCustomMapCollisionData = parseArrayIn2D(customLevelCollisionBlocks, 64)
    parsedCustomLevelData = parseArrayIn2D(customLevelDataArray, 64)
}

/**
 * Draws the grid in the level editor canvas
 */
const renderGrid = () => {
    let grid = new Grid(levelBuilderCanvas.width, levelBuilderCanvas.height, 'black', 16, 16)
    grid.draw(levelBuilderContext)
}

/**
 * Checks if the object exists in an array
 * @param {Object} object 
 * @param {Array} array 
 * @returns boolean
 */
function objectExistsInArray(object, array) {
    return array.some(item => JSON.stringify(item) === JSON.stringify(object));
}

/**
 * 
 * @param {HTMLElement} element the element with respect to which we need to find x and y of mouse
 * @param {Event} event the event object
 * @returns the mouseX and mouseY positions
 */
const findMousePos = (element, event) => {
    // To get the x and y of the canvas i.e. the distance from the x and y of browser
    const rect = element.getBoundingClientRect();
    // To get the scaling factor
    const canvasScale = element.width / rect.width;
    // The x position of mouse in the canvas
    const mouseX = (event.clientX - rect.left) * canvasScale
    // The y position of mouse in the canvas
    const mouseY = (event.clientY - rect.top) * canvasScale
    return {mouseX, mouseY}
}

// Function that maps the number to the image
const mapTile = (mappingNumber) => {
    if(
        mappingNumber === 51 || 
        mappingNumber === 52 || 
        mappingNumber === 53 ||
        mappingNumber === 29 ||
        mappingNumber === 31
    ){
        return 'assets/16x16-tiles/normal-grass/normal-center.png'
    }

    if(
        mappingNumber === 139 || 
        mappingNumber === 140 || 
        mappingNumber === 141 ||
        mappingNumber === 119 ||
        mappingNumber === 117
    ){
        return 'assets/16x16-tiles/dark-grass/dark-center.png'
    }

    if(
        mappingNumber === 205 || 
        mappingNumber === 207 || 
        mappingNumber === 227 ||
        mappingNumber === 228 ||
        mappingNumber === 229
    ){
        return 'assets/16x16-tiles/light-grass/light-center.png'
    }

    if(
        mappingNumber === 150 || 
        mappingNumber === 151 || 
        mappingNumber === 152 ||
        mappingNumber === 128 ||
        mappingNumber === 130
    ){
        return 'assets/16x16-tiles/brick/brick-center.png'
    }

    switch(mappingNumber){
        // Normal Grass
        case 7:
            return 'assets/16x16-tiles/normal-grass/normal-top-left.png'  
        case 8:
            return 'assets/16x16-tiles/normal-grass/normal-top-center.png'  
        case 9:
            return 'assets/16x16-tiles/normal-grass/normal-top-right.png'  
        case 30:
            return 'assets/16x16-tiles/normal-grass/normal-center.png'
        // Dark Grass
        case 95:
            return 'assets/16x16-tiles/dark-grass/dark-top-left.png'
        case 96:
            return 'assets/16x16-tiles/dark-grass/dark-top-center.png'
        case 97:
            return 'assets/16x16-tiles/dark-grass/dark-top-right.png'
        case 118:
            return 'assets/16x16-tiles/dark-grass/dark-center.png'
        // Light Grass
        case 183:
            return 'assets/16x16-tiles/light-grass/light-top-left.png'
        case 184:
            return 'assets/16x16-tiles/light-grass/light-top-center.png'
        case 185:
            return 'assets/16x16-tiles/light-grass/light-top-right.png'
        case 206:
            return 'assets/16x16-tiles/light-grass/light-center.png'
        // Stone/Steel Blocks
        case 1:
            return 'assets/16x16-tiles/steel/steel-top-left.png'
        case 2:
            return 'assets/16x16-tiles/steel/steel-top-center.png'
        case 3:
            return 'assets/16x16-tiles/steel/steel-top-right.png'
        case 23:
            return 'assets/16x16-tiles/steel/steel-center-left.png'
        case 24:
            return 'assets/16x16-tiles/steel/steel-center.png'
        case 25:
            return 'assets/16x16-tiles/steel/steel-center-right.png'
        case 45:
            return 'assets/16x16-tiles/steel/steel-bottom-left.png'
        case 46:
            return 'assets/16x16-tiles/steel/steel-bottom-center.png'
        case 47:
            return 'assets/16x16-tiles/steel/steel-bottom-right.png'
        // Wood Blocks
        case 89:
            return 'assets/16x16-tiles/wood/wood-top-left.png'
        case 90:
            return 'assets/16x16-tiles/wood/wood-top-center.png'
        case 91:
            return 'assets/16x16-tiles/wood/wood-top-right.png'
        case 111:
            return 'assets/16x16-tiles/wood/wood-center-left.png'
        case 112:
            return 'assets/16x16-tiles/wood/wood-center.png'
        case 113:
            return 'assets/16x16-tiles/wood/wood-center-right.png'
        case 133:
            return 'assets/16x16-tiles/wood/wood-bottom-left.png'
        case 134:
            return 'assets/16x16-tiles/wood/wood-bottom-center.png'
        case 135:
            return 'assets/16x16-tiles/wood/wood-bottom-right.png'
        // Prismarine Block
        case 177:
            return 'assets/16x16-tiles/prismarine/prismarine-top-left.png'
        case 178:
            return 'assets/16x16-tiles/prismarine/prismarine-top-center.png'
        case 179:
            return 'assets/16x16-tiles/prismarine/prismarine-top-right.png'
        case 199:
            return 'assets/16x16-tiles/prismarine/prismarine-center-left.png'
        case 200:
            return 'assets/16x16-tiles/prismarine/prismarine-center.png'
        case 201:
            return 'assets/16x16-tiles/prismarine/prismarine-center-right.png'
        case 221:
            return 'assets/16x16-tiles/prismarine/prismarine-bottom-left.png'
        case 222:
            return 'assets/16x16-tiles/prismarine/prismarine-bottom-center.png'
        case 223:
            return 'assets/16x16-tiles/prismarine/prismarine-bottom-right.png'
        // Brown Platform
        case 13:
            return 'assets/16x16-tiles/brown-platform/brown-platform-left.png'
        case 14:
            return 'assets/16x16-tiles/brown-platform/brown-platform-center.png'
        case 15:
            return 'assets/16x16-tiles/brown-platform/brown-platform-right.png'
        case 16:
            return 'assets/16x16-tiles/brown-platform/brown-platform-top.png'
        case 38:
            return 'assets/16x16-tiles/brown-platform/brown-platform-center-v.png'
        case 60:
            return 'assets/16x16-tiles/brown-platform/brown-platform-bottom.png'
        case 35:
            return 'assets/16x16-tiles/brown-platform/brown-single-block.png'
        case 36:
            return 'assets/16x16-tiles/brown-platform/brown-block-top-left.png'
        case 37:
            return 'assets/16x16-tiles/brown-platform/brown-block-top-right.png'
        case 58:
            return 'assets/16x16-tiles/brown-platform/brown-block-bottom-left.png'
        case 59:
            return 'assets/16x16-tiles/brown-platform/brown-block-bottom-right.png'
        // Gray Platforms
        // Orange Platforms
        // Gold Platforms
        // Small Wood Platform
        case 40:
            return 'assets/16x16-tiles/small-wood/small-wood-left.png'
        case 41:
            return 'assets/16x16-tiles/small-wood/small-wood-center.png'
        case 42:
            return 'assets/16x16-tiles/small-wood/small-wood-right.png'
        // Small Steel Platform
        case 62:
            return 'assets/16x16-tiles/small-steel/small-steel-left.png'
        case 63:
            return 'assets/16x16-tiles/small-steel/small-steel-center.png'
        case 64:
            return 'assets/16x16-tiles/small-steel/small-steel-right.png'
        // Small Gold Platform
        case 18:
            return 'assets/16x16-tiles/small-gold/small-gold-left.png'
        case 19:
            return 'assets/16x16-tiles/small-gold/small-gold-center.png'
        case 20:
            return 'assets/16x16-tiles/small-gold/small-gold-right.png'
        // Bricks
        case 106:
            return 'assets/16x16-tiles/brick/brick-top-left.png'
        case 107:
            return 'assets/16x16-tiles/brick/brick-top-center.png'
        case 108:
            return 'assets/16x16-tiles/brick/brick-top-right.png'
        case 129:
            return 'assets/16x16-tiles/brick/brick-center.png'
    }
}

/**
 * This function makes the clicked tile red
 * @param {int} mouseX the x position of the mouse
 * @param {int} mouseY the y position of the mouse
 * @param {int} columnIndex the index of the 1D array
 * @param {int} rowIndex the index of the 2D array
 */
const showSelectedRegion = (mouseX, mouseY, columnIndex, rowIndex) => {
    let tileX = columnIndex * 16
    let tileWidth = (columnIndex * 16) + 16
    let tileY = rowIndex * 16
    let tileHeight = (rowIndex * 16) + 16
    let selectedBox = {
        x: tileX,
        y: tileY,
        width: tileWidth,
        height: tileHeight,
        rowIndex,
        columnIndex
    }
    if(
        mouseX > tileX &&
        mouseX < tileWidth &&
        mouseY > tileY &&
        mouseY < tileHeight &&
        !objectExistsInArray(selectedBox, selectedBoxes)
    ){
        let tileColor = 'rgba(255, 0, 0, 0.5)'
        levelBuilder.drawRect(tileX, tileY, 16, 16, tileColor)
        selectedBoxes.push(selectedBox)
    }
}

// Function to initialize the constant buttons
const initializeConstantGameButtons = () => {
    restartButton = new Sprite(
        BUTTONS.restart.imgSrc, 
        BUTTONS.restart.position.x, 
        BUTTONS.restart.position.y, 
        BUTTONS.restart.frameRate
    )
    backButton = new Sprite(
        BUTTONS.back.imgSrc, 
        BUTTONS.back.position.x, 
        BUTTONS.back.position.y, 
        BUTTONS.back.frameRate
    )
    levelsButton = new Sprite(
        BUTTONS.levels.imgSrc, 
        BUTTONS.levels.position.x, 
        BUTTONS.levels.position.y, 
        BUTTONS.levels.frameRate
    )
    volumeButton = new Sprite(
        BUTTONS.volume.imgSrc, 
        BUTTONS.volume.position.x, 
        BUTTONS.volume.position.y, 
        BUTTONS.volume.frameRate
    )
    playButton = new Sprite(
        BUTTONS.play.imgSrc,
        BUTTONS.play.position.x,
        BUTTONS.play.position.y,
        BUTTONS.play.frameRate
    )
    choosePlayerButton = new Sprite(
        BUTTONS.choosePlayer.imgSrc,
        BUTTONS.choosePlayer.position.x,
        BUTTONS.choosePlayer.position.y,
        BUTTONS.choosePlayer.frameRate,
    )
    levelMakerButton = new Sprite(
        BUTTONS.levelMaker.imgSrc,
        BUTTONS.levelMaker.position.x,
        BUTTONS.levelMaker.position.y,
        BUTTONS.levelMaker.frameRate,
    )
    levelSelectionButton = new Sprite(
        BUTTONS.levelSelection.imgSrc,
        BUTTONS.levelSelection.position.x,
        BUTTONS.levelSelection.position.y,
        BUTTONS.levelSelection.frameRate,
    )
    savedGamesButton = new Sprite(
        BUTTONS.savedGames.imgSrc,
        BUTTONS.savedGames.position.x,
        BUTTONS.savedGames.position.y,
        BUTTONS.savedGames.frameRate,
    )
}

// Renders the buttons and constant items
const renderConstantGameItems = (context) => {
    restartButton.draw(context)
    backButton.draw(context)
    levelsButton.draw(context)
    volumeButton.draw(context)

    displayScore()

    hearts.forEach(heart => {
        heart.draw(context)
    })
}

// Restarts the game
const restartGame = () => {
    cancelAnimationFrame(gameAnimationId)
    if(levels[currentLevel]){
        levels[currentLevel].init()
    }
}