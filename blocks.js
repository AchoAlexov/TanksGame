class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bx = 10;
        this.by = 10;
    }

    drawBlock() {
        c.fillStyle = 'gray';
        c.fillRect(this.x, this.y, this.bx, this.by);
    }
}

