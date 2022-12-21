import { Game } from './Game.js'

function startGame() {
    const game = new Game()
/*    document.getElementById('canvas').style.display = 'block'*/
/*    document.getElementById('victory__modal').style.display = 'none'
    document.getElementById('start__modal').style.display = 'none'
    document.getElementById('lose__modal').style.display = 'none'*/
    game.init()
    game.atachEvents()
    game.animate()
}

console.log('До DOMContentLoaded')
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded')
    const canvas = document.getElementById('canvas')
    console.log(canvas)

    canvas.width = 1024
    canvas.height = 576
    startGame()

    /*const restart = document.getElementById('restart')
    restart.addEventListener('click', startGame)

    const loseRestart = document.getElementById('loseRestart')
    loseRestart.addEventListener('click', startGame)

    const startLvl1 = document.getElementById('firstLvl')
    startLvl1.addEventListener('click', startGame)*/
})
