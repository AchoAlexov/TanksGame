class Tank {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.img = this.imgMaker('Numpad6');
        this.bool = true;
        this._position = 'Numpad6';
        this.visable = true;
    }
    set setPosition(val) {
        this._position = val;
    }
    get position() {
        return this._position;
    }
    drawTank() {
        c.drawImage(this.img, this.x, this.y, 50, 50);
    }

    tankBlocksColisionChek(blocksArr) {
        for (let i = 0; i < blocksArr.length; i++) {
            if (blocksArr[i]) {
                if (this.position === 'Numpad6') {
                    if (this.x + 50 > blocksArr[i].x - 5 && this.x + 55 < blocksArr[i].x + 10 && this.y + 50 > blocksArr[i].y && this.y < blocksArr[i].y + 10 && this.y) {
                        this.x -= 5;
                        return true;
                    }
                } else if (this.position === 'Numpad4') {
                    if (this.x <= blocksArr[i].x + 13 && this.x > blocksArr[i].x && this.y + 50 > blocksArr[i].y && this.y < blocksArr[i].y + 10 && this.y) {
                        this.x += 5;
                        return true;
                    }
                } else if (this.position === 'Numpad5') {
                    if (this.y + 52 > blocksArr[i].y && this.y + 52 < blocksArr[i].y + 10 && this.x + 50 >= blocksArr[i].x && this.x <= blocksArr[i].x + 10) {
                        this.y -= 5;
                        return;
                    }

                } else if (this.position === 'Numpad8') {
                    if (this.y < blocksArr[i].y + 12 && this.y > blocksArr[i].y && this.x + 50 >= blocksArr[i].x && this.x <= blocksArr[i].x + 10) {
                        this.y += 5;
                        return true;
                    }

                }
            }
            
        }
    }

    tankMovement(val, blocksArr) {

        let movementSpeed = 2;  
        // RESTRICS THE TANK TO GO OUT OF THE BORDERS OF THE CANVAS!!!
        if (this.x < 0) {
            this.x += movementSpeed;
            return;
        } else if (this.x > canvas.width - 50) {
            this.x -= movementSpeed;
            return;
        } else if (this.y < 0) {
            this.y += movementSpeed;
            return;
        } else if (this.y > canvas.height - 50) {
            this.y -= movementSpeed;
            return;
        }
        //THE BLOCKS COLISION CHECK...
       for (let i = 0; i < blocksArr.length; i++) {
           if (this.x >= blocksArr[i].startX && this.x <= blocksArr[i].endX && this.y >= blocksArr[i].startY && this.y <= blocksArr[i].endY) {
               if (this.tankBlocksColisionChek(blocksArr[i].arr)) {
                   return;
               }
           }
       }

        //CHOOSE THE RIGHT IMAGE...
        this.img = this.imgMaker(val);

        //THE MOVEMENT OF THE TANK...
        switch (val) {
            case 'Numpad8':
                this.y -= movementSpeed;
                break;
            case 'Numpad4':
                this.x -= movementSpeed;
                break;
            case 'Numpad5':
                this.y += movementSpeed;
                break;
            case 'Numpad6':
                this.x += movementSpeed;
                break;
        }
    }

    imgMaker(val) {
        let img = new Image();
        if (val === 'Numpad6' && this.bool) {
            img.src = 'pics/tankRight1.png';
            this.bool = false;
        } else if (val === 'Numpad6' && !this.bool) {
            img.src = 'pics/tankRight2.png';
            this.bool = true;
        } else if (val === 'Numpad8' && this.bool) {
            img.src = 'pics/tankUp1.png';
            this.bool = false;
        } else if (val === 'Numpad8' && !this.bool) {
            img.src = 'pics/tankUp2.png';
            this.bool = true;
        } else if (val === 'Numpad4' && this.bool) {
            img.src = 'pics/tankLeft1.png';
            this.bool = false;
        } else if (val === 'Numpad4' && !this.bool) {
            img.src = 'pics/tankLeft2.png';
            this.bool = true;
        } else if (val === 'Numpad5' && this.bool) {
            img.src = 'pics/tankDown1.png';
            this.bool = false;
        } else if (val === 'Numpad5' && !this.bool) {
            img.src = 'pics/tankDown2.png';
            this.bool = true;
        }

        return img;
    }
}
