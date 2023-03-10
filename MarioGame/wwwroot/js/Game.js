let maxScore = 0
const background = new Image()
background.src = '/images/background.jpg'

const mario = new Image()
mario.src = '/images/mario.png'

const gravity = 1.0

const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

function createImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc
    return image
}

const enemy = new Image()
enemy.src = '/images/enemy.png'

class GenericObject {
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
class Enemy {
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

class Health {
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

class Platform {
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
class Player {
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

const padBetweenPlatforms = 5

class Game {
    constructor() {
        this.player = new Player(c)
        this.platformImage = createImage('/images/platform.png')
        this.platforms = []
        this.genericObjects = []
        this.enemies = []
        this.isJumped = false
        this.isGameEnded = false
        this.health = 3

        this.keys = {
            right: {
                pressed: false,
            },
            left: {
                pressed: false,
            },
        }

        this.scrollOffset = 0

        this.init = this.init.bind(this)
        this.animate = this.animate.bind(this)

        this.countOfHealth = []
    }

    init() {
        // ???????????????????? ????????????
        const h = createImage('/images/health.png')
        this.countOfHealth = []
        for (let i = 0; i < this.health; i++) {
            this.countOfHealth.push(
                new Health({
                    x: 30 + i * 30,
                    y: 20,
                    image: h,
                    c: c,
                })
            )
        }
        this.player = new Player(c)
        this.platformImage = createImage('/images/platform.png')
        this.platforms = [
            // ?????????????????? ??????????????????, ???? ?????????????? ?????????? ??????????????
            new Platform({
                x: this.platformImage.width * 6 - padBetweenPlatforms,
                y: 350,
                image: this.platformImage,
                c: c,
            }),

            // ?????? ?????????? ?????????????? ??????
            new Platform({
                x: this.platformImage.width * 11 - this.platformImage.width / 2,
                y: 440,
                image: this.platformImage,
                c: c,
            }),

            new Platform({
                x: this.platformImage.width * 12 - padBetweenPlatforms,
                y: 300,
                image: this.platformImage,
                c: c,
            }),

            new Platform({
                x: this.platformImage.width * 19 + this.platformImage.width / 2,
                y: 440,
                image: this.platformImage,
                c: c,
            }),

            new Platform({
                x: this.platformImage.width * 21 - this.platformImage.width / 2,
                y: 285,
                image: this.platformImage,
                c: c,
            }),

            new Platform({
                x:
                    this.platformImage.width * 22 +
                    this.platformImage.width / 2 -
                    padBetweenPlatforms,
                y: 285,
                image: this.platformImage,
                c: c,
            }),

            // ??????????????????, ???? ?????????????? ????????????
            new Platform({
                x: -1,
                y: 540,
                image: this.platformImage,
                c: c,
            }),

            new Platform({
                x: this.platformImage.width - padBetweenPlatforms,
                y: 540,
                image: this.platformImage,
                c: c,
            }),

            // ?????????????????? ?????? ?? ???????? ????????????
            new Platform({
                x:
                    this.platformImage.width * 3 -
                    padBetweenPlatforms -
                    this.platformImage.width / 2,
                y: 540,
                image: this.platformImage,
                c: c,
            }),
            new Platform({
                x:
                    this.platformImage.width * 4 -
                    padBetweenPlatforms -
                    this.platformImage.width / 2,
                y: 540,
                image: this.platformImage,
                c: c,
            }),

            // ?????????????? ?????? ?????? ????
            new Platform({
                x: this.platformImage.width * 5,
                y: 540,
                image: this.platformImage,
                c: c,
            }),

            new Platform({
                x: this.platformImage.width * 6 - padBetweenPlatforms,
                y: 540,
                image: this.platformImage,
                c: c,
            }),

            // ?????????????? ??????
            new Platform({
                x: this.platformImage.width * 8,
                y: 540,
                image: this.platformImage,
                c: c,
            }),

            new Platform({
                x: this.platformImage.width * 9 - padBetweenPlatforms,
                y: 540,
                image: this.platformImage,
                c: c,
            }),

            // ?????????? ?????????????? ??????
            new Platform({
                x: this.platformImage.width * 14,
                y: 540,
                image: this.platformImage,
                c: c,
            }),

            new Platform({
                x: this.platformImage.width * 15 - padBetweenPlatforms,
                y: 540,
                image: this.platformImage,
                c: c,
            }),
            new Platform({
                x: this.platformImage.width * 17,
                y: 540,
                image: this.platformImage,
                c: c,
            }),
            new Platform({
                x: this.platformImage.width * 18,
                y: 540,
                image: this.platformImage,
                c: c,
            }),
            new Platform({
                x: this.platformImage.width * 25 - this.platformImage.width / 2,
                y: 540,
                image: this.platformImage,
                c: c,
            }),
            new Platform({
                x:
                    this.platformImage.width * 26 -
                    padBetweenPlatforms -
                    this.platformImage.width / 2,
                y: 540,
                image: this.platformImage,
                c: c,
            }),
            new Platform({
                x: this.platformImage.width * 27 - padBetweenPlatforms,
                y: 540,
                image: this.platformImage,
                c: c,
            }),
            new Platform({
                x: this.platformImage.width * 28 - padBetweenPlatforms,
                y: 540,
                image: this.platformImage,
                c: c,
            }),
            new Platform({
                x: this.platformImage.width * 29 - padBetweenPlatforms,
                y: 540,
                image: this.platformImage,
                c: c,
            }),
            new Platform({
                x: this.platformImage.width * 30 - padBetweenPlatforms,
                y: 540,
                image: this.platformImage,
                c: c,
            }),
        ]
        this.genericObjects = [
            new GenericObject({
                x: 0,
                y: -665,
                image: createImage('/images/background.jpg'),
                c: c,
            }),
        ]

        // ????????
        const e = createImage('/images/enemy.png')

        // ?????????????????? ???????????????????? ????????????
        this.enemies = [
            new Enemy({
                x: 750,
                y: 480,
                image: e,
                c: c,
            }),
            new Enemy({
                x: 1500,
                y: 480,
                image: e,
                c: c,
            }),
            new Enemy({
                x: 1710,
                y: 290,
                image: e,
                c: c,
            }),
            new Enemy({
                x: 3040,
                y: 380,
                image: e,
                c: c,
            }),
            new Enemy({
                x: 4080,
                y: 480,
                image: e,
                c: c,
            }),
            new Enemy({
                x: 4250,
                y: 480,
                image: e,
                c: c,
            }),
            new Enemy({
                x: 5690,
                y: 380,
                image: e,
                c: c,
            }),
            new Enemy({
                x: 5980,
                y: 225,
                image: e,
                c: c,
            }),
            new Enemy({
                x: 6575,
                y: 225,
                image: e,
                c: c,
            }),
            new Enemy({
                x: 7200,
                y: 480,
                image: e,
                c: c,
            }),
            new Enemy({
                x: 7950,
                y: 480,
                image: e,
                c: c,
            }),
        ]
        this.scrollOffset = 0
    }

