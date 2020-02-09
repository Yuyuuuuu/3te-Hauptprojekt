var eyes=[];//the whole array of objects(eyes)

let R=[];
let Raduis;
let XPos;
let YPos=0;
let v;
//the value about moving
var gravity = 0.005;
let spring=0.1;
let friction=-0.5;

//the varible about the pattern
let Tx,Ty;
var sentence=[];
let m=[0,1,2,3];
let fontLight;

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

let Speed=1;

//the varible about photos
let picture=[];
let NumerOfPhotos=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
let photos=[];
let ppX;
let ppY;
//let starttime;

function preload(){
  for(let u=0;u<15;u++){
    picture[u]=loadImage('assets/photos/photo'+ u +'.png');
  }
}

function setup() {
   createCanvas(windowWidth, windowHeight);
   R.push(20,40,60);  
   Tx = -400; 
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
  Speed=1;
  v=random(0.1,0.3);
  CountOfClicks++;
  //eyes.push(new Eye(XPos,YPos,Raduis,eyes,E,v,CountOfClicks,random(NumerOfPhotos)));
  eyes.push(new Eye(XPos,YPos,Raduis,eyes,E,v,CountOfClicks));

  Ty = ceil(random(0,28))*35;  
  sentence.push(new Text(Tx,Ty,random(m),random(0,1.5)));
}

function mousePressed(){
  photos.push(new FOTO(random(NumerOfPhotos),random(0,1200),random(0,800),millis()/1000));
}

function draw() {
  background(220);
  for (let l=0;l<sentence.length;l++){
    sentence[l].displayText();
    sentence[l].moveText();
}
    // text('a 8 seconds information was shared.',Tx,Ty);
    Tx=Tx+1;
    if (Tx>windowWidth){
      Tx=0;
    }
    for (let i=1;i<eyes.length;i++){
    eyes[i].whiteEyes();
    eyes[i].blackEyes();
    //eyes[i].redHeart();
    //eyes[i].yellowSharing();

    // eyes[i].collide();
    // eyes[i].moveEyes();
  }
  for (let j=0;j<photos.length;j++){
   photos[j].displayPhotos();
  }

  if(keyCode===UP_ARROW){
     photos.splice(0,photos.length);
  }
}

class Eye{
  constructor(x,y,r,others,e,wV,n){
  this.x=x;//the x position of eyes
  this.y=y;//the y position of eyes

  this.r=r;//ths raduis of eyes
  this.others=others;//ths array of eyes
  this.e=e;//the magenificatiom times of pattern
  this.wV=wV;// the velocity of white eyes
  this.n=n;//the total count of Clicks
  //this.p=p;//the numerical oder of photos

  this.vx=0;
  this.vy=0;
  this.speed=10;
  }

  // collide() {//the action of collide between eyes
  //   for (let i = eyes.length+ 1; i < eyes.length-1; i++) {
  //         let dx = this.others[i].x - this.x;
  //         let dy = this.others[i].y - this.y;
  //         let distance = sqrt(dx * dx + dy * dy);
  //         let minDist = this.others[i].r + this.r;
  //         if (distance < minDist) {
  //           let angle = atan2(dy, dx);
  //           let targetX = this.x + cos(angle) * minDist;
  //           let targetY = this.y + sin(angle) * minDist;
  //           let ax = (targetX - this.others[i].x) * spring;
  //           let ay = (targetY - this.others[i].y) * spring;
  //           this.vx -= ax;
  //           this.vy -= ay;
  //           this.others[i].vx += ax;
  //           this.others[i].vy += ay;
  //         }
  //       }
  //     }
  
  // //moveEyes() { //the movement of eyes
  //   this.vy += gravity;
  //   this.x += this.vx;
  //   this.y += this.vy;
  //   if (this.x + this.r / 2 > width) {
  //     this.x = width - this.r / 2;
  //     this.vx *= friction;
  //   } else if (this.x - this.r / 2 < 0) {
  //     this.x = this.r / 2;
  //     this.vx *= friction;
  //   }
  //   if (this.y + this.r / 2 > height) {
  //     this.y = height - this.r / 2;
  //     this.vy *= friction;
  //   } else if (this.y - this.r / 2 < 0) {
  //     this.y = this.r / 2;
  //     this.vy *= friction;
  //   }
  // }
    
  whiteEyes(){
    stroke(0);
    strokeWeight(2);
    fill(255);
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

  if((this.n-2)<5){ 
    this.x=map(pose.nose.x,0,windowWidth,(windowWidth/5)*(this.n-2),(windowWidth/5)*(this.n-1));
    this.y=map(pose.nose.y,0,windowHeight,0,(windowHeight/3)*1);

    bX=constrain(this.x, (windowWidth/5)*(this.n-2)+1.4*this.r, (windowWidth/5)*(this.n-1)-1.4*this.r);
    bY=constrain(this.y, 1.4*this.r, (windowHeight/3)*1-1.4*this.r);

  }else if((this.n-2)>=5 && (this.n-2)<10){
    this.x=map(pose.nose.x,0,windowWidth,(windowWidth/5)*(this.n-7),(windowWidth/5)*(this.n-6));
    this.y=map(pose.nose.y,0,windowHeight,(windowHeight/3)*1,(windowHeight/3)*2);
    
    bX=constrain(this.x, (windowWidth/5)*(this.n-7)+1.4*this.r, (windowWidth/5)*(this.n-6)-1.4*this.r);
    bY=constrain(this.y, (windowHeight/3)*1+1.4*this.r, (windowHeight/3)*2-1.4*this.r);

  }else if((this.n-2)>=10){
    this.x=map(pose.nose.x,0,windowWidth,(windowWidth/5)*(this.n-12),(windowWidth/5)*(this.n-11));
    this.y=map(pose.nose.y,0,windowHeight,(windowHeight/3)*2,windowHeight);
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

  // diplayPhotos(){
  //   scale(0.3);
  //   image(picture[this.p],this.x,this.y,picture[this.p].width,picture[this.p].height);
  // }
}

class Text{
  constructor(tx,ty,tw,tv){
   this.tx=tx;
   this.ty=ty;
   this.tw=tw;
   this.tv=tv;
  }  
   displayText(){
   // textFont(fontLight);
   textFont("Futura PT Light");
   fill(150);
   stroke(150);
   strokeWeight(this.tw);
   textSize(25);
   text('An 8-second message is shared.',this.tx,this.ty);
   }
   
   moveText(){
   this.tx=this.tx+this.tv;
   if (this.tx>windowWidth){
      this.tx=0;
     }   
   }
 }

class FOTO{
  constructor(p,x,y,st){
   this.p=p;
   this.x=x;
   this.y=y;
   this.st=st;
  }

displayPhotos(){
 
 tint(255,255-(millis()/1000-this.st)*15);
 image(picture[this.p],this.x,this.y,0.3*picture[this.p].width,0.3*picture[this.p].height);
 
}


}
