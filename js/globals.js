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
const player1Animations = {
    idleRight: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player1/idle.png'
    },
    idleLeft: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player1/idleLeft.png'
    },
    runRight: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player1/run.png'
    },
    runLeft: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player1/runLeft.png'
    },
    jumpRight: {
        frameRate: 1,
        frameBuffer: 4,
        imageSrc: 'assets/player/player1/jump.png'
    },
    jumpLeft: {
        frameRate: 1,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player1/jumpLeft.png'
    },
    hit:{
        frameRate: 7,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player1/hit.png'
    },
    hitLeft: {
        frameRate: 7,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player1/hitLeft.png'
    }
}

const player2Animations = {
    idleRight: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player2/idle.png'
    },
    idleLeft: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player2/idleLeft.png'
    },
    runRight: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player2/run.png'
    },
    runLeft: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player2/runLeft.png'
    },
    jumpRight: {
        frameRate: 1,
        frameBuffer: 4,
        imageSrc: 'assets/player/player2/jump.png'
    },
    jumpLeft: {
        frameRate: 1,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player2/jumpLeft.png'
    },
    hit:{
        frameRate: 7,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player2/hit.png'
    },
    hitLeft: {
        frameRate: 7,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player2/hitLeft.png'
    }
}

const player3Animations = {
    idleRight: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player3/idle.png'
    },
    idleLeft: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player3/idleLeft.png'
    },
    runRight: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player3/run.png'
    },
    runLeft: {
        frameRate: 11,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player3/runLeft.png'
    },
    jumpRight: {
        frameRate: 1,
        frameBuffer: 4,
        imageSrc: 'assets/player/player3/jump.png'
    },
    jumpLeft: {
        frameRate: 1,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player3/jumpLeft.png'
    },
    hit:{
        frameRate: 7,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player3/hit.png'
    },
    hitLeft: {
        frameRate: 7,
        frameBuffer: 4,
        loop: true,
        imageSrc: 'assets/player/player3/hitLeft.png'
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
let selectedPlayer = {
    imgSrc: 'assets/player/player1/idleLeft.png',
    animations: player1Animations
}
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

const playerSelection = new PlayerSelection()
const playerSelectionCanvas = playerSelection.getCanvas()
const playerSelectionContext = playerSelection.getContext()

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
    },
    savedGames: {
        imgSrc: 'assets/buttons/savedMapsButton.png',
        position: {
            x: 0,
            y: 80,
        },
        frameRate: 1
    },
    bigBack: {
        imgSrc: 'assets/buttons/BackBig.png',
        position: {
            x: 350,
            y: 215,
        },
        frameRate: 1
    },
    bigNext: {
        imgSrc: 'assets/buttons/NextBig.png',
        position: {
            x: 465,
            y: 215,
        },
        frameRate: 1
    },
    bigLevel: {
        imgSrc: 'assets/buttons/LevelsBig.png',
        position: {
            x: 580,
            y: 215,
        },
        frameRate: 1
    },
    bigRestart: {
        imgSrc: 'assets/buttons/RestartBig.png',
        position: {
            x: 465,
            y: 215,
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
let savedGamesButton

// constant buttons in gameover and next-level
let backBigButton
let levelBigButton
let nextBigButton
let restartBigButton

// Default starting level 1
let currentLevel = 1

// Animation Id's
let gameAnimationId
let menuAnimationId
let customGameId
let playerSelectionAnimationId

// Backgrounds
let mainMenuBackground
let customGameBackground
let selectionBackground

let mainMenuImg

// Information for terrian canvas
const terrian = {
    imgSrc: 'assets/editor-sprites/terrian.png',
    tileWidth: 16,
    numberOfColumns: 22,
    tileHeight: 16,
    numberOfRows: 11
}

// Initialization of the terrian sprite sheet
const terrianSpriteSheet = new GameItem('floors', terrian.imgSrc, terrian.tileWidth, terrian.numberOfColumns, terrian.tileHeight, terrian.numberOfRows)

// CUSTOM LEVELS
let customLevelDataArray = []
let customLevelCollisionBlocks = []
let customBlocks = []

let parsedCustomMapCollisionData
let parsedCustomLevelData

// Boxes selected in level builder
let selectedBoxes = []

// The image clicked in terrian canvas
let clickedImg = new Image()

// To check of mouse is down or not
let mouseDown = false

// Skins
let player1, player2, player3
let pinkMan = {
    x: 800,
    y: 250,
    imgSrc: 'assets/select-players/selection-player-2.png',
    frameRate: 11
}
let maskMan = {
    x: 450,
    y: 250,
    imgSrc: 'assets/select-players/selection-player-1.png',
    frameRate: 11
}
let virtualGuy = {
    x: 100,
    y: 250,
    imgSrc: 'assets/select-players/selection-player-3.png',
    frameRate: 11
}