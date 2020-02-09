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

let E;
let fonttype=[];
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
let NumerOfPhotos=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
let photos=[];
let ppX;
let ppY;

let logo;
let angel=0;

function preload(){
  for(let u=0;u<16;u++){
    picture[u]=loadImage('assets/photos/photo'+ u +'.png');
  }
  fonttype[0]=loadFont('assets/fonts/Quicksand-Light.ttf');
  fonttype[1]=loadFont('assets/fonts/Quicksand-Medium.ttf');
  fonttype[2]=loadFont('assets/fonts/Quicksand-Regular.ttf');
  fonttype[3]=loadFont('assets/fonts/Quicksand-Bold.ttf');
  
  logo=loadImage('assets/logo/timeshop.png');
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

   fonttype.push("Futura PT Light","Futura PT Regular","Futura PT Medium","Futura PT Bold");
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
  push();
  angel+=0.02;
  translate(120,120);
  rotate(angel);
  image(logo,-80,-80,160,160);
  pop();
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
  }
  for (let j=0;j<photos.length;j++){
   photos[j].displayPhotos();
  }

  if(keyCode===UP_ARROW){
     photos.splice(0,photos.length);
  }
console.log(fonttype[0]);
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
  this.vx=0;
  this.vy=0;
  this.speed=10;
  }
    
  whiteEyes(){
    stroke(0);
    strokeWeight(2);
    fill(255);
      //estimate the position
      if((this.n-2)<4){
        wwX=constrain(this.x,(windowWidth/4)*(this.n-2)+this.r,(windowWidth/4)*(this.n-1)-this.r);
        wwY=constrain(this.y,this.r,(windowHeight/3)*1-this.r);
 
       }else if((this.n-2)>=4 &&(this.n-2)<8 ){
 
         wwX=constrain(this.x,(windowWidth/4)*(this.n-6)+this.r,(windowWidth/4)*(this.n-5)-this.r);
         wwY=constrain(this.y,(windowHeight/3)*1+this.r,(windowHeight/3)*2-this.r);
 
       }else if ((this.n-2)>=8){
 
         wwX=constrain(this.x,(windowWidth/4)*(this.n-10)+this.r,(windowWidth/4)*(this.n-9)-this.r);
         wwY=constrain(this.y,(windowHeight/3)*2+this.r,windowHeight-this.r);
 
       }
      ellipse(wwX,wwY,2*this.r,2*this.r);   
  }

  blackEyes(){
  fill(0);
  if((this.n-2)<4){ 
    this.x=map(pose.nose.x,0,windowWidth,(windowWidth/4)*(this.n-2),(windowWidth/4)*(this.n-1));
    this.y=map(pose.nose.y,0,windowHeight,0,(windowHeight/3)*1);

    bX=constrain(this.x, (windowWidth/4)*(this.n-2)+1.4*this.r, (windowWidth/4)*(this.n-1)-1.4*this.r);
    bY=constrain(this.y, 1.4*this.r, (windowHeight/3)*1-1.4*this.r);

  }else if((this.n-2)>=4 && (this.n-2)<8){
    this.x=map(pose.nose.x,0,windowWidth,(windowWidth/4)*(this.n-6),(windowWidth/4)*(this.n-5));
    this.y=map(pose.nose.y,0,windowHeight,(windowHeight/3)*1,(windowHeight/3)*2);
    
    bX=constrain(this.x, (windowWidth/4)*(this.n-6)+1.4*this.r, (windowWidth/4)*(this.n-5)-1.4*this.r);
    bY=constrain(this.y, (windowHeight/3)*1+1.4*this.r, (windowHeight/3)*2-1.4*this.r);

  }else if((this.n-2)>=8){
    this.x=map(pose.nose.x,0,windowWidth,(windowWidth/4)*(this.n-10),(windowWidth/4)*(this.n-9));
    this.y=map(pose.nose.y,0,windowHeight,(windowHeight/3)*2,windowHeight);
    bX=constrain(this.x, (windowWidth/4)*(this.n-10)+1.4*this.r, (windowWidth/4)*(this.n-9)-1.4*this.r);
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
   textFont(fonttype[this.tw]);
   fill(255);
   noStroke();
   textSize(20);
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
