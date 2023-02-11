// canvas 1
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// canvas 2
const canvasbg = document.getElementById('canvasbg');
const ctxbg = canvasbg.getContext('2d');
canvasbg.width = window.innerWidth;
canvasbg.height = window.innerHeight;

// array of bubbles
let Bubbles = [];
let bgBubbles = [];

// coca-cola bubbles at the bottom of the page
function addBubble() {
    Bubbles.push(new Bubble('rgb(53, 20, 27)', 3)); // brown bubbles (representing the cola)
}

function addBgBubble() {
    bgBubbles.push(new Bubble('rgb(255,248,255)', 4)); // white bubbles (representing the foam)
}

// class
class Bubble {
    constructor(color, ySpeed) {
        this.radius = (Math.random() * 150) + 30;
        this.life = true; // is the bubble active?
        this.x = (Math.random() * window.innerWidth);
        this.y = (Math.random() * 20) + window.innerHeight + this.radius;
        this.vy = ((Math.random() * 0.0002) + 0.001) + ySpeed; // vertical velocity
        this.vr = 0; // radius velocity
        this.vx = (Math.random() * 4) - 2; // horizontal velocity
        this.color = color;
    }

    update() {
        this.vy += 0.00001; // speed increasing the longer the bubble is moving
        this.vr += 0.02; // determines how fast the bubbles are shrinking
        this.y -= this.vy; // the posiiton of the bubble on the y-axis
        this.x += this.vx; // the position of the bubble on the x-axis
        if (this.radius > 1) {
            this.radius -= this.vr; // the radius of the bubble will get smaller
        }
        if (this.radius <= 1) {
            this.life = false;
        }
    }

    draw(currentCanvas) {
        currentCanvas.beginPath();
        currentCanvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        currentCanvas.fillStyle = this.color;
        currentCanvas.fill();
    }
}

function handleBubbles() {
    for (let i = Bubbles.length - 1; i >= 0; i--) {
        Bubbles[i].update();
        if (!Bubbles[i].life) {
            Bubbles.splice(i, 1); // if the bubble is not active (i.e. false), the bubble will be removed from the array (Bubbles)
        }
    }
    for (let i = bgBubbles.length - 1; i >= 0; i--) {
        bgBubbles[i].update();
        if (!bgBubbles[i].life) {
            bgBubbles.splice(i, 1); // if the bubble is not active (i.e. false), the bubble will be removed from the array (bgBubbles)
        }
    }
    if (Bubbles.length < (window.innerWidth / 4)) {
        addBubble(); // fresh bubbles will be added
    }
    if (bgBubbles.length < (window.innerWidth / 8)) {
        addBgBubble(); // fresh bubbles will be added
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas for ctx
    ctxbg.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas for ctxbg

    handleBubbles();

    for (let i = bgBubbles.length - 1; i >=0; i--) {
        bgBubbles[i].draw(ctxbg);
    }
    for (let i = Bubbles.length - 1; i >=0; i--) {
        Bubbles[i].draw(ctx);
    }

    requestAnimationFrame(animate);
}

window.addEventListener('load', animate); // loads bubbles on screen

window.addEventListener('resize', function() { // resizes bubbles based on the new screen width and height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasbg.width = window.innerWidth;
    canvasbg.height = window.innerHeight;

    // new bubbles to be added to the array once the screen has resized
    let Bubbles = [];
    let bgBubbles = [];
});