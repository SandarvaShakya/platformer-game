class TilesSprites{
    constructor(){
        this.canvas = document.getElementById('floors')
        this.context = this.canvas.getContext('2d')

        // 352
        this.canvas.width = 16 * 22
        // 176
        this.canvas.height = 16 * 11

        this.image = new Image()
        this.image.src = 'assets/editor-sprites/terrian.png'
        this.image.onload = () => {
            this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height)
        }
        this.grid = new Grid(this.getWidth(), this.getHeight(), 'black', 16, 16, this.context)
        this.grid.draw()
    }

    getCanvas(){
        return this.canvas
    }

    getContext(){
        return this.context
    }

    getWidth(){
        return this.canvas.width
    }

    getHeight(){
        return this.canvas.height
    }
}