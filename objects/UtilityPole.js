class UtilityPole {
  constructor(radius, innerRadius) {
    this.radius = radius;
    this.innerRadius = innerRadius;
    this.poleRadius = 16;
    this.poleHeight = 1024;
    this.crossArms = this.generateCrossArms(6);
  }

  updatePole() {}

  drawPole() {
    push();

    // Pole
    push();
    cylinder(this.poleRadius, this.poleHeight);
    pop();

    for (let i = 0; i < this.crossArms.length; i++) {
      // Cross-arms
      push();
      //Cross-arm
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

      for (let j = 0; j < this.crossArms[i].insulators.length; j++) {
        let insulator = this.crossArms[i].insulators[j];

        push();

        rotateY(this.crossArms[i].angle);
        translate(
          insulator.position.x,
          insulator.position.y,
          insulator.position.z
        );
        cylinder(insulator.dimensions[0], insulator.dimensions[1]);
        pop();
      }
    }

    pop();
  }

  generateCrossArms(crossArmsNumber) {
    let crossArms = [];

    for (let i = 0; i < crossArmsNumber; i++) {
      let crossArmDimensions = createVector(256, 16, 8);

      //let crossArmXOffset = crossArmDimensions.x * random(0.1, 0.2);
      let crossArmXOffset = 0;

      let crossArmHeight =
        this.poleHeight * -0.5 * map(i, 0, crossArmsNumber - 1, 0.6, 0.9);

      let crossArmPosition = createVector(
        crossArmXOffset,
        crossArmHeight,
        this.poleRadius * 0.5 + crossArmDimensions.z * 1.5
      );

      crossArms[i] = {
        dimensions: crossArmDimensions,
        position: crossArmPosition,
        angle: random(TWO_PI),
        insulators: this.generateInsulators(
          3,
          crossArmDimensions,
          crossArmPosition
        ),
      };
    }
    return crossArms;
  }

  generateInsulators(insulatorsNumber, crossArmDimensions, crossArmPosition) {
    let insulators = [];
    let insulatorDimensions = [8, 16];

    let crossArmFixedLength = crossArmDimensions.x - insulatorDimensions[0] * 2;
    let insulatorSeparation = crossArmFixedLength / (insulatorsNumber - 1);

    let insulatorFixedHeight = crossArmPosition.y - crossArmDimensions.y;

    for (let i = 0; i < insulatorsNumber; i++) {
      let insulatorPosition = createVector(
        crossArmFixedLength * -0.5 + insulatorSeparation * i,
        insulatorFixedHeight,
        crossArmPosition.z
      );

      insulators[i] = {
        dimensions: insulatorDimensions,
        position: insulatorPosition,
      };
    }
    return insulators;
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
