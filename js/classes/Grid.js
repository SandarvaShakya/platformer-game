class Grid{
    /**
     *  A grid to show in the game editor
     * 
     * @param {int} width the width till which the grid is to be drawn
     * @param {int} height the height till which the grid is to be drawn
     * @param {string} color the color of the border of the grid
     * @param {int} gridSpaceX the width of each tile
     * @param {int} gridSpaceY the height of each tile
     */
    constructor(width, height, color, gridSpaceX, gridSpaceY){
        this.width = width
        this.height = height

        this.color= color
        this.context = context

        this.lineSpacingX = gridSpaceX
        this.lineSpacingY = gridSpaceY
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context the context in which the grid is to be drawn
     */
    draw(context){
        if(!context) return
        context.strokeStyle = this.color;
        context.lineWidth = 1;

        // Draw horizontal lines
        for (let y = 0; y <= this.height; y += this.lineSpacingX) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(this.width, y);
            context.stroke();
        }

        // Draw vertical lines
        for (let x = 0; x <= this.width; x += this.lineSpacingY) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvas.height);
            context.stroke();
        }
    }
}