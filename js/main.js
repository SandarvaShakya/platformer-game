const canvas = document.querySelector('#canvas')
const canvasBg = document.querySelector('#canvas-bg')
/** @type {HTMLCanvasElement} */
const context = canvas.getContext('2d')
const context1 = canvasBg.getContext('2d')

// 1024
canvas.width = 16 * 64 
canvasBg.width = 16 * 64
// 512
canvas.height = 16 * 32
canvasBg.height = 16 * 32

// The player
let player = new Player(
    920, 20, 32, 32, 
    'assets/player/idleLeft.png', 
    collisionBlocks, 11,
    playerAnimations
)
let gameLevel = new Sprite('assets/maps/Map2.png', 0, 0, 1)
let background = new Background('assets/backgrounds/bg3.png', 0, 0, canvasBg.width, canvasBg.height, context1)

addCollisionBlocks()
let fruits = []

let fruitX = 20
let fruitY = 200
for(let j = 0; j < 2; j++){
    for(let i = 0; i < 5; i++){
        let fruit = new Fruit(
            fruitX, fruitY, 
            fruitAnimations['melon'].imageSrc,
            17, fruitAnimations
        )
        fruits.push(fruit)
        fruitX += 30
    }
    fruitX = 20
    fruitY -= 40
}

let animationId
const animate = () => {
    animationId = requestAnimationFrame(animate)
    background.update()
    gameLevel.draw()
    fruits.forEach(fruit => {
        fruit.draw()

        if(
            player.x < fruit.x + fruit.width &&
            player.x + player.width > fruit.x &&
            player.y < fruit.y + fruit.height &&
            player.y + player.height > fruit.y
        ){
            fruit.switchSprite('collided')
        }
    })
    player.update()
}

window.onload = () => {
    animate()
}