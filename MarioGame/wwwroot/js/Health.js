export class Health {
    constructor({ x, y, image, c }) {
        this.position = {
            x,
            y,
        }
        this.image = image
        this.c = c
    }

    draw() {
        this.c.drawImage(this.image, this.position.x, this.position.y)
    }
}
