let x ;

let position = 0; 
    
function scroller() 
    {
     if (x) 
      { 
        position += 1.2; 
        scroll(0,position); 
        clearTimeout(timer); 
        var timer = setTimeout("scroller()",100); 
        return position;
    
      }
      scroller();
    } 
        
function scrollerStop() {
    
     return x=false;
    
    }
    
function scrollerStart() {
    
            x = true;
            scroller();
    }