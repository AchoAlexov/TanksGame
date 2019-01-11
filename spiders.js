class Spider {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.side = 1;
        this.img = this.imgMaker(this.side);
        this.bool = true;
        this.canChangeSide = true;
        this.shootBool = true;
        this.visible = true;
    }
    
    drawSpider() {
        c.drawImage(this.img, this.x, this.y, 50, 50);
    }
    imgMaker(val) {
        let img = new Image();
        if (val === 1 && this.bool) {
            img.src = 'SpiderPics/mySpiderUp1.png';
        } else if (val === 1 && !this.bool) {
            img.src = 'SpiderPics/mySpiderUp2.png';
        } else if (val === 2 && this.bool) {
            img.src = 'SpiderPics/mySpiderDown1.png';
        } else if (val === 2 && !this.bool) {
            img.src = 'SpiderPics/mySpiderDown2.png';
        } else if (val === 3 && this.bool) {
            img.src = 'SpiderPics/mySpiderLeft1.png';
        } else if (val === 3 && !this.bool) {
            img.src = 'SpiderPics/mySpiderLeft2.png';
        } else if (val === 4 && this.bool) {
            img.src = 'SpiderPics/mySpiderRight1.png';
        } else if (val === 4 && !this.bool) {
            img.src = 'SpiderPics/mySpiderRight2.png';
        }
        return img;
    }
    spiderBlocksColisionCheck(blocksArr) {
        for (let i = 0; i < blocksArr.length; i++) {
            if (this.side === 4) {
                if (this.x + 52 > blocksArr[i].x && this.x + 52 < blocksArr[i].x + 10 && this.y + 50 > blocksArr[i].y && this.y < blocksArr[i].y + 10 && this.y) {
                    this.x -= 5;
                    return;
                }
            } else if (this.side === 3) {
                if (this.x <= blocksArr[i].x + 10 && this.x > blocksArr[i].x && this.y + 50 > blocksArr[i].y && this.y < blocksArr[i].y + 10 && this.y) {
                    this.x += 5;
                    return;
                }
            } else if (this.side === 2) {
                if (this.y + 52 > blocksArr[i].y && this.y + 52 < blocksArr[i].y + 10 && this.x + 50 >= blocksArr[i].x && this.x <= blocksArr[i].x + 10) {
                    this.y -= 5;
                    return;
                }

            } else if (this.side === 1) {
                if (this.y < blocksArr[i].y + 10 && this.y > blocksArr[i].y && this.x + 50 >= blocksArr[i].x && this.x <= blocksArr[i].x + 10) {
                    this.y += 5;
                    return;
                }

            }
        }
    }
    spiderMovement(blocksArr) {
        const speed = 1;
        // going out of the borders.... not on my watch...
        if (this.x < 0) {
            this.x += speed * 3;
            return;
        }
        if (this.x > canvas.width - 50) {
            this.x -= speed * 3;
            return;
        }
        if (this.y < 0) {
            this.y += speed * 3;
            return;
        }
        if (this.y > canvas.height - 50) {
            this.y -= speed * 3;
            return;
        }
        //BLOCKS COLISION 
        blocksArr.forEach( (ele) => {
            if (this.x >= ele.startX && this.x <= ele.endX && this.y >= ele.startY && this.y <= ele.endY) {
                if (this.spiderBlocksColisionCheck(ele.arr)) {
                    return;
                }
            }
        })
        //CHOOSE THE PIC...
        this.img = this.imgMaker(this.side);
        // The spider movement...
        switch(this.side) {
            case 1 : this.y -= speed;
                break;
            case 2 : this.y += speed;
                break;
            case 3 : this.x -= speed;
                break;
            case 4 : this.x += speed;
        }
    }
    
}
