//the posenet part
let video;
let poseNet;
let pose;

//the follow eyes part
let wD; //the diameter of white eyes
let pupils; //the diameter of pupils
let wV;
let wX;
let wY;
let bX;
let bY;

//about the array of objects eyes
var eyes=[];
let R=[];

function setup() {
  createCanvas(windowWidth, windowHeight);
  video= createCapture(VIDEO);
  video.hide();
  poseNet=ml5.poseNet(video,modelLoaded);
  poseNet.on('pose',gotPoses);

  smooth ();
  R.push(20,40,60,80,100);
  wD=2*random(R);
  wX=random(width);
  wY=0;
  pupils=0.4*wD;
  wV=random(0.1,0.3);

  eyes.push(new Eye(wX,wY,wD,pupils,wV,eyes));
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

function draw() {
  //  image(video,0,0);
   background(120);
   for (let i=0;i<5;i++){
   if(pose){
   eyes[i].drawWhiteEyes();
   eyes[i].drawBlackEyes();
   }
   }
  }

class Eye{
constructor(x,y,d1,d2,v,others){
 this.x=x;
 this.y=y;
 this.d1=d1;
 this.d2=d2;
 this.v=v;
 this.others=others;
}

drawWhiteEyes(){
this.x=this.x+(pose.nose.x-this.x)*this.v;
this.y=this.y+(pose.nose.y-this.y)*this.v;
stroke(0);
strokeWeight(3);
fill(255);
ellipse(this.x,this.y,this.d1,this.d1);
}

drawBlackEyes(){
strokeWeight(1);
bX=constrain(pose.nose.x, pose.nose.x-this.d2/2, pose.nose.x+this.d2/2);
bY=constrain(pose.nose.y, pose.nose.y-this.d2/2, pose.nose.y+this.d2/2);
fill(0);
ellipse(bX,bY,this.d2,this.d2);
}


}