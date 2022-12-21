export class Platform {
    constructor({ x, y, image, c }) {
        this.position = {
            x: x,
            y: y,
        }
        this.c = c
        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        this.c.drawImage(this.image, this.position.x, this.position.y)
    }
}
