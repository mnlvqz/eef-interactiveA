let utilityPole;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(60);
  imageMode(CENTER);

  utilityPole = new UtilityPole(0, 0);
}

function draw() {
  background(128);
  utilityPole.drawPole();

  orbitControl();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
