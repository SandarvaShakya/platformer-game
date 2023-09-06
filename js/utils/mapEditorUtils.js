// The parsed 2D data array of all the terrian blocks
const parsedTerrianData = parseArrayIn2D(terrianData, 22)

/**
 * This function makes the clicked tile red in the map editor
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