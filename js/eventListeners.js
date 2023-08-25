window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'w':
            if(player.velocity.y === 0) player.jump()
            break
        case ' ': 
            if(player.velocity.y === 0) player.jump()
            break
        case 'a':
            player.isMovingLeft = true
            player.moveLeft()
            console.log("You are moving to the left beother");
            break
        case 'ArrowLeft':
            player.isMovingLeft = true
            player.moveLeft()
            console.log("You are moving to the left beother");
            break
        case 'd':
            player.isMovingRight = true
            player.moveRight()
            break
        case 'ArrowRight':
            player.isMovingRight = true
            player.moveRight()
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'a':
            player.isMovingLeft = false
            player.stopLeft()
            break
        case 'ArrowLeft':
            player.isMovingLeft = false
            player.stopLeft()
            break
        case 'd':
            player.isMovingRight = false
            player.stopRight()
            break
        case 'ArrowRight':
            player.isMovingRight = false
            player.stopRight()
            break
    }
})