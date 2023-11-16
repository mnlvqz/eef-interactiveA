function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(60);
  imageMode(CENTER);
}

function draw() {
  background(128);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
