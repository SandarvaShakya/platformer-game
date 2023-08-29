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

let sawTrap = new Saw(300, 160, 'assets/traps/saw/on.png', 8, sawAnimations)
let spike = new Trap(750, 304, 'assets/traps/spikes/idle.png', 1)
let checkpoint = new CheckPoint(460, 289, 'assets/checkpoint/checkpoint.png', 1, checkPointAnimations)
let finish = new Sprite('assets/end/end.png', 20, 304, 1, endAnimations)

let hearts = []
for(let i = 0; i < player.health; i++){
    let heart = new Sprite('assets/heart/heart.png', 18 + i * 22, 18, 1)
    hearts.push(heart)
}

// Buttons
let restartButton = new Sprite('assets/buttons/Restart.png', canvas.width - 38, canvas.height - 36, 1)
let backButton = new Sprite('assets/buttons/Backmedium.png', canvas.width - 38, canvas.height - 36 - 22, 1)
let levelsButton = new Sprite('assets/buttons/Levels.png', canvas.width - 38, canvas.height - 36 - 44, 1)
let volumeButton = new Sprite('assets/buttons/Volume.png', canvas.width - 38, canvas.height - 36 - 66, 1)

let animationId
const animate = () => {
    animationId = requestAnimationFrame(animate)
    background.update()
    gameLevel.draw()
    restartButton.draw()
    backButton.draw()
    levelsButton.draw()
    volumeButton.draw()
    displayScore()
    finish.draw()
    checkpoint.draw()
    hearts.forEach(heart => {
        heart.draw()
    })

    // collision with fruits
    oranges.forEach(fruit => {
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
        if(player.score === TARGET_SCORE){
            finish.switchSprite('endReached')
            if(finish.currentFrame === finish.frameRate - 1){
                displayNextLevel()
                cancelAnimationFrame(animationId)
            } 
        } 
    }
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
}

window.onload = () => {
    showMainMenu()
}

let mainBackground = new Background('assets/backgrounds/bg1.png', 0, 0, canvasBg.width, canvasBg.height, context1)
let mainMenuImage = new Sprite('assets/main-menu.png', 0, -60, 1)
const showMainMenu = () => {
    animateBg()
}

let bgId
const animateBg = () => {
    bgId = requestAnimationFrame(animateBg)
    mainBackground.update()
    mainMenuImage.draw()
}

canvas.addEventListener("click", function(event) {
    // To get the x and y of the canvas i.e. the distance from the x and y of browser 
    const rect = canvas.getBoundingClientRect();
    // The x position of mouse in the canvas
    const mouseX = event.clientX - rect.left;
    // The y position of mouse in the canvas
    const mouseY = event.clientY - rect.top;

    // Check for play press
    if(
        mouseX >= 289 &&
        mouseX <= 719 &&
        mouseY >= 260 &&
        mouseY <= 341
    ){
        cancelAnimationFrame(bgId)
        animate()
        console.log("You pressed play");
    }

    // Check for choose player press
    if(
        mouseX >= 289 &&
        mouseX <= 719 &&
        mouseY >= 370 &&
        mouseY <= 449
    ){
        console.log("You pressed Choose player");
    }
});