var eyes=[];
let ClickTime=[];
let CountOfClicks=0;
let R;
let XPos=400;
let YPos;
let a;

var gravity = 0.1;

function setup() {
   createCanvas(800, 600);
   XPosOfEyes=400;
   
   ClickTime[0]=0; 
}

function mousePressed(){ 
  ClickTime.push(ceil(millis()/1000));
  CountOfClicks++;
  R=(ClickTime[CountOfClicks]-ClickTime[CountOfClicks-1])*6;
  YPos=(ClickTime[CountOfClicks]+ClickTime[CountOfClicks-1])*6;
  console.log(R,YPos);  
  eyes.push(new Eye(XPos,R,YPos));
}

function draw() {

  background(220); 
  for (let i=1;i<eyes.length;i++){
    eyes[i].whiteEyes();
    if(keyIsPressed===true){
    eyes[i].moveEyes();
    eyes[i].bounceEyes();
  }
  } 
}

class Eye{

constructor(x,r,y){
this.x=x;
this.r=r;
this.y=y;
this.speed=0;
}

whiteEyes(){
  stroke(0);
  strokeWeight(1);
  fill(255);
  ellipse(this.x,this.y,this.r,this.r);

  a=a = atan2(mouseY - this.y, mouseX - this.x);
  fill(0);
  ellipse(this.x + 0.2 * this.r * cos(a), this.y + 0.2 * this.r * sin(a), this.r * 0.5, this.r * 0.5);
  }

moveEyes(){
   this.y =this.y +this.speed;
   this.speed= this.speed+gravity;
}

bounceEyes(){
   if(this.y>height){
     this.speed=this.speed*-1;
   }
}
}
