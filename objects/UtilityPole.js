class UtilityPole {
  constructor(radius, innerRadius) {
    // Pole properties
    this.radius = radius;
    this.innerRadius = innerRadius;
    this.poleRadius = 16;
    this.poleHeight = 1024;

    // Crossarms' properties
    this.crossarms = this.generateCrossarms(4, 0.7, 0.9);

    // Ladder properties
    this.ladder = this.generateLadder(8, 0.4, 0.65);
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
    for (let i = 0; i < this.crossarms.length; i++) {
      // Drawing each crossarm
      push();
      rotateY(this.crossarms[i].angle);
      translate(
        this.crossarms[i].position.x,
        this.crossarms[i].position.y,
        this.crossarms[i].position.z
      );
      //rotateZ(0.1);
      box(
        this.crossarms[i].dimensions.x,
        this.crossarms[i].dimensions.y,
        this.crossarms[i].dimensions.z
      );
      pop();

      // Drawing insulators
      for (let j = 0; j < this.crossarms[i].insulators.length; j++) {
        // Drawing each insulator
        let insulator = this.crossarms[i].insulators[j];
        push();
        rotateY(this.crossarms[i].angle);
        translate(
          insulator.position.x,
          insulator.position.y,
          insulator.position.z
        );
        cylinder(insulator.dimensions[0], insulator.dimensions[1]);
        pop();
      }
    }

    // Drawing ladder
    for (let i = 0; i < this.ladder.length; i++) {
      push();
      rotateY(this.ladder[i].stepAngle.y);
      translate(
        this.ladder[i].stepPosition.x,
        this.ladder[i].stepPosition.y,
        this.ladder[i].stepPosition.z
      );

      box(
        this.ladder[i].stepDimensions.x,
        this.ladder[i].stepDimensions.y,
        this.ladder[i].stepDimensions.z
      );

      pop();
    }

    pop();
  }

  // Crossarms' generator function
  generateCrossarms(crossarmsNumber, lowerRange, higherRange) {
    // Crossarms' array definition
    let crossarms = [];

    for (let i = 0; i < crossarmsNumber; i++) {
      // Crossarm arbitrary dimensions
      let crossArmDimensions = createVector(256, 16, 8);

      //let crossArmXOffset = crossArmDimensions.x * random(0.1, 0.2);
      // Crossarm x-axis offset
      let crossArmXOffset = 0;

      // Crossarm unitary distribution on y-axis
      let crossArmHeight =
        -this.poleHeight *
          map(i, 0, crossarmsNumber - 1, lowerRange, higherRange) +
        this.poleHeight * 0.5;

      // Crossarm vector position with z-axis offset (pole's diameter)
      let crossArmPosition = createVector(
        crossArmXOffset,
        crossArmHeight,
        this.poleRadius * 0.5 + crossArmDimensions.z * 1.5
      );

      // Object literal for crossarm defintion with insulators
      crossarms[i] = {
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
    return crossarms;
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

  // Ladder's generator function
  generateLadder(stepsNumber, lowerRange, higherRange) {
    // Steps' array definition
    let steps = [];
    // Steps arbitrary dimensions
    let stepDimensions = createVector(32, 4, 4);

    // Steps vector position array definition
    for (let i = 0; i < stepsNumber; i++) {
      // Step x-axis offset
      let stepXOffset = stepDimensions.x;

      // Steps unitary distribution on y-axis
      let stepHeight =
        -this.poleHeight * map(i, 0, stepsNumber - 1, lowerRange, higherRange) +
        this.poleHeight * 0.5;

      // Step vector position with x-axis offset (pole's diameter)
      let stepPosition = createVector(
        this.poleRadius + stepXOffset * 0.5,
        stepHeight,
        0
      );

      // Y-axis rotation for staggered steps
      let stepAngle = createVector(0, PI * (i % 2), 0);

      // Object literal for insulator defintion
      steps[i] = {
        stepDimensions: stepDimensions,
        stepPosition: stepPosition,
        stepAngle: stepAngle,
      };
    }

    return steps;
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