    // ?????????????? ?????????????? ????????????????
    animate() {
        if (maxScore < this.scrollOffset) {
            console.log(maxScore, this.scrollOffset)
            maxScore = this.scrollOffset
        }
        // ?????????????? ????????????
        if (this.isGameEnded && this.player.position.y >= 475) {
            maxScore = 7900
            winGameHandler()
            return
            //const canvas = document.getElementById('canvas')
            //canvas.style.display = 'none'

            //const victoryModal = document.getElementById('victory__modal')
            //victoryModal.style.display = 'flex'
            //return
        }
        window.requestAnimationFrame(this.animate)
        c.fillStyle = 'white'
        c.fillRect(0, 0, canvas.width, canvas.height)

        // ???????????? ?????????????????? ??????????????: ??????
        this.genericObjects.forEach((object) => {
            object.draw()
        })

        // ???????????? ??????????????????
        this.platforms.forEach((platform) => {
            platform.draw()
        })

        // ???????????? ???????????????????? ????????????
        this.enemies.forEach((enemy) => {
            enemy.update()
        })

        // ???????????? ???????????????????????????? ????????????
        this.player.update()

        // ???????????? ??????????
        this.countOfHealth.forEach((health) => {
            health.draw()
        })

        // ?????????? ????????????????
        if (this.keys.right.pressed && this.player.position.x < 400) {
            this.player.velocity.x = this.player.speed
        } else if (
            (this.keys.left.pressed && this.player.position.x > 100) ||
            (this.keys.left.pressed &&
                this.scrollOffset === 0 &&
                this.player.position.x > 0)
        ) {
            this.player.velocity.x = -this.player.speed
        } else {
            this.player.velocity.x = 0
            if (this.keys.right.pressed) {
                this.scrollOffset += this.player.speed

                this.platforms.forEach((platform) => {
                    platform.position.x -= this.player.speed
                })

                this.enemies.forEach((enemy) => {
                    enemy.position.x -= this.player.speed
                    // enemy.maxPosition += this.player.speed
                })
            } else if (this.keys.left.pressed && this.scrollOffset > 0) {
                this.scrollOffset -= this.player.speed

                this.platforms.forEach((platform) => {
                    platform.position.x += this.player.speed
                })

                this.enemies.forEach((enemy) => {
                    enemy.position.x += this.player.speed
                    // enemy.maxPosition -= this.player.speed
                })
            }
        }

        // ?????????????????????? ???????????????????????? ???? ??????????????????
        this.platforms.forEach((platform) => {
            if (
                this.player.position.y + this.player.height <=
                platform.position.y &&
                this.player.position.y +
                this.player.height +
                this.player.velocity.y >=
                platform.position.y &&
                this.player.position.x + this.player.width >=
                platform.position.x &&
                this.player.position.x <= platform.position.x + platform.width
            ) {
                this.player.velocity.y = 0
                this.isJumped = false
            }
        })

        // ???????????????????????? ???????? ?? ????????????????????
        this.enemies.forEach((enemy) => {
            if (
                Math.abs(this.player.position.x - enemy.position.x) < 30 &&
                Math.abs(this.player.position.y - enemy.position.y) < 30
            ) {
                this.health -= 1
                this.loseGame()
            }
        })

        // ????????????:
        if (this.scrollOffset > 7900) {
            this.isGameEnded = true
        }

        // ??????????????????:
        if (this.player.position.y > canvas.height) {
            this.health -= 1
            this.loseGame()
        }
    }

