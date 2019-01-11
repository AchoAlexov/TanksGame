class LinkedListForBullets {
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }

    add(x, y, id, position, belongingTo) {
        let bullet = new Bullet(x, y, id, position, belongingTo);
        if (this.length === 0) {
            this.first = bullet;
            this.last = bullet;
            this.length++;
            return;
        }
        this.last.next = bullet;
        bullet.prev = this.last;
        this.last = bullet;
        this.length++;
    }
    
    *iterate() {
        let current = this.first;
        while (current) {
            yield current;
            current = current.next;
        }
    }
    removeBlocks(bullet, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== "" && bullet.x >= arr[i]. x - 3 && bullet.x <= arr[i].x + 13 && 
            bullet.y >= arr[i].y -3 && bullet.y <= arr[i].y + 13 ) {
                if(bullet.id) {
                    this.removeBullet(bullet.id);
                }
                arr[i] = '';
            }
        }
        return arr;
    }
    drawingMovementColisionFunc(arr, blocksArr) {
        let current = this.first;
        let returnedArr;
        while (current) {
            this.bulletMovement(current);
            returnedArr = this.checkForBulletColision(current, arr, blocksArr);
            this.bulletDraw(current);

            current = current.next;
        }
        return returnedArr;
    }
    checkForBulletColision(current, arr, blocksArr) {
        //not to go out of canvas
        if (current.x < 10 || current.y < 10) {
            this.removeBullet(current.id);
        }
        if (current.x > canvas.width || current.y > canvas.height) {
            this.removeBullet(current.id);
        }
        //blocks colision... 
        for (let i = 0; i < blocksArr.length; i++) {
            if (current.x >= blocksArr[i].startX + 57 && current.x <= blocksArr[i].endX + 3 && current.y >= blocksArr[i].startY + 57 && current.y <= blocksArr[i].endY + 3) {
                    // console.log('we are at border')
                    blocksArr[i].arr = this.removeBlocks(current, blocksArr[i].arr);
                    return blocksArr;
            }
        }
        // spiders killing...
        if (current.belongingTo === 'tank') {
            for (let i = 0; i < arr.length; i++) {
                if (current.x >= arr[i].x && current.x < arr[i].x + 50 && current.y >= arr[i].y && current.y < arr[i].y + 50 && arr[i].visible) {
                    deathAnimation.push(new DeathAni(arr[i].x + 25, arr[i].y + 25));
                    this.removeBullet(current.id);
                    arr[i].visible = false;
                }
            }
        }
        //this code kills the player...
        if (current.belongingTo === 'spider') {
            if (current.x >= myTank.x && current.x <= myTank.x + 50 && current.y >= myTank.y && current.y <= myTank.y + 50) {
                deathAnimation.push(new DeathAni(myTank.x + 25, myTank.y + 25));
                this.removeBullet(current.id);
                myTank.visable = false;
            }
        }
        return arr;
    }
    bulletMovement(current) {
        switch (current.position) {
            case 'Numpad8':
                current.y -= current.speed;
                break;
            case 'Numpad6':
                current.x += current.speed;
                break;
            case 'Numpad4':
                current.x -= current.speed;
                break;
            case 'Numpad5':
                current.y += current.speed;
                break;
        }
        switch (current.position) {
            case 1:
                current.y -= current.speed;
                break;
            case 2:
                current.y += current.speed;
                break;
            case 3:
                current.x -= current.speed;
                break;
            case 4:
                current.x += current.speed; 
                break;
         }
    }
    bulletDraw(bullet) {
        c.beginPath();
        if (bullet.belongingTo == 'tank') {
            c.fillStyle = 'red';

        } else {
            c.fillStyle = 'green';
        }
        c.arc(bullet.x, bullet.y, 3, 0, Math.PI * 2);
        c.fill();
        c.stroke();
    }
    removeBullet(val) {
        let current = this.first;
        if (this.first.id == val) {
            this.first = this.first.next;
            this.length--;
            return;
        }

        while (current) {
            if (current.id == val && !current.next) {
                this.last = current.prev;
                this.last.next = null;
                this.length--;
                return;
            }
            if (current.id == val) {
                current.next.prev = current.prev;
                current.prev.next = current.next;
                this.length--;
                return;
            }
            current = current.next;
        }
    }
}

class Bullet {
    constructor(x, y, id, position, belongingTo) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.position = position;
        this.speed = 5;
        this.next = null;
        this.prev = null;
        this.belongingTo = belongingTo;
    }
}