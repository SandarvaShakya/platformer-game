/**
 * Parses the 1D array into 2D array
 * @param {Array} array is the representation of the map in 1D array according to the tile
 * @returns the 2D array according to the tiles per row
 */
const parseArrayIn2D = (array, numberOfTiles) => {
	const rows = [];
	for (let i = 0; i < array.length; i += numberOfTiles) {
		rows.push(array.slice(i, i + numberOfTiles));
	}
	return rows;
};

/**
 * This function accepts 1D array and pareses it into 2D Array then makes the collision blocks
 * @param {Array} collisionData the collision array which has information of each tile's collision blocks
 * @param {int} block the number which represents the collision block in the collisionData
 */
const addCollisionBlocks = (collisionData, block) => {
	let parsedData = parseArrayIn2D(collisionData, 64);
	// generation of collision blocks from the collision data
	parsedData.forEach((row, rowIndex) => {
		row.forEach((tile, tileIndex) => {
			if (tile === block) {
				collisionBlocks.push(
					new CollisionBlock(tileIndex * 16, rowIndex * 16, context)
				);
			}
		});
	});
};

/**
 * This function accepts 2D parsed array and then makes the collision blocks
 * @param {Array} collisionData the collision array which has information of each tile's collision blocks
 * @param {int} block the number which represents the collision block in the collisionData
 */
const addParsedCollisionBlocks = (
	parsedCustomMapCollisionData,
	block,
	context
) => {
	parsedCustomMapCollisionData.forEach((row, rowIndex) => {
		row.forEach((tile, tileIndex) => {
			if (tile === block) {
				collisionBlocks.push(
					new CollisionBlock(tileIndex * 16, rowIndex * 16, context)
				);
			}
		});
	});
};

/**
 * collision detection of the objects
 * @param {object} object1 any square objects
 * @param {object} object2 any two square objects
 * @returns true if the objects has collided
 */
const hasCollided = (object1, object2) => {
	if (
		object1.x + object1.width >= object2.x &&
		object1.x <= object2.x + object2.width &&
		object1.y + object1.height >= object2.y &&
		object1.y <= object2.y + object2.height
	) {
		return true;
	}
	return false;
};

/**
 * This function measure the distance between two objects which has x and y coordinates
 *
 * @param {Object} obj1 the first object whose distance with the second object is to be measured (usually of type player)
 * @param {Object} obj2 the second object whose distance with the first object is to be measured (ususallu of type enemy)
 * @returns
 */
const measureXDistance = (obj1, obj2) => {
	let distance = Math.floor(
		Math.sqrt(Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y - obj1.y, 2))
	);
	return distance;
};

/**
 * This function checks if the object exists in an array
 * @param {Object} object the object that needs to be checked
 * @param {Array} array the array in which the object is checked
 * @returns boolean
 */
function objectExistsInArray(object, array) {
	return array.some((item) => JSON.stringify(item) === JSON.stringify(object));
}

/**
 * This function finds the x and y position of the mouse in the canvas
 * @param {HTMLElement} element the element with respect to which we need to find x and y of mouse
 * @param {Event} event the event object
 * @returns the mouseX and mouseY positions
 */
const findMousePos = (element, event) => {
	// To get the x and y of the canvas i.e. the distance from the x and y of browser
	const rect = element.getBoundingClientRect();
	// To get the scaling factor
	const canvasScale = element.width / rect.width;
	// The x position of mouse in the canvas
	const mouseX = (event.clientX - rect.left) * canvasScale;
	// The y position of mouse in the canvas
	const mouseY = (event.clientY - rect.top) * canvasScale;
	return { mouseX, mouseY };
};

/**
 * This function maps the repressented number with the image
 * @param {int} mappingNumber an integer that represents the image block
 * @returns the source of that image
 */
