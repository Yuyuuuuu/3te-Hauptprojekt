let photos=[];
let picture=[];

let A=[1,2,3,4,5];
let B=[100,200,300,400,500];

function preload(){
  //picture = loadImage('photos/photo1.png');
  for (let u=0;u<5;u++){
    picture[u]=loadImage('photos/photo'+ u +'.png');
  }
}

function setup() {
  createCanvas(windowWidth,windowHeight);
}

function keyPressed(){
photos.push(new FOTO(random(A),random(B),random(B)));

}

function draw() {
  background(220);
  for (let i=0;i<photos.length; i++){
    photos[i].display();
  }
  // scale(0.3);
  // image(picture,50,50,picture.width,picture.height);

}

class FOTO{
  constructor(p,x,y){
   this.p=p;
   this.x=x;
   this.y=y;
  }

display(){
 scale(0.3);
 image(picture[this.p],this.x,this.y,picture[this.p].width,picture[this.p].height);
}

}


