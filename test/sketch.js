var cnv;

var eyes = [];
var eyes_xyr = [];
let ClickTime=[];
let CountOfClicks=0;
let R;
let XPos=[];
let YPos;
let a;

var gravity = 0.03;
let spring=0.05;
let friction=-0.9;



function setup() {
 
    cnv = createCanvas(windowWidth, windowHeight);

    XPos.push(750, 950, 1150);
    ClickTime[0]=0; 
        //return augens;
    /* const iterator = augens.keys();
    for (const key of iterator) {
        console.log(key);
    }  */
    
    
    
}

function keyTyped() {
  if (key === 'a') {
    window.localStorage.clear();
  } 
}

function keyPressed(){ 

    ClickTime.push(ceil(millis()/1000));
    CountOfClicks ++;
    R=(ClickTime[CountOfClicks] - ClickTime[CountOfClicks-1]) * 12;
    YPos=(ClickTime[CountOfClicks] + ClickTime[CountOfClicks-1]) * 6;
   
    eyes.push(new Eye(z = random(XPos), YPos + 300, R, CountOfClicks, eyes));
    eyes_xyr[CountOfClicks - 1] = [z, YPos, R];                     // Hier wird ein Array erstellt um nur die wichtigesten Werte zu verarbeiten: X, Y, R 
    localStorage.setItem(CountOfClicks, JSON.stringify(eyes_xyr));  // Hier werden die Werte in den Local.Storage geladen und gespeichert 

  }
    


function draw() {
  
    background('#f1c40f');
    drawTimeline();

    for (let i = 1;i < eyes.length;i++){
        eyes[i].whiteEyes();
        eyes[i].blackEyes();
        if(mouseIsPressed===true){
        eyes[i].collide();
        eyes[i].moveEyes();
      }
      } 
    

}

function eyeArray() {
  console.log(eyes); 
}



/* function mousePressed() {
   
            showImg();
           //console.log("clicked")   
} */


/* function showImg() {

    imageMode(CENTER);
    for (let i = 0; i < img.length; i++) {
        if (augens[i].clicked(mouseX, mouseY)) {
            image(img[i], 800, 900);
            augens[i].changeColor();
            
            //augens.splice(i,1);
           //console.log("clicked")
        }
        
    }
    
} */

/* class AUGENS{
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        //this.img = img;
        this.brightness = 0;
    }
    changeColor(){
        this.brightness = 50;
    }
    clicked = function (px, py) {

            var d = dist(px, py, this.x, this.y);
            if (d < this.r) {
              
                return true;
                //showImg();
            }else if (d > this.r) {
                
                this.brightness = 0;
                return false;
            } 
        }
        
        
    
    show(){
        
            fill(50, 100, 220, this.brightness);
            ellipse(this.x, this.y, this.r);
            stroke(0);
    }

}



*/

function drawTimeline() {
  
   
    // Draw second Timeline 
    for (let l = 129; l < windowHeight; l+=12) {
        stroke(250);
        line(480, l, 500, l);
        
    }

     // Draw vertical Timeline 
    line(500,0,500,windowHeight);
    
    strokeWeight(1);
    stroke(250);
    

    // Draw red Timeline 
    for (let r = 249; r <= windowHeight; r+=720 ) {

        let a = stroke('#e74c3c');
        a.line(450, r, 500, r);
        
    }

    // Draw Timepunkt
    for (let t = 255; t <= windowHeight; t+=720 ) {

        textFont('Helvetica');
        textSize(18);
        textStyle(NORMAL); 
        noStroke();
        fill('#3742fa');
        text('14:25', 400, t);
        
    }



}  


class Eye{
    constructor(x,y,r,idin,oin){
    this.x=x;
    this.y=y;
    this.vx=0;
    this.vy=0;
    this.r=r;
    this.id=idin;
    this.others=oin;
    }
    
    collide() {
        for (let i = this.id + 1; i < ClickTime.length-1; i++) {
          let dx = this.others[i].x - this.x;
          let dy = this.others[i].y - this.y;
          let distance = sqrt(dx * dx + dy * dy);
          let minDist = this.others[i].r/ 2 + this.r / 2;
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
      
      moveEyes() {
        this.vy += gravity;
        this.x += this.vx
        this.y += this.vy ;
        if (this.x + this.r / 2 > width) {
          this.x = width - this.r / 2;
          this.vx *= friction;
        } else if (this.x - this.r / 2 < 0) {
          this.x = this.r / 2;
          this.vx *= friction;
        }
        if (this.y + this.r  > windowHeight) {
          this.y = windowHeight - this.r ;
          this.vy *= friction;
        } else if (this.y  - this.r / 2 < 0) {
          this.y = this.r / 2;
          this.vy *= friction;
        }
      }
      
    whiteEyes(){
      stroke(0);
      strokeWeight(1);
      if(keyCode===LEFT_ARROW){
        fill(255,80,79);
      }else if (keyCode===UP_ARROW){
        fill(0,122,135);
      }else if (keyCode===RIGHT_ARROW){
        fill(64,64,255);
      }
      ellipse(this.x, this.y ,this.r,this.r);
      
      }
    blackEyes(){
      a = atan2(mouseY - this.y, mouseX - this.x);
      fill(0);
      ellipse(this.x + 0.2 * this.r * cos(a), this.y + 0.2 * this.r * sin(a) , this.r * 0.5, this.r * 0.5);
    
    }

    

    }