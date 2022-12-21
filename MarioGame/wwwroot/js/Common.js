export const background = new Image()
background.src = '../images/background.jpg'

export const mario = new Image()
mario.src = '../images/mario.png'

export const gravity = 1.0

const canvas = document.getElementById('canvas')
export const c = canvas.getContext('2d')

export function createImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc
    return image
}

export const enemy = new Image()
enemy.src = '../images/enemy.png'
