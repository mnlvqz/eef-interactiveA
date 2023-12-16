class UtilityPole {
  constructor(radius, innerRadius) {
    this.radius = radius;
    this.innerRadius = innerRadius;
    this.poleRadius = 16;
    this.poleHeight = 1024;
    this.crossArms = this.generateCrossArms(20);
  }

  updatePole() {}

  // Drawing utility pole
  drawPole() {
    // Drawing pole
    push();
    push();
    cylinder(this.poleRadius, this.poleHeight);
    pop();

    // Drawing crossarms
    for (let i = 0; i < this.crossArms.length; i++) {
      // Drawing each crossarm
      push();
      rotateY(this.crossArms[i].angle);
      translate(
        this.crossArms[i].position.x,
        this.crossArms[i].position.y,
        this.crossArms[i].position.z
      );
      //rotateZ(0.1);
      box(
        this.crossArms[i].dimensions.x,
        this.crossArms[i].dimensions.y,
        this.crossArms[i].dimensions.z
      );
      pop();

      // Drawing insulators
      for (let j = 0; j < this.crossArms[i].insulators.length; j++) {
        // Drawing each insulator
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

  // Crossarms' generator function
  generateCrossArms(crossArmsNumber) {
    // Crossarms' array definition
    let crossArms = [];

    for (let i = 0; i < crossArmsNumber; i++) {
      // Crossarm arbitrary dimensions
      let crossArmDimensions = createVector(256, 16, 8);

      //let crossArmXOffset = crossArmDimensions.x * random(0.1, 0.2);
      // Crossarm x-offset
      let crossArmXOffset = 0;

      // Crossarm unitary distribution on y-axis
      let crossArmHeight =
        this.poleHeight * -0.5 * map(i, 0, crossArmsNumber - 1, 0.6, 0.9);

      // Crossarm vector position with z-offset (pole's diameter)
      let crossArmPosition = createVector(
        crossArmXOffset,
        crossArmHeight,
        this.poleRadius * 0.5 + crossArmDimensions.z * 1.5
      );

      // Object literal for crossarm defintion with insulators
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

  // Insulators' generator function
  generateInsulators(insulatorsNumber, crossArmDimensions, crossArmPosition) {
    // Insulators' array definition
    let insulators = [];

    // Insulators arbitrary dimensions
    let insulatorDimensions = [8, 16];

    // Crossarms' fixed length, subtract lateral insulators' diameter
    let crossArmFixedLength = crossArmDimensions.x - insulatorDimensions[0] * 2;
    // Insulators' even separation distance
    let insulatorSeparation = crossArmFixedLength / (insulatorsNumber - 1);

    // Insulators' y-offset, insulator height
    let insulatorFixedHeight = crossArmPosition.y - crossArmDimensions.y;

    // Insulators' vector position array definition
    for (let i = 0; i < insulatorsNumber; i++) {
      let insulatorPosition = createVector(
        crossArmFixedLength * -0.5 + insulatorSeparation * i,
        insulatorFixedHeight,
        crossArmPosition.z
      );

      // Object literal for insulator defintion
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
