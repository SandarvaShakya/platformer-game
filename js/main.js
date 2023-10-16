initializeConstantGameButtons();

// the main game loop
const gameLoop = () => {
	MAIN_AUDIO.pause();
	MAIN_AUDIO.currentTime = 0;
	GAME_AUDIO.volume = 0.3;
	if (audioIsOn) GAME_AUDIO.play();
	gameAnimationId = requestAnimationFrame(gameLoop);

	// background and map
	background.update();
	gameMap.draw(context);

	// constant buttons
	renderConstantGameItems(context);

	// collision with fruits
	if (fruits) {
		fruits.forEach((fruit) => {
			fruit.draw(context);

			if (hasCollided(player, fruit)) {
				fruit.switchSprite("collided");
				if (!fruit.hasBeenEaten) {
					if (audioIsOn) FRUIT_AUDIO.play();
					FRUIT_AUDIO.currentTime = 0;
					player.increaseScore(fruit.scorePerFruit);
					fruit.hasBeenEaten = true;
				}
			}
		});
	}

	// Traps
	if (sawTrap) {
		sawTrap.update(context);
		// collision with traps
		if (hasCollided(player, sawTrap)) {
			player.decreaseHealth();
			if (audioIsOn) TRAP_HIT_AUDIO.play();
			hearts.splice(player.health, 1);
			if (player.health === 0) {
				displayGameover(context);
				// game.state = 'gameover'
				cancelAnimationFrame(gameAnimationId);
			}
		}
	}

	if (spike) {
		spike.draw(context);
		// collision with spike
		if (hasCollided(player, spike)) {
			player.decreaseHealth();
			if (audioIsOn) TRAP_HIT_AUDIO.play();
			hearts.splice(player.health, 1);
			if (player.health === 0) {
				displayGameover(context);
				// game.state = 'gameover'
				cancelAnimationFrame(gameAnimationId);
			}
		}
	}

	// Finish
	finish.draw(context);
	if (player.score === TARGET_SCORE) {
		finish.switchSprite("endReached");
	}

	if (hasCollided(player, finish)) {
		if (player.score === TARGET_SCORE) {
			if (finish.currentFrame === finish.frameRate - 1) {
				if (audioIsOn) LEVEL_COMPLETE_AUDIO.play();
				displayNextLevel(context);
				game.changeStateTo("next-level");
				cancelAnimationFrame(gameAnimationId);
			}
		}
	}

	// Checkpoint
	if (checkpoint) {
		checkpoint.draw(context);
		if (hasCollided(player, checkpoint)) {
			if (!player.checkpointReached) {
				checkpoint.switchSprite("checkpointReached");
				if (audioIsOn) CHECKPOINT_AUDIO.play();
				player.checkpointReached = true;
			}
		}

		// change checkpoint sprite after the animation of open is finished
		if (
			checkpoint.currentFrame === checkpoint.frameRate - 1 &&
			player.checkpointReached
		) {
			checkpoint.switchSprite("checkpointIdle");
		}
	}

	// Enemy
	if (enemy) {
		enemy.update(context);

		if (hasCollided(player, enemy)) {
			player.decreaseHealth();
			if (audioIsOn) ENEMY_HIT_AUDIO.play();
			hearts.splice(player.health, 1);
			if (player.health === 0) {
				displayGameover(context);
				game.state = "gameover";
				cancelAnimationFrame(gameAnimationId);
			}
		}

		if (measureXDistance(player, enemy) < 140) {
			enemy.isClose = true;
		} else {
			enemy.isClose = false;
		}
	}

	// Player
	player.update(context);
};

window.onload = () => {
	showMainMenu();
};
