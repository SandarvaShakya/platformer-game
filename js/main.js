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

// All end animations
const endAnimations = {
    finish:{
        frameRate: 1,
        frameBuffer: 4,
        loop: false,
        imageSrc: 'assets/end/end.png'
    },
    endReached: {
        frameRate: 8,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/end/endPick.png'
    }
}

let sawTrap = new Saw(300, 160, 'assets/traps/saw/on.png', 8, sawAnimations)
let spike = new Trap(750, 304, 'assets/traps/spikes/idle.png', 1)
let checkpoint = new CheckPoint(460, 289, 'assets/checkpoint/checkpoint.png', 1, checkPointAnimations)
let finish = new Sprite('assets/end/end.png', 20, 304, 1, endAnimations)
// let heart = new Heart(18, 18, 'assets/heart/heart.png')
let hearts = []

for(let i = 0; i < player.health; i++){
    let heart = new Heart(18 + i * 22, 18, 'assets/heart/heart.png')
    hearts.push(heart)
}
let targetScore = 1000
let animationId
const animate = () => {
    animationId = requestAnimationFrame(animate)
    background.update()
    gameLevel.draw()
    finish.draw()
    hearts.forEach(heart => {
        heart.draw()
    })

    // collision with fruits
    fruits.forEach(fruit => {
        fruit.draw()

        if(hasCollided(player, fruit)){
            fruit.switchSprite('collided')
            if(!fruit.hasBeenEaten){
                player.increaseScore()
                fruit.hasBeenEaten = true
            }
        }
    })

    if(hasCollided(player, finish)){
        if(player.score === targetScore){
            finish.switchSprite('endReached')
            if(finish.currentFrame === finish.frameRate - 1){
                displayNextLevel()
                cancelAnimationFrame(animationId)
            } 
        } 
    }

    checkpoint.draw()
    sawTrap.update()
    spike.draw()

    // check collision with the checkpoint
    if(hasCollided(player, checkpoint)){
        if(!player.checkpointReached){
            checkpoint.switchSprite('checkpointReached')
            player.checkpointReached = true
        }
    }

    // change checkpoint sprite after the animation of open is finished
    if(checkpoint.currentFrame === checkpoint.frameRate - 1 && player.checkpointReached){
            checkpoint.switchSprite('checkpointIdle')
    }

    // collision with traps
    if(hasCollided(player, sawTrap) || hasCollided(player, spike)){
        player.decreaseHealth()
        hearts.splice(player.health, 1)
        if(player.health === 0){
            displayGameover()
            cancelAnimationFrame(animationId)
        }
    }
    player.update()
    console.log(player.isMoving)
    displayScore()
}

window.onload = () => {
    animate()
}