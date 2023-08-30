class Game{
    /**
     * Provides the context to all the objects
     */
    constructor(){
        this.canvas = document.getElementById('canvas-game')
        this.context = this.canvas.getContext('2d')

        this.canvas.width = 16 * 64 
        this.canvas.height = 16 * 32 
    }

    /**
     * 
     * @returns the canvas
     */
    getCanvas(){
        return this.canvas
    }

    /**
     * 
     * @returns the canvas context
     */
    getContext(){
        return this.context
    }

    /**
     * Clears the screen
     */
    clearScreen(){
        this.context.clearRect(0, 0, canvas.width, canvas.height)
    }

    /**
     * 
     * @param {int} x is the x position of the rectangle
     * @param {int} y is the y position of the rectangle
     * @param {int} width is the width of the rectangle
     * @param {int} height is the height of the ractangle
     */
    drawRect(x, y, width, height){
        this.context.fillStyle = 'red'
        this.context.fillRect(x, y, width, height)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Game();
        }
        return this.instance;
    }
}