class Editor {
	/**
	 * Provides the context to all the objects
	 */
	constructor() {
		/** @type {HTMLCanvasElement} */
		this.canvas = document.getElementById("editor-canvas");
		/** @type {CanvasRenderingContext2D} */
		this.context = this.canvas.getContext("2d");

		this.canvas.width = 16 * 64;
		this.canvas.height = 16 * 32;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
	}

	/**
	 *
	 * @returns the canvas
	 */
	getCanvas() {
		return this.canvas;
	}

	/**
	 *
	 * @returns the canvas context
	 */
	getContext() {
		return this.context;
	}

	/**
	 * Clears the screen
	 */
	clearScreen() {
		this.context.clearRect(0, 0, canvas.width, canvas.height);
	}

	/**
	 *
	 * @param {int} x is the x position of the rectangle
	 * @param {int} y is the y position of the rectangle
	 * @param {int} width is the width of the rectangle
	 * @param {int} height is the height of the ractangle
	 */
	drawRect(x, y, width, height, color) {
		this.context.fillStyle = color;
		this.context.fillRect(x, y, width, height);
	}

	show() {
		this.canvas.style.background = "url('assets/backgrounds/bg1.png')";
		this.canvas.style.backgroundSize = `contain`;
		this.canvas.style.zIndex = 100;
		this.canvas.style.display = "block";
		MAIN_AUDIO.pause();
		MAIN_AUDIO.currentTime = 0;
		CUSTOM_GAME_AUDIO.volume = 0.5;
		if (audioIsOn) CUSTOM_GAME_AUDIO.play();
		CUSTOM_GAME_AUDIO.currentTime = 0;
	}

	hide() {
		this.canvas.style.background = "none";
		this.canvas.style.zIndex = -1;
		this.canvas.style.display = "none";
		CUSTOM_GAME_AUDIO.pause();
		CUSTOM_GAME_AUDIO.currentTime = 0;
	}

	/**
	 * This function draws the grid in the level editor canvas
	 */
	renderGrid() {
		let grid = new Grid(this.width, this.height, "black", 16, 16);
		grid.draw(this.context);
	}
}
