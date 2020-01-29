var photo;
var vScale=28;// the number is better the time of 4,change the number to change the sharpness
function preload(){
    photo=loadImage("ins5.png");
}
function setup(){
    createCanvas(375,812);
    photo.resize(width/vScale,height/vScale);
}
function draw(){
    pixelDensity(5);
    background(255);
    photo.loadPixels();
    for(var y=0;y<photo.height;y++){
  for(var x=0;x<photo.width;x++){
    
  var index=(x+y*photo.width)*4;
  var r=photo.pixels[index+0];//this is the red value from the video
  var g=photo.pixels[index+1];
  var b=photo.pixels[index+2];
   
  var bright=(r+g+b)/3;
    
   noStroke();
   fill(r,g,b);
   rect(x*vScale,y*vScale,vScale,vScale);
 }
    noLoop();
}
}