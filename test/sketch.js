var cnv;

var eyes = [];
var eyes_xyr = [];
let ClickTime=[];
let CountOfClicks=0;
let R;
let XPos=580;
let YPos;
let ClickXPos=700;
let a;

var gravity = 0.03;
let spring=0.05;
let friction=-0.9;

let pattern=[];
let Nx;
let logo;
let angel=0;
let stabil;

function preload(){
  //  logo=loadImage('timeshop.png');
  //  logo.id('timeshoplogo');
   pattern[0]=loadImage('patterns/comment.png');
   pattern[1]=loadImage('patterns/like.png');
   pattern[2]=loadImage('patterns/sharing.png');
   pattern[3]=loadImage('patterns/empty.png');
}

function setup() {
    cnv = createCanvas(1680, 1050*3);
 
    ClickTime[0]=0;     
}

function keyTyped() {
  if (key === 'a') {
    window.localStorage.clear();
  } 
}

function keyPressed(){ 
    ClickTime.push(ceil(millis()/1000));
    CountOfClicks ++;
    R=(ClickTime[CountOfClicks] - ClickTime[CountOfClicks-1]) * 12;
    YPos=(ClickTime[CountOfClicks] + ClickTime[CountOfClicks-1]) * 6;
     
    if(keyCode===OPTION){
      Nx=0;
    }else if(keyCode===CONTROL){
      Nx=1;
    }else if(keyCode===SHIFT){
      Nx=2;
    }
    else{
      Nx=3;
    }
    // console.log(Nx);
    eyes.push(new Eye(z = XPos, YPos + 300, R, CountOfClicks, eyes,ClickXPos,Nx));
    eyes_xyr[CountOfClicks - 1] = [z, YPos, R];                     // Hier wird ein Array erstellt um nur die wichtigesten Werte zu verarbeiten: X, Y, R 
    localStorage.setItem(CountOfClicks, JSON.stringify(eyes_xyr));  // Hier werden die Werte in den Local.Storage geladen und gespeichert 
    
  }

function draw() {
  
    background(220);
    // push();
    // angel+=0.02;
    // translate(120,120);
    // rotate(angel);
    // image(logo,-80,-80,160,160);
    // pop();
    drawTimeline();
    stroke(0);
      strokeWeight(1);
      line(450,0,450,YPos+300);

    for (let i = 1;i < eyes.length;i++){
        eyes[i].whiteEyes();
        eyes[i].blackEyes();
        eyes[i].bluePoint();
        eyes[i].drawPattern();
        if(mouseIsPressed===true){
        eyes[i].collide();
        eyes[i].moveEyes();
      }
      } 
    
      console.log(Nx);
}

function eyeArray() {
 // console.log(eyes); 
}

function drawTimeline() {
  
    // Draw second Timeline 
    for (let l = 129; l < windowHeight; l+=12) {
        stroke(0);
        line(360, l, 380, l);
        
    }

     // Draw vertical Timeline 
    line(380,0,380,windowHeight);
    strokeWeight(1);
    stroke(0);
    
    // Draw red Timeline 
    for (let r = 249; r <= windowHeight; r+=720 ) {

        let a = stroke('#e74c3c');
        a.line(310, r, 350, r);
        
    }

    // Draw Timepunkt
    for (let t = 255; t <= windowHeight; t+=720 ) {
        textFont('Helvetica');
        textSize(18);
        textStyle(NORMAL); 
        noStroke();
        fill('#3742fa');
        text('14:25', 260, t);   
    }
}  


class Eye{
    constructor(x,y,r,idin,oin,cx,numberofpatterns){
    this.x=x;
    this.y=y;
    this.vx=0;
    this.vy=0;
    this.r=r;
    this.id=idin;
    this.others=oin;
    this.cx=cx;
    this.numberofpatterns=numberofpatterns;
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
        this.x += this.vx
        this.y += this.vy ;
        if (this.x + this.r / 2 > width) {
          this.x = width - this.r / 2;
          this.vx *= friction;
        } else if (this.x - this.r / 2 < 0) {
          this.x = this.r / 2;
          this.vx *= friction;
        }
        if (this.y + this.r  > windowHeight) {
          this.y = windowHeight - this.r ;
          this.vy *= friction;
        } else if (this.y  - this.r / 2 < 0) {
          this.y = this.r / 2;
          this.vy *= friction;
        }
      }
      

    whiteEyes(){
      stroke(0);
      strokeWeight(1);
      fill(255);
      ellipse(this.x, this.y ,this.r,this.r);
      
      }
    blackEyes(){
      a = atan2(mouseY - this.y, mouseX - this.x);
      fill(0);
      ellipse(this.x + 0.2 * this.r * cos(a), this.y + 0.2 * this.r * sin(a) , this.r * 0.5, this.r * 0.5);
    
    }

    bluePoint(){
      fill(51,0,204,180);
      noStroke();
      ellipse(450, this.y ,12,12);
    }

    drawPattern(){
      image(pattern[this.numberofpatterns],this.cx,this.y,0.04*pattern[this.numberofpatterns].width,0.04*pattern[this.numberofpatterns].height);


    }

    }
