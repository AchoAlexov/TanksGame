var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

class Star {
    constructor(x, y, len) {
        this.x = x;
        this.y = y;
        this.x1 = x;
        this.y1 = y;
        this.len = len;
    }

    createStar() {
        c.beginPath()
        c.moveTo(this.x, this.y);
        c.lineTo(this.x += this.len, this.y);
        c.lineTo(this.x -= this.len / 1.3, this.y += this.len / 2);
        c.lineTo(this.x += this.len / 3, this.y -= this.len / 1.1);
        c.lineTo(this.x += this.len / 3.3, this.y += this.len / 1.1);
        c.lineTo(this.x1, this.y1);
        c.stroke();
    }
}

let menyStars = [];
let x = 100;
let y = 100;

for (let i = 0; i < 10; i ++) {

    menyStars.push(new Star(x, y, 100));
    x += 50;
    y += 50;
}

menyStars.forEach(ele => {
    ele.createStar();
})