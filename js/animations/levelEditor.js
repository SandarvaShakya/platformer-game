const showLevelBuilder = () => {
	game.changeStateTo("levelBuilder");
	levelBuilderContext.clearRect(0, 0, levelBuilder.width, levelBuilder.height);
	collisionBlocks = [];
	generateCustomLevelDataArrays();

	cancelAnimationFrame(menuAnimationId);
	cancelAnimationFrame(gameAnimationId);

	game.hide();
	levelBuilder.show();
	terrianSpriteSheet.show();

	levelBuilder.renderGrid();
};
