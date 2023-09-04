class GameItem{
    /**
     * The object for the images in map editor
     * 
     * @param {string} id the id of the canvas element
     * @param {string} imgSrc the path of the sprite-sheet
     * @param {int} tileWidth the number of pixels in each tile horizontally
     * @param {int} numberOfColumns the number of tiles in each row
     * @param {int} tileHeight the number of pixels in each tile vertically
     * @param {int} numberOfRows the number tiles in each column
     */
    constructor(id, imgSrc, tileWidth, numberOfColumns, tileHeight, numberOfRows){
        this.wrapper = document.querySelector('.sprites-canvas-wrapper')

        /** @type {HTMLCanvasElement} */
        this.canvas = document.getElementById(id)
        /** @type {CanvasRenderingContext2D} */
        this.context = this.canvas.getContext('2d')

        this.tileWidth = tileWidth
        this.tileHeight = tileHeight
        this.canvas.width = this.tileWidth * numberOfColumns
        this.canvas.height = this.tileHeight * numberOfRows
        this.width = this.canvas.width
        this.height = this.canvas.height

        this.image = new Image()
        this.image.src = imgSrc
        this.image.onload = () => {
            this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height)
        }
        this.grid = new Grid(this.width, this.height, 'black', this.tileWidth, this.tileHeight)
        this.grid.draw(this.context)
    }

    getCanvas(){
        return this.canvas
    }

    getContext(){
        return this.context
    }

    show(){
        this.wrapper.style.display = 'flex'
        this.wrapper.style.zIndex = 50
    }

    hide(){
        this.wrapper.style.display = 'none'
        this.wrapper.style.zIndex = -1
    }
}