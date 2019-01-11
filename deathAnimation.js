class DeathAni {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bool = true;
        this.boolForsetTimeOut = true;
        this.n = 3;
    }

    draw() {
        c.beginPath();
        c.fillStyle = 'red';
        c.arc(this.x, this.y, this.n, 0, Math.PI * 2);
        c.fill();
        c.stroke();
        this.n += 0.5;
    }
    set boolChange(boolean) {
        this.bool = boolean;
    }
    
}