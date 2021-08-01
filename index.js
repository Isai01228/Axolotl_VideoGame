const canvas = document.querySelector("canvas")
const cxt = canvas.getContext("2d")

let frames = 0
let interval
const obstacles = []

const images = {
    logo: "./images/logo.jpg",
    backg: "./images/backg.jpeg",
    hero: "./images/hero.png"
}
class Background {
    constructor() {
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.image = new Image()
        this.image.src = images.backg
        this.image.onload = () => {
            this.draw()
        }
    }
    draw() {
        this.y--
            if (this.y < -canvas.height) this.y = 0
        cxt.drawImage(this.image, this.x, this.y, this.width, this.height)
        cxt.drawImage(
            this.image,
            this.x,
            this.y + canvas.height,
            this.width,
            this.height
        )
    }
}

class Axolotl {
    constructor() {
        this.y = 50
        this.x = 500
        this.width = 250
        this.height = 100
        this.sx = 500
        this.sy = 0
        this.image = new Image()
        this.image.src = images.hero
        this.image.onload = () => {
            this.draw()
        }
    }

    draw() {
        if (this.sx < 0) this.sx = 500
        cxt.drawImage(this.image, this.sx, this.sy, 500, 500, this.x, this.y, this.width, this.height)
    }

    goLeft() {
        this.x -= 30
    }
    goRight() {
        this.x += 30
    }
    goUp() {
        this.y -= 30
    }
    goDown() {
        this.y += 30
    }
    isToching(trunk) {
        return (
            this.x < trunk.x + trunk.width &&
            this.x + this.width > trunk.x &&
            this.y < trunk.y + trunk.height &&
            this.y + this.height > trunk.y
        )
    }

    isToching(coral) {

    }
}

document.addEventListener("keydown", ({ keyCode }) => {
    switch (keyCode) {
        case 37:
            axolotl.goLeft()
            break;
        case 39:
            axolotl.goRight()
            break;
        case 38:
            axolotl.goUp()
            break;
        case 40:
            axolotl.goDown()
    }
})

const background = new Background()
const axolotl = new Axolotl()

function update() {
    frames++
    cxt.clearRect(0, 0, canvas.width, canvas.height)
    background.draw()
    axolotl.draw()
}

function start() {
    interval = setInterval(update, 1000 / 60)
}
start()