    // ???????????????????? ?????????????? ???? ???????????? ????????????????????
    atachEvents() {
        window.addEventListener('keydown', ({ keyCode }) => {
            switch (keyCode) {
                // ?????????????? "A"
                case 65:
                    this.keys.left.pressed = true
                    break
                // ?????????????? "D"
                case 68:
                    this.keys.right.pressed = true
                    break
                // ?????????????? "W"
                case 87:
                    if (!this.isJumped) {
                        this.player.velocity.y -= 20
                        this.isJumped = true
                    }
                    break
            }
        })

        window.addEventListener('keyup', ({ keyCode }) => {
            switch (keyCode) {
                // ?????????????? "A"
                case 65:
                    this.keys.left.pressed = false
                    break
                // ?????????????? "D"
                case 68:
                    this.keys.right.pressed = false
                    break
            }
        })
    }

    // ?????????????????? ???????????? ????????????
    loseGame() {
        if (this.health > 0) {

            if (maxScore < this.scrollOffset) maxScore = this.scrollOffset
            this.init()
        } else {

            // ?????????????? ??????????????????
            if (this.health == 0) {
                //const canvas = document.getElementById('canvas')
                //canvas.style.display = 'none'

                //const loseModal = document.getElementById('lose__modal')
                //loseModal.style.display = 'flex'
                loseGameHandler()
                console.log("??????????????????")
                return
            }
        }
    }
}

function startGame() {
    const game = new Game()
    game.init()
    game.atachEvents()
    game.animate()
}
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas')

    canvas.width = 1024
    canvas.height = 576

    startGame()
})

function winGameHandler() {
    $.post('WinGame', { score: maxScore }, function () {
        location.href = '/Home/WinGame';
    });
}

function loseGameHandler() {
    $.post('LoseGame', { score: maxScore }, function () {
        location.href = '/Home/LoseGame';
    });
}