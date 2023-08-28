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
generateFruits('orange')

const sawAnimations = {
    off:{
        frameRate: 1,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/traps/saw/off.png'
    },
    on: {
        frameRate: 8,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/traps/saw/on.png'
    }
}

let sawTrap = new Saw(300, 160, 'assets/traps/saw/on.png', 8, sawAnimations)
let spike = new Trap(750, 304, 'assets/traps/spikes/idle.png', 1)

let animationId
const animate = () => {
    animationId = requestAnimationFrame(animate)
    background.update()
    gameLevel.draw()

    // collision with fruits
    fruits.forEach((fruit, fruitIndex) => {
        fruit.draw()

        if(hasCollided(player, fruit)){
            fruit.switchSprite('collided')
            fruits.splice(fruitIndex, 1)
            player.increaseScore()
            console.log(player.score);
        }
    })

    sawTrap.update()
    spike.draw()

    // collision with traps
    if(hasCollided(player, sawTrap) || hasCollided(player, spike)){
        player.decreaseHealth()
        if(player.health === 0){
            cancelAnimationFrame(animationId)
        }
    }
    player.update()
}

window.onload = () => {
    animate()
}