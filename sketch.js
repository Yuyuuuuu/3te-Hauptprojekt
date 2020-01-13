let augen;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background('rgb(241, 196, 15)');
    augen = new AUGEN();
}

function draw() {
    background('rgb(241, 196, 15)');
    augen.show();
    
}

function mousePressed() {
    augen.click(mouseX, mouseY);
}

let img;
let eye;

function preload() {
    img = loadImage('in1.png');
    eye = loadImage('1.png');
}


class AUGEN {
    constructor(x, y) {
      this.x = 100;
      this.y = 100;
      this.r = 100;
      this.eye = eye;
    }
    
    click(px, py) {
        let d = dist(px, py, this.x, this.y);
        if (d < this.r) {
            console.log(5);
            this.eye = img;
            this.r = 500;
        } else{
            this.eye = eye;
            this.r = 100;
        }
    }

    show(){
        /* stroke(255);
        strokeWeight(4);
        fill(100);
        ellipse(this.x,this.y,this.r,this.r); */
        image(this.eye, this.x,this.y, this.r, this.r)
    }
}