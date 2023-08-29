/**
 * Pareses the !D array into 2D array
 * @param {Array} array is the representation of the map in 1D array according to the tile
 * @returns the 2D array according to the tiles per row
 */
const parseArrayIn2D = (array) => {
    const rows = []
    for(let i = 0; i < array.length; i += 64){
        rows.push(array.slice(i, i + 64))
    }
    return rows
}

const addCollisionBlocks = (collisionData, block) => {
    let parsedData = parseArrayIn2D(collisionData)
    // generation of collision blocks from the collision data
    parsedData.forEach((row, rowIndex) => {
        row.forEach((tile, tileIndex) => {
            if(tile === block){
                collisionBlocks.push(new CollisionBlock(tileIndex * 16, rowIndex * 16))
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
                        17, fruitAnimations,
                        fruitType
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
                        17, fruitAnimations,
                        fruitType
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