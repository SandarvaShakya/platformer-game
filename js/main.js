const canvas = document.querySelector('#canvas')
/** @type {HTMLCanvasElement} */
const context = canvas.getContext('2d')

// 1024
canvas.width = 16 * 64 
// 512
canvas.height = 16 * 32

let collisionBlocks = []
const playerAnimations = {
    idleRight: {
        frameRate: 11,
        frameBuffer: 2,
        imageSrc: 'assets/player/idle.png'
    },
    idleLeft: {
        frameRate: 11,
        frameBuffer: 2,
        imageSrc: 'assets/player/idleLeft.png'
    },
    runRight: {
        frameRate: 11,
        frameBuffer: 4,
        imageSrc: 'assets/player/run.png'
    },
    runLeft: {
        frameRate: 11,
        frameBuffer: 4,
        imageSrc: 'assets/player/runLeft.png'
    },
    jumpRight: {
        frameRate: 1,
        frameBuffer: 10,
        imageSrc: 'assets/player/jump.png'
    },
    jumpLeft: {
        frameRate: 1,
        frameBuffer: 10,
        imageSrc: 'assets/player/jumpLeft.png'
    }
}

// The player
let player = new Player(
    208, 208, 32, 32, 
    'assets/player/idle.png', 
    collisionBlocks, 11,
    playerAnimations
)
let background = new Sprite('assets/images/level1.png', 0, 0, 1)

let level1ParsedData = parseArrayIn2D(collisionData1)
// generation of collision blocks from the collision data
level1ParsedData.forEach((row, rowIndex) => {
    row.forEach((tile, tileIndex) => {
        if(tile === 672){
            collisionBlocks.push(new CollisionBlock(tileIndex * 16, rowIndex * 16))
        }
    })
})

let animationId
const animate = () => {
    animationId = requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    background.draw()
    // collisionBlocks.forEach(block => {
    //     block.draw()
    // })
    player.update()
}

animate()