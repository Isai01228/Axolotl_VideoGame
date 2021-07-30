const canvas = document.querySelector("canvas")
const cxt = canvas.getContext("2d")

const images = {
    logo: "./images/logo.jpg"
}
class Logo {
    constructor() {
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.image = new Image()
        this.image.src = images.logo
    }
    draw() {
        cxt.drawImage(this.image, this.x, this.y, this.width, this.height)

    }
}

function update() {
    logo.draw()
}