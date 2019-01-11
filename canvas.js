var canvas = document.querySelector('canvas');
canvas.width = 1000;
canvas.height = 650;
var c = canvas.getContext('2d');

const myTank = new Tank(900, 300);
const bulletList = new LinkedListForBullets();
const blocksArr = [];
const deathAnimation = [];
let bulletsId = 1;
let spiderBulletsId = 1;
let tankSide = 'Numpad6';
const spidersArr =[];
let canShoot = true;

spidersArr.push(new Spider(10, 10));
spidersArr.push(new Spider(10, 70));
spidersArr.push(new Spider(10, 130));
spidersArr.push(new Spider(10, 190));
spidersArr.push(new Spider(10, 250));
spidersArr.push(new Spider(10, 310));
spidersArr.push(new Spider(10, 370));
spidersArr.push(new Spider(10, 430));
spidersArr.push(new Spider(10, 480));
spidersArr.push(new Spider(160, 160));
spidersArr.push(new Spider(160, 220));
spidersArr.push(new Spider(160, 280));
spidersArr.push(new Spider(220, 340));
spidersArr.push(new Spider(220, 160));
spidersArr.push(new Spider(220, 220));
spidersArr.push(new Spider(220, 280));
spidersArr.push(new Spider(220, 340));




//THIS IS FOR MORE FLUID MOVEMENT OF THE TANK...
const movementBool = {
    'Numpad6': false,
    'Numpad5': false,
    'Numpad4': false,
    'Numpad8': false,
}
//BUILDS A FIELD OF col * row RECTS WITH SIDE 5PX AND SPACE BETWEEN 1PX;
function squareBuilder(x, y, col, row) {
    let inX = x;
    let inY = y;
    let arr = [];
    let obj = {
        arr: arr,
        startX: x - 60,
        startY: y - 60,
        endX: null,
        endY: null,
    }

    for (let j = 0; j < col; j++) {
        for (let i = 0; i < row; i++) {
            arr.push(new Block(inX, inY));
            inX += 11;
        }
        if (j === col - 1) {
            obj.endX = inX;
            obj.endY = inY + 11;
        }
        inY += 11;
        inX = x;
    }

    return obj;
}
//HOW OFTEN AND WHITCH SIDE THE SPIDER WILL CHOOSE...
function spiderMoveWhitchWay() {
    spidersArr.forEach(function(ele) {
        let n = Math.ceil(Math.random() * 4);
        let time = Math.ceil(Math.random() * 3);
        switch(time) {
            case 1: time = 500;
                break;
            case 2: time = 1000;
                break;
            case 3: time = 2000;
                break;
        }
        if (ele.canChangeSide) {
            ele.canChangeSide = false;
            setTimeout(function() {
                ele.canChangeSide = true;
            }, time)
            ele.side = n;
        }
    })
    setTimeout(spiderMoveWhitchWay, 1000);
}

//HOW FAST THE SPIDER PICS WILL CHANGE...
function setTimeForPicChange() {
    spidersArr.forEach(function(ele) {
        if(ele.bool) {
            ele.bool = false;
        } else {
            ele.bool = true;
        }
    })
    setTimeout(setTimeForPicChange, 200);
}
//HOW OFTHEN THE TANK CAN SHOOT...
function canShootBoolChange() {
    canShoot = true;
    setTimeout(canShootBoolChange, 1000)
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Numpad4' || event.code === 'Numpad5' || event.code === 'Numpad6' || event.code === 'Numpad8') {
        tankSide = event.code;
        myTank.setPosition = tankSide;
        for (prop in movementBool) {
            if (movementBool[prop]) {
                return;
            }
        }
        for (prop in movementBool) {
            if (prop === event.code) {
                movementBool[prop] = true;
            }
        }
    }
    if (event.code === 'Space' && canShoot) {
        bulletList.add(myTank.x + 25, myTank.y + 25, bulletsId, tankSide, 'tank');
        bulletsId++;
        canShoot = false;
    }
})
document.addEventListener('keyup', function(event) {
    if (event.code === 'Numpad4' || event.code === 'Numpad5' || event.code === 'Numpad6' || event.code === 'Numpad8') {
        for (prop in movementBool) {
            if (prop === event.code) {
                movementBool[prop] = false;
            }
        }
    }
})
blocksArr.push(squareBuilder(100, 100, 40, 4));
blocksArr.push(squareBuilder(200, 100, 4, 40));
blocksArr.push(squareBuilder(200, 500, 4, 40));
blocksArr.push(squareBuilder(390, 200, 22, 4));
blocksArr.push(squareBuilder(700, 100, 40, 4));


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0 ,0, canvas.width, canvas.height);
    // DRAWS THE BLOCKS
    blocksArr.forEach(function(ele) {
        for (let i =0; i < ele.arr.length; i++) {
            if(ele.arr[i]) {
                ele.arr[i].drawBlock();
            }
        }
    });

    //THE SMOOTH MOVEMENT OF THE TANK
    for (prop in movementBool) {
        if (movementBool[prop]) {
            myTank.tankMovement(prop, blocksArr);
        }
    }
    //MOVING THE SPIDERS
    spidersArr.forEach(function (ele) {
            if (ele.visible) {
                ele.spiderMovement(blocksArr);
            }
    });
    // DRAWING THE SPIDERS FROM THE ARRAY
    spidersArr.forEach(function (ele) {
        if (ele.visible) {
            ele.drawSpider();
        }
    });
    //DRAWING THE TANK...
    if (myTank.visable) {
        myTank.drawTank();
    }
    //HOW OFTEN THE SPIDERS WILL SHOOT;
    spidersArr.forEach(function(ele) {
        if (!ele.visible) {
            return;
        }
        if (ele.shootBool) {
            bulletList.add(ele.x + 25, ele.y + 25, spiderBulletsId, ele.side, 'spider');
            spiderBulletsId++;
            ele.shootBool = false;

            let time = Math.ceil(Math.random() * 10);
            switch (time) {
                case 1:
                    time = 1000;
                    break;
                case 2:
                    time = 1500;
                    break;
                case 3:
                    time = 2000;
                    break;
                case 4:
                    time = 2500;
                    break;
                case 5:
                    time = 3000;
                    break;
                case 6:
                    time = 3500;
                    break;
                case 7:
                    time = 4000;
                    break;
                case 8:
                    time = 700;
                    break;
                case 9:
                    time = 2700;
                    break;
                case 10:
                    time = 1200;
                    break;
            }
             
            setTimeout(function() {
                ele.shootBool = true;
            }, time);
        }
    })
    //EVERYTHING FOR THE BULLETS!
    bulletList.drawingMovementColisionFunc(spidersArr, blocksArr);
    //THE NOT SO GOOD LOOKING DEATH ANIMATION...
    deathAnimation.forEach(function(ele) {
        if(ele.bool) {
            if (ele.boolForsetTimeOut) {
                ele.boolForsetTimeOut = false;
                setTimeout(function() {
                    ele.boolChange = false;
                }, 500)
            }
            ele.draw();
        }
    });
}
animate();

spiderMoveWhitchWay();
setTimeForPicChange();
canShootBoolChange()

