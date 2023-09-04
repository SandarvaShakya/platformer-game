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

// The player
let player
let gameMap
let background
let sawTrap
let spike
let checkpoint
let finish
let enemy
let hearts = []

const game = new Game()
const canvas = game.getCanvas()
const context = game.getContext()

const levelBuilder = new Editor()
const levelBuilderCanvas = levelBuilder.getCanvas()
const levelBuilderContext = levelBuilderCanvas.getContext('2d')

const customGame = new CustomGame()
const customGameCanvas = customGame.getCanvas()
const customGameContext = customGame.getContext()

// constant buttons
const BUTTONS = {
    restart: {
        imgSrc: 'assets/buttons/Restart.png',
        position: {
            x: canvas.width - 38,
            y: canvas.height - 36,
        },
        frameRate: 1
    },
    back:{
        imgSrc: 'assets/buttons/Backmedium.png',
        position: {
            x: canvas.width - 38,
            y: canvas.height - 36 - 22,
        },
        frameRate: 1
    },
    volume: {
        imgSrc: 'assets/buttons/Volume.png',
        position: {
            x: canvas.width - 38,
            y: canvas.height - 36 - 66,
        },
        frameRate: 1
    },
    levels: {
        imgSrc: 'assets/buttons/Levels.png',
        position: {
            x: canvas.width - 38,
            y: canvas.height - 36 - 44,
        },
        frameRate: 1
    },
    play: {
        imgSrc: 'assets/buttons/playButton.png',
        position: {
            x: 295,
            y: 260,
        },
        frameRate: 1
    },
    choosePlayer: {
        imgSrc: 'assets/buttons/choosePlayerButton.png',
        position: {
            x: 295,
            y: 260 + 120,
        },
        frameRate: 1
    },
    levelMaker: {
        imgSrc: 'assets/buttons/levelMakerButton.png',
        position: {
            x: 0,
            y: 0,
        },
        frameRate: 1
    },
    levelSelection: {
        imgSrc: 'assets/buttons/Levels.png',
        position: {
            x: canvas.width - 20,
            y: 0,
        },
        frameRate: 1
    }
}

// constant buttons when game is running
let restartButton
let backButton
let levelsButton
let volumeButton
let levelSelectionButton

// constant buttons in menu
let playButton
let choosePlayerButton
let levelMakerButton

// Default starting level 1
let currentLevel = 1

// Animation Id's
let gameAnimationId
let menuAnimationId
let customGameId

// Backgrounds
let mainMenuBackground
let customGameBackground

let mainMenuImg

// Information for terrian canvas
const terrian = {
    imgSrc: 'assets/editor-sprites/terrian.png',
    tileWidth: 16,
    numberOfColumns: 22,
    tileHeight: 16,
    numberOfRows: 11
}

// CUSTOM LEVELS
let customLevelDataArray = []
let customLevelCollisionBlocks = []
let parsedCustomMapCollisionData
let parsedCustomLevelData