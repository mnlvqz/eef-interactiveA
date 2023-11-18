class UtilityPole {
  constructor(polePosition, poleHeight) {
    this.polePosition = polePosition;
    this.poleHeight = poleHeight;
    this.poleOrientations;
  }

  updatePole() {}

  drawPole() {}

  generateRandomVectorsFixedRadius(radius, vectorsNumber) {
    let vectors = [];
    for (let i = 0; i < vectorsNumber; i++) {
      let angle = random(TWO_PI);
      vectors[i] = createVector(radius * cos(angle), radius * sin(angle));
    }
    return vectors;
  }
}
