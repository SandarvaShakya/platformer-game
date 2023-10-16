/**
 *  Displays the score after the level has finished
 */
const displayScore = (context) => {
	context.fillStyle = "white";
	context.font = "16px Arial";
	context.fillText(`Score: ${player.score}`, 18, 56);
};

/**
 * This function shows the gameover screen
 * @param {HTMLCanvasElementContext} context the context in which the screen is to shown
 */
const displayGameover = (context) => {
	game.changeStateTo("gameover");
	let gameoverImg = new Image();
	gameoverImg.src = "assets/gameover.png";
	gameoverImg.onload = () => {
		context.drawImage(gameoverImg, 0, 0);
		backBigButton.draw(context);
		restartBigButton.draw(context);
		// levelBigButton.draw(context);
	};
};

/**
 * This function displays the next level screen when you complete a level
 *
 * @param {HTMLCanvasElementContext} context the context in which the screen is to shown
 */
const displayNextLevel = (context) => {
	let nextLevelImg = new Image();
	nextLevelImg.src = "assets/nextLevel.png";
	nextLevelImg.onload = () => {
		context.drawImage(nextLevelImg, 0, 0);
		context.font = "32px Arial";
		context.fillStyle = "white";
		context.fillText(`${player.score}`, 566, 172);
		backBigButton.draw(context);
		nextBigButton.draw(context);
		// levelBigButton.draw(context);
	};
};

/**
 * This function initializes the buttons like restart button etc.
 */
const initializeConstantGameButtons = () => {
	restartButton = new Sprite(
		BUTTONS.restart.imgSrc,
		BUTTONS.restart.position.x,
		BUTTONS.restart.position.y,
		BUTTONS.restart.frameRate
	);
	backButton = new Sprite(
		BUTTONS.back.imgSrc,
		BUTTONS.back.position.x,
		BUTTONS.back.position.y,
		BUTTONS.back.frameRate
	);
	levelsButton = new Sprite(
		BUTTONS.levels.imgSrc,
		BUTTONS.levels.position.x,
		BUTTONS.levels.position.y,
		BUTTONS.levels.frameRate
	);
	volumeButton = new Sprite(
		BUTTONS.volume.imgSrc,
		BUTTONS.volume.position.x,
		BUTTONS.volume.position.y,
		BUTTONS.volume.frameRate
	);
	playButton = new Sprite(
		BUTTONS.play.imgSrc,
		BUTTONS.play.position.x,
		BUTTONS.play.position.y,
		BUTTONS.play.frameRate
	);
	choosePlayerButton = new Sprite(
		BUTTONS.choosePlayer.imgSrc,
		BUTTONS.choosePlayer.position.x,
		BUTTONS.choosePlayer.position.y,
		BUTTONS.choosePlayer.frameRate
	);
	levelMakerButton = new Sprite(
		BUTTONS.levelMaker.imgSrc,
		BUTTONS.levelMaker.position.x,
		BUTTONS.levelMaker.position.y,
		BUTTONS.levelMaker.frameRate
	);
	levelSelectionButton = new Sprite(
		BUTTONS.levelSelection.imgSrc,
		BUTTONS.levelSelection.position.x,
		BUTTONS.levelSelection.position.y,
		BUTTONS.levelSelection.frameRate
	);
	savedGamesButton = new Sprite(
		BUTTONS.savedGames.imgSrc,
		BUTTONS.savedGames.position.x,
		BUTTONS.savedGames.position.y,
		BUTTONS.savedGames.frameRate
	);
	backBigButton = new Sprite(
		BUTTONS.bigBack.imgSrc,
		BUTTONS.bigBack.position.x,
		BUTTONS.bigBack.position.y,
		BUTTONS.bigBack.frameRate
	);
	nextBigButton = new Sprite(
		BUTTONS.bigNext.imgSrc,
		BUTTONS.bigNext.position.x,
		BUTTONS.bigNext.position.y,
		BUTTONS.bigNext.frameRate
	);
	levelBigButton = new Sprite(
		BUTTONS.bigLevel.imgSrc,
		BUTTONS.bigLevel.position.x,
		BUTTONS.bigLevel.position.y,
		BUTTONS.bigLevel.frameRate
	);
	restartBigButton = new Sprite(
		BUTTONS.bigRestart.imgSrc,
		BUTTONS.bigRestart.position.x,
		BUTTONS.bigRestart.position.y,
		BUTTONS.bigRestart.frameRate
	);
};

/**
 * This function renders the constant UI required in all levels or game
 * @param {HTMLCanvasElementContext} context the context where the items are to be rendered
 */
const renderConstantGameItems = (context) => {
	restartButton.draw(context);
	backButton.draw(context);
	// levelsButton.draw(context);
	volumeButton.draw(context);

	displayScore(context);

	hearts.forEach((heart) => {
		heart.draw(context);
	});
};

/**
 * This function restarts level which is being played
 */
const restartGame = () => {
	cancelAnimationFrame(gameAnimationId);
	if (levels[currentLevel]) {
		levels[currentLevel].init();
	}
};

const stopAllSounds = () => {
	CHECKPOINT_AUDIO.muted = true;
	FRUIT_AUDIO.muted = true;
	JUMP_AUDIO.muted = true;
	LEVEL_COMPLETE_AUDIO.muted = true;
	TRAP_HIT_AUDIO.muted = true;
	ENEMY_HIT_AUDIO.muted = true;
	CUSTOM_GAME_AUDIO.muted = true;
	PLAYER_SELECT_AUDIO.muted = true;
	MAIN_AUDIO.muted = true;
	GAME_AUDIO.muted = true;
};

const playSound = () => {
	CHECKPOINT_AUDIO.muted = false;
	FRUIT_AUDIO.muted = false;
	JUMP_AUDIO.muted = false;
	LEVEL_COMPLETE_AUDIO.muted = false;
	TRAP_HIT_AUDIO.muted = false;
	ENEMY_HIT_AUDIO.muted = false;
	CUSTOM_GAME_AUDIO.muted = false;
	PLAYER_SELECT_AUDIO.muted = false;
	MAIN_AUDIO.muted = false;
	GAME_AUDIO.muted = false;
};
