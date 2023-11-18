class UtilityPole {
  constructor(radius, innerRadius) {
    this.radius = radius;
    this.innerRadius = innerRadius;
    this.poleRadius = 16;
    this.poleHeight = 1024;
    this.crossArms = this.generateCrossArms(2);
  }

  updatePole() {}

  drawPole() {
    push();

    // Pole
    push();
    cylinder(this.poleRadius, this.poleHeight);
    pop();

    // Cross-arms

    for (let i = 0; i < this.crossArms.length; i++) {
      push();
      rotateY(this.crossArms[i].angle);
      translate(
        this.crossArms[i].position.x,
        this.crossArms[i].position.y,
        this.crossArms[i].position.z
      );
      box(
        this.crossArms[i].dimensions.x,
        this.crossArms[i].dimensions.y,
        this.crossArms[i].dimensions.z
      );
      pop();
    }

    pop();
  }

  generateCrossArms(crossArmsNumber) {
    let crossArms = [];

    for (let i = 0; i < crossArmsNumber; i++) {
      let crossArmDimension = createVector(256, 16, 8);
      let crossArmXOffset = crossArmDimension.x * random(0.1, 0.2);
      let crossArmHeight =
        this.poleHeight * -0.5 * map(i, 0, crossArmsNumber - 1, 0.65, 0.8);
      crossArms[i] = {
        dimensions: crossArmDimension,
        position: createVector(
          crossArmXOffset,
          crossArmHeight,
          this.poleRadius * 0.5 + crossArmDimension.z * 1.5
        ),
        angle: random(TWO_PI),
      };
    }
    return crossArms;
  }

  generateRandomVectorsFixedRadius(radius, vectorsNumber) {
    let vectors = [];
    for (let i = 0; i < vectorsNumber; i++) {
      let angle = random(TWO_PI);
      vectors[i] = createVector(radius * cos(angle), radius * sin(angle));
    }
    return vectors;
  }
}
