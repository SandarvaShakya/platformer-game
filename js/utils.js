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