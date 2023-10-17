/**
 * This function adds the data of edited map in custom blocks array so that it can be rendered
 */
const addCustomGameBlocks = () => {
	customBlocks = [];
	parsedCustomLevelData.forEach((row, rowIndex) => {
		row.forEach((blockData, blockDataIndex) => {
			let imgSrc = mapTile(blockData);
			blockX = blockDataIndex * 16;
			blockY = rowIndex * 16;
			if (imgSrc)
				customBlocks.push(
					new RenderBlock(blockX, blockY, 16, 16, imgSrc, customGameContext)
				);
		});
	});
};

/**
 * This function inititalizes the required things for playing the custom game
 */
const initCustomLevel = () => {
	customGameContext.clearRect(
		0,
		0,
		customGameCanvas.width,
		customGameCanvas.height
	);
	CUSTOM_GAME_AUDIO.pause();
	addParsedCollisionBlocks(
		parsedCustomMapCollisionData,
		733,
		customGameContext
	);

	player = new Player(
		20,
		20,
		32,
		32,
		selectedPlayer.imgSrc,
		collisionBlocks,
		11,
		selectedPlayer.animations
	);

	for (let i = 0; i < player.health; i++) {
		let heart = new Sprite("assets/heart/heart.png", 18 + i * 22, 18, 1);
		hearts.push(heart);
	}

	customGameBackground = new Background(
		"assets/backgrounds/bg1.png",
		0,
		0,
		canvas.width,
		canvas.height,
		customGameContext
	);
	addCustomGameBlocks();
	startCustomGame();
};

/**
 * This function is the animation for the custom game
 */
const startCustomGame = () => {
	game.changeStateTo("playing");
	customGameId = requestAnimationFrame(startCustomGame);
	customGameBackground.update();
	customBlocks.forEach((block) => {
		block.draw();
	});
	renderConstantGameItems(customGameContext);
	player.update(customGameContext);

	if (player.x <= 0) player.x = 0;
	if (player.x + player.width >= canvas.width)
		player.x = canvas.width - player.width;
	if (player.y <= 0) player.y = 0;
	if (player.y + player.height >= canvas.height) {
		displayGameover(customGameContext);
		cancelAnimationFrame(customGameId);
	}
};
