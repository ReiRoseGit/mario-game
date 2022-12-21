export class Enemy {
    constructor({ x, y, image, c }) {
        this.startPosition = {
            x,
            y,
        }
        this.position = {
            x,
            y,
        }
        this.image = image
        this.width = image.width
        this.height = image.height
        this.speed = -2
        this.c = c
        this.maxPosition = image.width + 100
        this.currentStep = 0
        this.currentWay = 1
    }

    draw() {
        this.c.drawImage(this.image, this.position.x, this.position.y)
    }

    update() {
        this.draw()

        this.currentStep += this.currentWay
        this.position.x -= this.speed * this.currentWay
        if (this.currentStep == this.maxPosition) {
            this.currentWay = -1
        }
        if (this.currentStep == 0) {
            this.currentWay = 1
        }
    }
}
