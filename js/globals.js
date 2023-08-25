// All fruit animations
const fruitAnimations = {
    collided: {
        frameRate: 6,
        frameBuffer: 4,
        loop: false,
        imageSrc: 'assets/fruits/collected.png'
    },
    melon: {
        frameRate: 17,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/fruits/melon.png'
    },
    orange: {
        frameRate: 17,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/fruits/orange.png'
    },
    pineapple: {
        frameRate: 17,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/fruits/pineapple.png'
    }
}

// All Player animations
const playerAnimations = {
    idleRight: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/idle.png'
    },
    idleLeft: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/idleLeft.png'
    },
    runRight: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/run.png'
    },
    runLeft: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/runLeft.png'
    },
    jumpRight: {
        frameRate: 1,
        frameBuffer: 4,
        imageSrc: 'assets/player/jump.png'
    },
    jumpLeft: {
        frameRate: 1,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/jumpLeft.png'
    }
}

// All collision blocks
let collisionBlocks = []