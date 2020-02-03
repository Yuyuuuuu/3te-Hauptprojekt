let Tx, Ty;

var sentence=[];

//fonts
let m=[0,1,2,3];
let fontLight;

// function preload(){
//  fontLight=loadFont('fonts/Quicksand-Light.ttf');
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  Tx = -400; 
}

function draw() {
  background(200);
  console.log(windowHeight);
  for (let l=0;l<sentence.length;l++){
      sentence[l].displayText();
      sentence[l].moveText();
  }
}

function keyPressed(){
  Ty = ceil(random(0,28))*35;  
  sentence.push(new Text(Tx,Ty,random(m),random(0,1.5)));
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
