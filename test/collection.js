let augens = [];
var augens_buff = [];

var cnv;
var c1, c2;

// let img = [];



function setup() {

    
    /* let imgArray = img.getArray();
    for (let i = 0; i < imgArray.length; i++) {
    console.log(imgArray[i]);
  } */
    cnv = createCanvas(windowWidth, windowHeight);
    
    //drawTimeline();
    augens_buff = JSON.parse(localStorage.getItem(localStorage.length));
       // ´Hier werden die Werte aus dem Speicher wieder rausgeladen 
    console.log(augens_buff);
    for (let i = 0; i < 5; i++) {

        let x = random(700,1000);
        let y = random(500,windowHeight);
        let r = random(30,80);
        let b = augens[i] = new AUGENS(x, y, r);
        
        
    }
    //storageRead();
   
  
    /* const iterator = augens.keys();
    for (const key of iterator) {
        console.log(key);
    }  */
}


function setGradient(c1, c2) {
    // noprotect
    noFill();
    for (var y = 0; y < height; y++) {
      var inter = map(y, 0, height, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(0, y, width, y);
    }
  }

function draw() {
    c1 = color('#ffd32a');
    c2 = color('#f1c40f');
    setGradient(c1, c2);
    //background('rgb(241, 196, 15)');
    for (let i = 0; i < augens.length; i++) {
        augens[i].show();
       
    }
   

}


        augens_buff[0] = JSON.parse(localStorage.getItem(localStorage.length));

function mousePressed() {
        for (let i = 0; i < augens.length; i++) {

            augens[i].clicked(mouseX, mouseY);
            
        }
     
    
}


class AUGENS{
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
    clicked (px, py) {

            var d = dist(px, py, this.x, this.y);
            if (d < this.r) {
                
                this.brightness = 50
                return true;
                //showImg();
            }else if (d > this.r) {
                
                this.brightness = 0;
                
            } 
        }
        
        
    
    show(){
        
            fill(50, 100, 220, this.brightness);
            ellipse(this.x, this.y, this.r);
            stroke(0);
    }

}