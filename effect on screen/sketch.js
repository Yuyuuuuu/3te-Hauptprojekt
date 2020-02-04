var eyes=[];//the whole array of objects(eyes)

let R=[];
let Raduis;
let XPos;
let YPos=0;
let a;
//the value about moving
var gravity = 0.005;
let spring=0.1;
let friction=-0.5;

let Tx,Ty;
let E;

function setup() {
   createCanvas(windowWidth, windowHeight);
   R.push(20,40,60,80,100);
   Tx=0;
   Ty=height/2;
}

function keyPressed(){ 
  Raduis=random(R);
  XPos=random(windowWidth);
  E=(Raduis/20);//the magenificatiom times of pattern

  eyes.push(new Eye(XPos,YPos,Raduis,eyes,E));
}

function draw() {
  background(220);
    text('a 8 seconds information was shared.',Tx,Ty);
    Tx=Tx+1;
    if (Tx>windowWidth){
      Tx=0;
    }
    for (let i=1;i<eyes.length;i++){
    eyes[i].whiteEyes();
    eyes[i].blackEyes();
    eyes[i].redHeart();
    eyes[i].collide();
    eyes[i].moveEyes();
  }
}

class Eye{
  constructor(x,y,r,oin,e){
  this.x=x;
  this.y=y;
  this.vx=0;
  this.vy=0;
  this.r=r;
  this.others=oin;
  this.e=e;
  }

  collide() {//the action of collide between eyes
      for (let i = eyes.length+ 1; i < eyes.length-1; i++) {
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].r/ 2 + this.r / 2;
      if (distance < minDist) {
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }
  
  moveEyes() { //the movement of eyes
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.r / 2 > width) {
      this.x = width - this.r / 2;
      this.vx *= friction;
    } else if (this.x - this.r / 2 < 0) {
      this.x = this.r / 2;
      this.vx *= friction;
    }
    if (this.y + this.r / 2 > height) {
      this.y = height - this.r / 2;
      this.vy *= friction;
    } else if (this.y - this.r / 2 < 0) {
      this.y = this.r / 2;
      this.vy *= friction;
    }
  }
  
  whiteEyes(){
    stroke(0);
    strokeWeight(2);
    fill(255);
    ellipse(this.x,this.y,2*this.r,2*this.r);
  }

  blackEyes(){
  a = atan2(mouseY - this.y, mouseX - this.x);
  fill(0);
  ellipse(this.x + 0.2 * this.r * cos(a), this.y + 0.2 * this.r * sin(a), 2*this.r * 0.4, 2*this.r * 0.4);
  }

  redHeart(){
  fill(255,0,0);
  stroke(0);
  strokeWeight(2);
  push();
  translate(this.x + 0.2 * this.r * cos(a),this.y + 0.2 * this.r * sin(a));
  scale(this.e);
  beginShape();
  vertex(0,0);//1
  vertex(-6,6);//2
  vertex(-12,0);//3
  vertex(-12,-4);//4
  vertex(-10,-6);//5
  vertex(-8,-6);//6
  vertex(-6,-4);//7
  vertex(-4,-6);//8
  vertex(-2,-6);//9
  vertex(0,-4);//10
  endShape(CLOSE);
  pop();
  }

}
