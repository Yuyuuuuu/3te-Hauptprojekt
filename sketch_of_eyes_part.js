let R;//RaduisOfEyes
let a;
let XPosOfEyes;
let Y
let CountOfClicks=0;
let ClickTime=[];

//let CurrentTime;//current time;

function setup() {
   createCanvas(800, 600);
   background(220);
   XPosOfEyes=400; 
}

function draw() {
  
  //YPosOfEyes=(millis()/1000*800)/60;
  
  //draw the eyes
  stroke(0);
  strokeWeight(1);
  fill(255);
  //this is the white eyes par
  
  for(var i = 0; i < ClickTime.length ; i++) {
    Y=(ClickTime[i+1]+ClickTime[i])/1000*7;
    R=(ClickTime[i+1]-ClickTime[i])/1000*7;
    
    ellipse(XPosOfEyes , Y , R , R);
  }
  print(Y);
  //this is how the black eyes part follow mouse
  //Calculates the angle (in radians) from a specified point to the coordinate origin as measured from the positive x-axis

  //this is black eyes part
  fill(0);
  for(var m = 0 ; m < ClickTime.length ; m++) {
    Y=(ClickTime[m+1]+ClickTime[m])/1000*7;
    a=atan2(mouseY-Y,mouseX-XPosOfEyes);
    R=(ClickTime[m+1]-ClickTime[m])/1000*7;
    

    ellipse(XPosOfEyes+0.2 * R * cos(a) , Y+0.2*R*sin(a) , R * 0.5 , R * 0.5);
    
  //print(R);
  } 
}

function mousePressed(){ 
  //count how many times the mouse has been pressed
  
   //CurrentTime= millis();
   
   ClickTime.push(millis());//   add data to the array "arr"
  
   CountOfClicks++;
   //print(CountOfClicks);
   //print(millis()/1000);
   
}


