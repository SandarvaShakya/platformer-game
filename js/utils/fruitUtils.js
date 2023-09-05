/**
 * This function adds the fruits in fruits array and stores it in the specific shape specified
 * 
 * @param {string} fruitType the type of fruit that will be generated ['pineapple', 'melon', 'orange']
 * @param {int} x the x position of the fruit
 * @param {int} y the y position of the fruit
 * @param {string} shape the shape in which you want to generate the fruit in
 * @param {int} rows the number of fruits you want to have vertically
 * @param {int} columns the number of fruits you want to have horizontally
 */
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
                fruitX = x + 20 + (20 * j)
                fruitY -= 30;
            }
            break
    }
}

/**
 * This function generates the goal score based on the fruits array
 */
const generateTargetScore = () => {
    TARGET_SCORE = fruits.reduce((sum, currentFruit) => {
        sum += currentFruit.scorePerFruit
        return sum
    }, 0)
}