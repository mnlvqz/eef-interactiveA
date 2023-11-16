let utilityPole;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(60);
  imageMode(CENTER);

  utilityPole = new Pole(createVector(0, 0, 0), 1024);
}

function draw() {
  background(128);
  orbitControl();
  utilityPole.drawPole();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
