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

const addCollisionBlocks = () => {
    let parsedData = parseArrayIn2D(collisionData2)
    // generation of collision blocks from the collision data
    parsedData.forEach((row, rowIndex) => {
        row.forEach((tile, tileIndex) => {
            if(tile === 672){
                collisionBlocks.push(new CollisionBlock(tileIndex * 16, rowIndex * 16))
            }
        })
    })
}

const generateFruits = (fruitType) => {
    let fruitX = 20
    let fruitY = 200
    for(let j = 0; j < 2; j++){
        for(let i = 0; i < 5; i++){
            let fruit = new Fruit(
                fruitX, fruitY, 
                fruitAnimations[fruitType].imageSrc,
                17, fruitAnimations
            )
            fruits.push(fruit)
            fruitX += 30
        }
        fruitX = 20
        fruitY -= 40
    }
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