let Tx, Ty;

var sentence=[];

//fonts
let m=[0,1,2,3];
let fontLight;

function preload(){
 fontLight=loadFont('fonts/Quicksand-Light.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  Tx = 0; 
}

function draw() {
  background(200);
  for (let l=0;l<sentence.length;l++){
      sentence[l].displayText();
      sentence[l].moveText();
  }
}

function keyPressed(){
  Ty = random(0,windowHeight);  
  sentence.push(new Text(Tx,Ty,random(m)));
}

class Text{
 constructor(tx,ty,tw){
  this.tx=tx;
  this.ty=ty;
  this.tw=tw;

 }
  
  displayText(){
  textFont(fontLight);
  fill(92);
  stroke(92);
  strokeWeight(this.tw);
  textSize(40);
  text('An 8-second message is shared.',this.tx,this.ty);
  }
  
  moveText(){
  this.tx=this.tx+1;
  if (this.tx>windowWidth){
     this.tx=0;
  }
    
  }
}