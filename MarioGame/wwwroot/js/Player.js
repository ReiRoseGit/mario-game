import { mario, gravity } from './Common.js'
export class Player {
    constructor(c) {
        this.position = {
            x: 100,
            y: 100,
        }
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.width = 60
        this.height = 60
        this.speed = 7
        this.image = mario
        this.c = c
    }

    draw() {
        this.c.drawImage(this.image, this.position.x, this.position.y)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    }
}
