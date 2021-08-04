const canvas = document.querySelector("canvas")
const cxt = canvas.getContext("2d")

let frames = 0
let interval
const obstacles = []

const images = {
    logo: "./images/logo.jpg",
    backg: "./images/backg.jpeg",
    hero: "./images/hero.png",
    trunk: "./images/trunk.png",
    coral: "./images/Coral2.png"
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
        this.x = 400
        this.width = 50
        this.height = 50
        this.image = new Image()
        this.image.src = images.hero
        this.image.onload = () => {
            this.draw()
        }
    }

    draw() {
        cxt.drawImage(this.image, this.x, this.y, this.width, this.height)
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

class Trunk {
    constructor(x) {
        this.x = x
        this.y = canvas.height
        this.width = 100
        this.height = 50
        this.trunk = new Image()
        this.trunk.src = images.trunk
    }
    draw() {
        this.y--
            cxt.drawImage(this.trunk, this.x, this.y, this.width, this.height)
    }
}

function generateTrunks() {
    if (frames % 50 === 0) {
        max = 650
        min = 0
        const ventanita = 150
        const randomWidth = Math.floor(Math.random() * (max - min))
        obstacles.push(new Trunk((randomWidth + ventanita), randomWidth))
        console.log(obstacles)
    }
}

function drawTrunks() {
    obstacles.forEach(trunk => trunk.draw())
}

const trunk = new Trunk()

class Coral {
    constructor(x) {
        this.x = x
        this.y = canvas.height
        this.width = 50
        this.height = 50
        this.coral = new Image()
        this.coral.src = images.coral
    }
    draw() {
        this.y--
            cxt.drawImage(this.coral, this.x, this.y, this.width, this.height)
    }
}

function generateCoral() {
    if (frames % 100 === 0) {
        max = 650
        min = 0
        const ventanita = 150
        randomWidth = Math.floor(Math.random() * (max - min))
        obstacles.push(new Coral((randomWidth + ventanita), randomWidth))
        console.log(obstacles)
    }
}

function drawCoral() {
    obstacles.forEach(coral => coral.draw())
}

const coral = new Coral()

function gameOver() {
    clearInterval(interval)
}

function checkColition() {
    if (axolotl.x >= canvas.width - 150) {
        return gameOver()
    }
    if (axolotl.y >= canvas.height - axolotl.height) {
        return gameOver()
    }
}

const background = new Background()
const axolotl = new Axolotl()

function update() {
    frames++
    cxt.clearRect(0, 0, canvas.width, canvas.height)
    background.draw()
    axolotl.draw()
    checkColition()
    generateTrunks()
    drawTrunks()
    generateCoral()
    drawCoral()
}

function start() {
    interval = setInterval(update, 1000 / 60)
}
start()