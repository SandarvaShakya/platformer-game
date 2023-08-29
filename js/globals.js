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
        imageSrc: 'assets/fruits/pineapple.png',
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
    },
    hit:{
        frameRate: 7,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/hit.png'
    },
    hitLeft: {
        frameRate: 7,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/hitLeft.png'
    }
}

// All Saw animations
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

// All Checkpoint animations
const checkPointAnimations = {
    checkpoint:{
        frameRate: 1,
        frameBuffer: 4,
        loop: false,
        imageSrc: 'assets/checkpoint/checkpoint.png'
    },
    checkpointReached: {
        frameRate: 26,
        frameBuffer: 4,
        loop: false,
        imageSrc: 'assets/checkpoint/outCheckPoint.png'
    },
    checkpointIdle: {
        frameRate: 10,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/checkpoint/IdleCheckPoint.png'
    },
}

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

const rhinoAnimations = {
    idle:{
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/enemies/rhino/idle.png'
    },
    idleRight:{
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/enemies/rhino/idleRight.png'
    },
    runLeft: {
        frameRate: 6,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/enemies/rhino/runLeft.png'
    },
    runRight: {
        frameRate: 6,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/enemies/rhino/runRight.png'
    }
}

// All collision blocks
let collisionBlocks = []
// All fruits
let fruits = []

let TARGET_SCORE