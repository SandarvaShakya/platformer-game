// All the available levels
levels = {
    1: {
        init: () => {
            // Collision Data
            collisionBlocks = []
            addCollisionBlocks(collisionData1, 672)
            
            // Map
            gameMap = new Sprite('assets/maps/Map1.png', 0, 0, 1)
            background = new Background('assets/backgrounds/bg3.png', 0, 0, canvas.width, canvas.height, context)

            // Traps
            sawTrap = new Saw(300, 160, 'assets/traps/saw/on.png', 8, 1, sawAnimations)
            spike = new Trap(750, 304, 'assets/traps/spikes/idle.png', 1)

            // Enemies
            enemy = null

            // Fruits
            fruits = []
            generateFruits('orange', 20, 200, 'rect', 2, 5)
            generateTargetScore()

            // Finishing Games
            checkpoint = new CheckPoint(460, 289, 'assets/checkpoint/checkpoint.png', 1, checkPointAnimations)
            finish = new Sprite('assets/end/end.png', 20, 304, 1, endAnimations)

            // Player
            player = new Player(920, 20, 32, 32, selectedPlayer.imgSrc, collisionBlocks, 11, selectedPlayer.animations)

            // Hearts
            for(let i = 0; i < player.health; i++){
                let heart = new Sprite('assets/heart/heart.png', 18 + i * 22, 18, 1)
                hearts.push(heart)
            }

            game.changeStateTo('playing')
            gameLoop()
        }
    },
    2: {
        init: () => {
            // Collision Data
            collisionBlocks = []
            addCollisionBlocks(collisionData2, 773)

            // Map
            gameMap = new Sprite('assets/maps/Map2.png', 0, 0, 1)
            background = new Background('assets/backgrounds/bg1.png', 0, 0, canvas.width, canvas.height, context)

            // Traps
            sawTrap = new Saw(180, 160, 'assets/traps/saw/on.png', 8, 2, sawAnimations)
            // spike = new Trap(750, 304, 'assets/traps/spikes/idle.png', 1)
            spike = null

            // Enemies
            enemy = new Enemy(950, 205, 'assets/enemies/rhino/idle.png', 11, rhinoAnimations)

            // Fruits
            fruits = []
            generateFruits('melon', 882, 294, 'rect', 2, 3)
            generateFruits('orange', 260, 110, 'triangle', 3, 3)
            generateFruits('pineapple', 960, 200, 'rect', 3, 1)
            generateTargetScore()

            // Finishing Games
            checkpoint = null
            finish = new Sprite('assets/end/end.png', 20, 256, 1, endAnimations)

            // Player
            player = new Player(100, 20, 32, 32, selectedPlayer.imgSrc, collisionBlocks, 11, selectedPlayer.animations)
            player.isFacing = 'right'
            
            // Hearts
            for(let i = 0; i < player.health; i++){
                let heart = new Sprite('assets/heart/heart.png', 18 + i * 22, 18, 1)
                hearts.push(heart)
            }

            game.changeStateTo('playing')
            gameLoop()
        }
    }
}