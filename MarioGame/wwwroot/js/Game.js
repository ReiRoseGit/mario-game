import { Player } from './Player.js'
import { c, createImage, enemy } from './Common.js'
import { Platform } from './Platform.js'
import { GenericObject } from './GenericObject.js'
import { Enemy } from './Enemy.js'
import { Health } from './Health.js'

const padBetweenPlatforms = 5

export class Game {
    constructor() {
        this.player = new Player(c)
        this.platformImage = createImage('../images/platform.png')
        this.platforms = []
        this.genericObjects = []
        this.enemies = []
        this.isJumped = false
        this.isGameEnded = false
        this.health = 4

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
        // Количество жизней
        const h = createImage('../images/health.png')
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
        this.platformImage = createImage('../images/platform.png')
        this.platforms = [
            // Добавляем платформы, на которые можно прыгать
            new Platform({
                x: this.platformImage.width * 6 - padBetweenPlatforms,
                y: 350,
                image: this.platformImage,
                c: c,
            }),

            // Для очень большой ямы
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

            // Платформы, по которым бегаем
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

            // Маленькая яма с двух сторон
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

            // Обычный пол без ям
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

            // Большая яма
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

            // Очень большая яма
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
                image: createImage('./images/background.jpg'),
                c: c,
            }),
        ]

        // Враг
        const e = createImage('./images/enemy.png')

        // Добавляем движущихся врагов
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

    // Главная функция анимации
    animate() {
        if (this.isGameEnded && this.player.position.y >= 475) {
            const canvas = document.getElementById('canvas')
            canvas.style.display = 'none'

            const victoryModal = document.getElementById('victory__modal')
            victoryModal.style.display = 'flex'
            return
        }
        window.requestAnimationFrame(this.animate)
        c.fillStyle = 'white'
        c.fillRect(0, 0, canvas.width, canvas.height)

        // Рисуем остальные объекты: фон
        this.genericObjects.forEach((object) => {
            object.draw()
        })

        // Рисуем платформы
        this.platforms.forEach((platform) => {
            platform.draw()
        })

        // Рисуем движущихся врагов
        this.enemies.forEach((enemy) => {
            enemy.update()
        })

        // Рисуем анимированного игрока
        this.player.update()

        // Рисуем жизни
        this.countOfHealth.forEach((health) => {
            health.draw()
        })

        // Игрок движется
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

        // Возможность запрыгивания на платформы
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

        // Обрабатываем удар о противника
        this.enemies.forEach((enemy) => {
            if (
                Math.abs(this.player.position.x - enemy.position.x) < 30 &&
                Math.abs(this.player.position.y - enemy.position.y) < 30
            ) {
                this.health -= 1
                this.loseGame()
            }
        })

        // Победа:
        if (this.scrollOffset > 7900) {
            this.isGameEnded = true
        }

        // Поражение:
        if (this.player.position.y > canvas.height) {
            this.health -= 1
            this.loseGame()
        }
    }

    // Навешиваем события на кнопку клавиатуры
    atachEvents() {
        window.addEventListener('keydown', ({ keyCode }) => {
            switch (keyCode) {
                // Клавиша "A"
                case 65:
                    this.keys.left.pressed = true
                    break
                // Клавиша "D"
                case 68:
                    this.keys.right.pressed = true
                    break
                // Клавиша "W"
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
                // Клавиша "A"
                case 65:
                    this.keys.left.pressed = false
                    break
                // Клавиша "D"
                case 68:
                    this.keys.right.pressed = false
                    break
            }
        })
    }

    // Обработка смерти игрока
    loseGame() {
        if (this.health > 0) {
            this.init()
        } else {
            if (this.health == 0) {
                const canvas = document.getElementById('canvas')
                canvas.style.display = 'none'

                const loseModal = document.getElementById('lose__modal')
                loseModal.style.display = 'flex'
                return
            }
        }
    }
}