const mapTile = (mappingNumber) => {
	if (
		mappingNumber === 51 ||
		mappingNumber === 52 ||
		mappingNumber === 53 ||
		mappingNumber === 29 ||
		mappingNumber === 31
	) {
		return "assets/16x16-tiles/normal-grass/normal-center.png";
	}

	if (
		mappingNumber === 139 ||
		mappingNumber === 140 ||
		mappingNumber === 141 ||
		mappingNumber === 119 ||
		mappingNumber === 117
	) {
		return "assets/16x16-tiles/dark-grass/dark-center.png";
	}

	if (
		mappingNumber === 205 ||
		mappingNumber === 207 ||
		mappingNumber === 227 ||
		mappingNumber === 228 ||
		mappingNumber === 229
	) {
		return "assets/16x16-tiles/light-grass/light-center.png";
	}

	if (
		mappingNumber === 150 ||
		mappingNumber === 151 ||
		mappingNumber === 152 ||
		mappingNumber === 128 ||
		mappingNumber === 130
	) {
		return "assets/16x16-tiles/brick/brick-center.png";
	}

	switch (mappingNumber) {
		// Normal Grass
		case 7:
			return "assets/16x16-tiles/normal-grass/normal-top-left.png";
		case 8:
			return "assets/16x16-tiles/normal-grass/normal-top-center.png";
		case 9:
			return "assets/16x16-tiles/normal-grass/normal-top-right.png";
		case 30:
			return "assets/16x16-tiles/normal-grass/normal-center.png";
		// Dark Grass
		case 95:
			return "assets/16x16-tiles/dark-grass/dark-top-left.png";
		case 96:
			return "assets/16x16-tiles/dark-grass/dark-top-center.png";
		case 97:
			return "assets/16x16-tiles/dark-grass/dark-top-right.png";
		case 118:
			return "assets/16x16-tiles/dark-grass/dark-center.png";
		// Light Grass
		case 183:
			return "assets/16x16-tiles/light-grass/light-top-left.png";
		case 184:
			return "assets/16x16-tiles/light-grass/light-top-center.png";
		case 185:
			return "assets/16x16-tiles/light-grass/light-top-right.png";
		case 206:
			return "assets/16x16-tiles/light-grass/light-center.png";
		// Stone/Steel Blocks
		case 1:
			return "assets/16x16-tiles/steel/steel-top-left.png";
		case 2:
			return "assets/16x16-tiles/steel/steel-top-center.png";
		case 3:
			return "assets/16x16-tiles/steel/steel-top-right.png";
		case 23:
			return "assets/16x16-tiles/steel/steel-center-left.png";
		case 24:
			return "assets/16x16-tiles/steel/steel-center.png";
		case 25:
			return "assets/16x16-tiles/steel/steel-center-right.png";
		case 45:
			return "assets/16x16-tiles/steel/steel-bottom-left.png";
		case 46:
			return "assets/16x16-tiles/steel/steel-bottom-center.png";
		case 47:
			return "assets/16x16-tiles/steel/steel-bottom-right.png";
		// Wood Blocks
		case 89:
			return "assets/16x16-tiles/wood/wood-top-left.png";
		case 90:
			return "assets/16x16-tiles/wood/wood-top-center.png";
		case 91:
			return "assets/16x16-tiles/wood/wood-top-right.png";
		case 111:
			return "assets/16x16-tiles/wood/wood-center-left.png";
		case 112:
			return "assets/16x16-tiles/wood/wood-center.png";
		case 113:
			return "assets/16x16-tiles/wood/wood-center-right.png";
		case 133:
			return "assets/16x16-tiles/wood/wood-bottom-left.png";
		case 134:
			return "assets/16x16-tiles/wood/wood-bottom-center.png";
		case 135:
			return "assets/16x16-tiles/wood/wood-bottom-right.png";
		// Prismarine Block
		case 177:
			return "assets/16x16-tiles/prismarine/prismarine-top-left.png";
		case 178:
			return "assets/16x16-tiles/prismarine/prismarine-top-center.png";
		case 179:
			return "assets/16x16-tiles/prismarine/prismarine-top-right.png";
		case 199:
			return "assets/16x16-tiles/prismarine/prismarine-center-left.png";
		case 200:
			return "assets/16x16-tiles/prismarine/prismarine-center.png";
		case 201:
			return "assets/16x16-tiles/prismarine/prismarine-center-right.png";
		case 221:
			return "assets/16x16-tiles/prismarine/prismarine-bottom-left.png";
		case 222:
			return "assets/16x16-tiles/prismarine/prismarine-bottom-center.png";
		case 223:
			return "assets/16x16-tiles/prismarine/prismarine-bottom-right.png";
		// Brown Platform
		case 13:
			return "assets/16x16-tiles/brown-platform/brown-platform-left.png";
		case 14:
			return "assets/16x16-tiles/brown-platform/brown-platform-center.png";
		case 15:
			return "assets/16x16-tiles/brown-platform/brown-platform-right.png";
		case 16:
			return "assets/16x16-tiles/brown-platform/brown-platform-top.png";
		case 38:
			return "assets/16x16-tiles/brown-platform/brown-platform-center-v.png";
		case 60:
			return "assets/16x16-tiles/brown-platform/brown-platform-bottom.png";
		case 35:
			return "assets/16x16-tiles/brown-platform/brown-single-block.png";
		case 36:
			return "assets/16x16-tiles/brown-platform/brown-block-top-left.png";
		case 37:
			return "assets/16x16-tiles/brown-platform/brown-block-top-right.png";
		case 58:
			return "assets/16x16-tiles/brown-platform/brown-block-bottom-left.png";
		case 59:
			return "assets/16x16-tiles/brown-platform/brown-block-bottom-right.png";
		// Gray Platforms
		// Orange Platforms
		// Gold Platforms
		// Small Wood Platform
		case 40:
			return "assets/16x16-tiles/small-wood/small-wood-left.png";
		case 41:
			return "assets/16x16-tiles/small-wood/small-wood-center.png";
		case 42:
			return "assets/16x16-tiles/small-wood/small-wood-right.png";
		// Small Steel Platform
		case 62:
			return "assets/16x16-tiles/small-steel/small-steel-left.png";
		case 63:
			return "assets/16x16-tiles/small-steel/small-steel-center.png";
		case 64:
			return "assets/16x16-tiles/small-steel/small-steel-right.png";
		// Small Gold Platform
		case 18:
			return "assets/16x16-tiles/small-gold/small-gold-left.png";
		case 19:
			return "assets/16x16-tiles/small-gold/small-gold-center.png";
		case 20:
			return "assets/16x16-tiles/small-gold/small-gold-right.png";
		// Bricks
		case 106:
			return "assets/16x16-tiles/brick/brick-top-left.png";
		case 107:
			return "assets/16x16-tiles/brick/brick-top-center.png";
		case 108:
			return "assets/16x16-tiles/brick/brick-top-right.png";
		case 129:
			return "assets/16x16-tiles/brick/brick-center.png";
	}
};
