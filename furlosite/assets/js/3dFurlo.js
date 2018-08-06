let clicked = false;

function setup() {
    createCanvas(windowWidth, 1000, WEBGL);
}
let angle = 10
function draw() {

    background(0);
    normalMaterial();
    rectMode(CENTER);
    noStroke();
    translate(mouseX - width/2, mouseY - height/2);
    rotateY(frameCount * 0.03);
    rotateX(frameCount * 0.03);
    rotateZ(frameCount * 0.03);
    
    torus(100, 50); 
    //rect(0,0,150,150); 
    angle += 0.07;
    //pop(); 
  
}

