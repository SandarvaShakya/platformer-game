/**
 * This function initializes the custom level's sprite data and the collisionBlocks of custom level to [0]
 * then parses it to 2D (64x32)
 */
const generateCustomLevelDataArrays = () => {
    for(let i = 0; i < 64 * 32; i++){
        customLevelDataArray[i] = 0
        customLevelCollisionBlocks[i] = 0
    }
    parsedCustomMapCollisionData = parseArrayIn2D(customLevelCollisionBlocks, 64)
    parsedCustomLevelData = parseArrayIn2D(customLevelDataArray, 64)
}