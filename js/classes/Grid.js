class Grid{
    constructor(width, height, color, gridSpaceX, gridSpaceY, context){
        this.width = width
        this.height = height
        this.color= color
        this.context = context


        this.lineSpacingX = gridSpaceY
        this.lineSpacingY = gridSpaceY
    }

    draw(){
        this.context.strokeStyle = this.color;
        this.context.lineWidth = 1;

        // Draw horizontal lines
        for (let y = 0; y <= this.height; y += this.lineSpacingX) {
            this.context.beginPath();
            this.context.moveTo(0, y);
            this.context.lineTo(this.width, y);
            this.context.stroke();
        }

        // Draw vertical lines
        for (let x = 0; x <= this.width; x += this.lineSpacingY) {
            this.context.beginPath();
            this.context.moveTo(x, 0);
            this.context.lineTo(x, canvas.height);
            this.context.stroke();
        }
    }
}