initializeConstantGameButtons();

// the main game loop
const gameLoop = () => {
	MAIN_AUDIO.pause();
	MAIN_AUDIO.currentTime = 0;
	GAME_AUDIO.volume = 0.3;
	GAME_AUDIO.play();
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
					FRUIT_AUDIO.play();
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
			TRAP_HIT_AUDIO.play();
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
			TRAP_HIT_AUDIO.play();
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
				GAME_AUDIO.volume = 0.1;
				LEVEL_COMPLETE_AUDIO.play();
				LEVEL_COMPLETE_AUDIO.currentTime = 0;
				GAME_AUDIO.volume = 0.3;
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
				CHECKPOINT_AUDIO.play();
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
			ENEMY_HIT_AUDIO.play();
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
	preLoader();
	// if (allAssetsLoaded) showMainMenu();
};

let allAssetsLoaded = false;
let loadingPercentage = 0;
const preLoader = () => {
	let images = {};
	let totalImages = 0;
	let loadedImages = 0;
	const imageSources = {
		1: "assets/backgrounds/bg1.png",
		2: "assets/backgrounds/bg2.png",
		3: "assets/backgrounds/bg3.png",
		4: "assets/buttons/Back.png",
		5: "assets/buttons/BackBig.png",
		6: "assets/buttons/Backmedium.png",
		7: "assets/buttons/choosePlayerButton.png",
		8: "assets/buttons/levelMakerButton.png",
		9: "assets/buttons/Levels.png",
		10: "assets/buttons/LevelsBig.png",
		11: "assets/buttons/NextBig.png",
		12: "assets/buttons/playButton.png",
		13: "assets/buttons/Restart.png",
		14: "assets/buttons/RestartBig.png",
		15: "assets/buttons/savedMapsButton.png",
		16: "assets/buttons/Volume.png",
		17: "assets/checkpoint/checkpoint.png",
		18: "assets/checkpoint/IdleCheckpoint.png",
		19: "assets/checkpoint/outCheckpoint.png",
		20: "assets/editor-sprites/terrian.png",
		21: "assets/end/end.png",
		22: "assets/end/endPick.png",
		23: "assets/enemies/chicken/idle.png",
		24: "assets/enemies/chicken/runLeft.png",
		25: "assets/enemies/rhino/idle.png",
		26: "assets/enemies/rhino/idleRight.png",
		27: "assets/enemies/rhino/runLeft.png",
		28: "assets/enemies/rhino/runRight.png",
		29: "assets/fruits/collected.png",
		30: "assets/fruits/melon.png",
		31: "assets/fruits/orange.png",
		32: "assets/fruits/pineapple.png",
		33: "assets/heart/heart.png",
		34: "assets/levels/1.png",
		35: "assets/levels/2.png",
		36: "assets/levels/3.png",
		37: "assets/maps/Map1.png",
		38: "assets/maps/Map2.png",
		39: "assets/player/player1/hit.png",
		40: "assets/player/player1/hitLeft.png",
		41: "assets/player/player1/idle.png",
		42: "assets/player/player1/idleLeft.png",
		43: "assets/player/player1/jump.png",
		44: "assets/player/player1/jumpLeft.png",
		45: "assets/player/player1/run.png",
		46: "assets/player/player1/runLeft.png",
		47: "assets/player/player2/hit.png",
		48: "assets/player/player2/hitLeft.png",
		49: "assets/player/player2/idle.png",
		50: "assets/player/player2/idleLeft.png",
		51: "assets/player/player2/jump.png",
		52: "assets/player/player2/jumpLeft.png",
		53: "assets/player/player2/run.png",
		54: "assets/player/player2/runLeft.png",
		55: "assets/player/player3/hit.png",
		56: "assets/player/player3/hitLeft.png",
		57: "assets/player/player3/idle.png",
		58: "assets/player/player3/idleLeft.png",
		59: "assets/player/player3/jump.png",
		60: "assets/player/player3/jumpLeft.png",
		61: "assets/player/player3/run.png",
		62: "assets/player/player3/runLeft.png",
		63: "assets/select-players/selection-player-1.png",
		64: "assets/select-players/selection-player-2.png",
		65: "assets/select-players/selection-player-3.png",
		66: "assets/traps/saw/off.png",
		67: "assets/traps/saw/on.png",
		68: "assets/traps/spikes/Idle.png",
		69: "assets/gameover.png",
		70: "assets/levelSelectionScreen.png",
		71: "assets/main-menu.png",
		72: "assets/nextLevel.png",
		73: "assets/select-bg.png",
	};

	const audioSources = {
		1: "assets/audio/checkpoint.wav",
		2: "assets/audio/collide.mp3",
		3: "assets/audio/customGame.wav",
		4: "assets/audio/fruits.wav",
		5: "assets/audio/gameMusic.wav",
		6: "assets/audio/hit.mp3",
		7: "assets/audio/jump.wav",
		8: "assets/audio/levelComplete.mp3",
		9: "assets/audio/main.wav",
		10: "assets/audio/playerSelection.wav",
	};

	for (let key in imageSources) {
		totalImages++;
	}

	for (let key in imageSources) {
		images[key] = new Image();
		images[key].src = imageSources[key];

		images[key].onload = () => {
			loadedImages++;
			loadingPercentage = Math.floor((loadedImages * 100) / totalImages);
			document.getElementById("loading").innerText = `${loadingPercentage}%`;
			if (loadedImages >= totalImages) {
				document.getElementById("loading").classList.add("d-none");
				showMainMenu();
			}
		};
	}
};
