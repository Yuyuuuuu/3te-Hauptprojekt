var eyes=[];
let ClickTime=[];
let CountOfClicks=0;
let R;
let XPos=[];
let YPos;
let a;

var gravity = 0.03;
let spring=0.05;
let friction=-0.9;

function setup() {
   createCanvas(800, 600);
   XPos.push(250,260,270);
   ClickTime[0]=0; 
}

function keyPressed(){ 
  ClickTime.push(ceil(millis()/1000));
  CountOfClicks++;
  R=(ClickTime[CountOfClicks]-ClickTime[CountOfClicks-1])*6;
  YPos=(ClickTime[CountOfClicks]+ClickTime[CountOfClicks-1])*6;
  console.log(ClickTime[CountOfClicks],R,YPos);  
  eyes.push(new Eye(random(XPos),YPos,R,CountOfClicks,eyes));
}

function draw() {
  background(220); 
  for (let i=1;i<eyes.length;i++){
    eyes[i].whiteEyes();
    eyes[i].blackEyes();
    if(mouseIsPressed===true){
    eyes[i].collide();
    eyes[i].moveEyes();
  }
  } 
}

class Eye{
constructor(x,y,r,idin,oin){
this.x=x;
this.y=y;
this.vx=0;
this.vy=0;
this.r=r;
this.id=idin;
this.others=oin;
}

collide() {
    for (let i = this.id + 1; i < ClickTime.length-1; i++) {
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
  
  moveEyes() {
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
  strokeWeight(1);
  if(keyCode===LEFT_ARROW){
    fill(255,80,79);
  }else if (keyCode===UP_ARROW){
    fill(0,122,135);
  }else if (keyCode===RIGHT_ARROW){
    fill(64,64,255);
  }
  ellipse(this.x,this.y,this.r,this.r);
  
  }
blackEyes(){
  a = atan2(mouseY - this.y, mouseX - this.x);
  fill(0);
  ellipse(this.x + 0.2 * this.r * cos(a), this.y + 0.2 * this.r * sin(a), this.r * 0.5, this.r * 0.5);

}


}
