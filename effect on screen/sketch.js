var eyes=[];//the whole array of objects(eyes)

let R=[];
let Raduis;
let XPos;
let YPos=0;

// let a;
let v;
//the value about moving
var gravity = 0.005;
let spring=0.1;
let friction=-0.5;

//the varible about the pattern
let Tx,Ty;
let E;

// the varible about tracking
let video;
let poseNet;
let pose;

let CountOfClicks=0;
let wwX;
let wwY;
let bX;
let bY;

function setup() {
   createCanvas(windowWidth, windowHeight);
   R.push(20,40,60);
   Tx=0;
   Ty=height/2;

   video= createCapture(VIDEO);
   video.hide();
   poseNet=ml5.poseNet(video,modelLoaded);
   poseNet.on('pose',gotPoses);
   
}

function gotPoses(poses){
  console.log(poses);
  if(poses.length>0){
    pose = poses[0].pose;
  }
}

function modelLoaded(){
  console.log('poseNet ready');
}

function keyPressed(){ 
  Raduis=random(R);
  XPos=random(windowWidth);
  E=(Raduis/20);//the magenificatiom times of pattern

  v=random(0.08,0.2);
  CountOfClicks++;
  eyes.push(new Eye(XPos,YPos,Raduis,eyes,E,v,CountOfClicks));
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
    // eyes[i].redHeart();
    //eyes[i].yellowSharing();
    eyes[i].collide();
    eyes[i].moveEyes();
  }
}

class Eye{
  constructor(x,y,r,others,e,wV,n){
  this.x=x;
  this.y=y;
 
  this.vx=0;
  this.vy=0;
  this.r=r;
  this.others=others;
  this.e=e;
  this.wV=wV;
  this.n=n;
  
  }

  collide() {//the action of collide between eyes
    for (let i = eyes.length+ 1; i < eyes.length-1; i++) {
          let dx = this.others[i].x - this.x;
          let dy = this.others[i].y - this.y;
          let distance = sqrt(dx * dx + dy * dy);
          let minDist = this.others[i].r + this.r;
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
  
      this.x=this.x+(mouseX-this.x)*this.wV;
      this.y=this.y+(mouseY-this.y)*this.wV;
      // this.x=this.x+(pose.nose.x-this.x)*this.wV;
      // this.y=this.y+(pose.nose.y-this.y)*this.wV;

      //estimate the position
      if((this.n-2)<5){
      
        wwX=constrain(this.x,(windowWidth/5)*(this.n-2)+this.r,(windowWidth/5)*(this.n-1)-this.r);
        wwY=constrain(this.y,this.r,(windowHeight/3)*1-this.r);
 
       }else if((this.n-2)>=5 &&(this.n-2)<10 ){
 
         wwX=constrain(this.x,(windowWidth/5)*(this.n-7)+this.r,(windowWidth/5)*(this.n-6)-this.r);
         wwY=constrain(this.y,(windowHeight/3)*1+this.r,(windowHeight/3)*2-this.r);
 
       }else if ((this.n-2)>=10){
 
         wwX=constrain(this.x,(windowWidth/5)*(this.n-12)+this.r,(windowWidth/5)*(this.n-11)-this.r);
         wwY=constrain(this.y,(windowHeight/3)*2+this.r,windowHeight-this.r);
 
       }
      ellipse(wwX,wwY,2*this.r,2*this.r);
  
  }

  blackEyes(){

  fill(0);
  this.x=mouseX;
  this.y=mouseY;
  // this.x=pose.nose.x;
  // this.y=pose.nose.y;
  if((this.n-2)<5){

    bX=constrain(this.x, (windowWidth/5)*(this.n-2)+1.4*this.r, (windowWidth/5)*(this.n-1)-1.4*this.r);
    bY=constrain(this.y, 1.4*this.r, (windowHeight/3)*1-1.4*this.r);

  }else if((this.n-2)>=5 && (this.n-2)<10){

    bX=constrain(this.x, (windowWidth/5)*(this.n-7)+1.4*this.r, (windowWidth/5)*(this.n-6)-1.4*this.r);
    bY=constrain(this.y, (windowHeight/3)*1+1.4*this.r, (windowHeight/3)*2-1.4*this.r);

  }else if((this.n-2)>=10){
    bX=constrain(this.x, (windowWidth/5)*(this.n-12)+1.4*this.r, (windowWidth/5)*(this.n-11)-1.4*this.r);
    bY=constrain(this.y, (windowHeight/3)*2+1.4*this.r, windowHeight-1.4*this.r);
  }
  ellipse(bX, bY, 2*this.r * 0.4, 2*this.r * 0.4);
  }

  // redHeart(){
  // fill(255,0,0);
  // noStroke(0);
  // //strokeWeight(2);
  // push();
  // translate(this.x + 0.2 * this.r * cos(a),this.y + 0.2 * this.r * sin(a));//keepe the position do not change
  // scale(this.e);
  // beginShape();
  // vertex(0,0);//1
  // vertex(-6,6);//2
  // vertex(-12,0);//3
  // vertex(-12,-4);//4
  // vertex(-10,-6);//5
  // vertex(-8,-6);//6
  // vertex(-6,-4);//7
  // vertex(-4,-6);//8
  // vertex(-2,-6);//9
  // vertex(0,-4);//10
  // endShape(CLOSE);
  // pop();
  // }

  // yellowSharing(){
  //   fill(255,211,42);
  //   noStroke(0);
  //   //strokeWeight(2);
  //   push();
  //   translate(this.x + 0.2 * this.r * cos(a),this.y + 0.2 * this.r * sin(a));//keepe the position do not change
  //   scale(this.e);
  //   beginShape();
  //   vertex(0,0);//1
  //   vertex(-4,0);//2
  //   vertex(-4,5);//3
  //   vertex(-8,5);//4
  //   vertex(-8,0);//5
  //   vertex(-12,0);//6
  //   vertex(-6,-7);//7
  //   endShape(CLOSE);
  //   pop();
  //   }

}
