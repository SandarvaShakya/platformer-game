const showMainMenu = () => {
	game.changeStateTo("main-menu");
	GAME_AUDIO.pause();
	GAME_AUDIO.currentTime = 0;
	MAIN_AUDIO.volume = 0.5;
	MAIN_AUDIO.play();
	cancelAnimationFrame(menuAnimationId);
	mainMenuBackground = new Background(
		"assets/backgrounds/bg1.png",
		0,
		0,
		game.width,
		game.height,
		context
	);
	mainMenuImg = new Sprite("assets/main-menu.png", -3, -60, 1);
	player = new Player(
		230,
		80,
		32,
		32,
		selectedPlayer.imgSrc,
		[],
		11,
		selectedPlayer.animations
	);
	enemy = new Enemy(930, 240, "assets/enemies/chicken/idle.png", 13);
	animateMenu();
};

const animateMenu = () => {
	menuAnimationId = requestAnimationFrame(animateMenu);
	if (game.state === "main-menu") {
		mainMenuBackground.update();
		mainMenuImg.draw(context);

		// Menu Buttons
		playButton.draw(context);
		choosePlayerButton.draw(context);
		levelMakerButton.draw(context);
		volumeButton.draw(context);
		levelSelectionButton.draw(context);
		// savedGamesButton.draw(context)

		enemy.draw(context);
		player.draw(context);
	}
};
