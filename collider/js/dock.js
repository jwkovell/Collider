'use strict';

function Dock(options = {}) {

  this.x = options['x'] || 250;
  this.y = options['y'] || 650;
  this.radius = options['radius'] || 35;
  this.maxSpawnRadius = 35;
  this.minSpawnRadius = 10;
  this.spawnRadius = 0;
  this.maxSpawnDensity = 3;
  this.minSpawnDensity = 0;
  this.spawnDensity = 0;

  this.prepare();
}

Dock.prototype = {

  prepare: function() {
    this.generateSpawnValues();
  },

  generateSpawnValues: function() {
    this.spawnRadius = Math.random() * (this.maxSpawnRadius - this.minSpawnRadius) + this.minSpawnRadius;
    this.spawnDensity = Math.random() * (this.maxSpawnDensity - this.minSpawnDensity) + this.minSpawnDensity;
  },

  launch: function() {

    // Reference controls.
    var controls = stage.controls;

    var speedMultiplier = .2;
    var speedX = controls.pointStartX - controls.pointEndX;
    var speedY = controls.pointStartY - controls.pointEndY;
    var speed = Math.sqrt(Math.pow(speedX, 2) + Math.pow(speedY, 2)) * speedMultiplier;
    var direction = Math.atan2(speedY, speedX);

    // Instantiate circle.
    stage.circles.push(new Circle({
      x: this.x,
      y: this.y,
      radius: this.spawnRadius,
      density: this.spawnDensity,
      direction: direction,
      speed: speed,
    }));

  },

  update: function() {

    // Reference controls.
    var controls = stage.controls;

    // If control action is in progress...
    if (controls.actionStart) {
 
      // If start point is near dock...
      if (
        controls.pointStartX >= this.x - this.radius &&
        controls.pointStartX <= this.x + this.radius &&
        controls.pointStartY >= this.y - this.radius &&
        controls.pointStartY <= this.y + this.radius
      ) {

        // Snap control start point to center of dock.
        controls.pointStartX = this.x;
        controls.pointStartY = this.y;

        // If action has ended.
        if (controls.actionEnd) {

          // If control has gone a minimum distance.
          if (
            controls.pointStartX - controls.pointEndX > this.radius / 2 ||
            controls.pointStartX - controls.pointEndX < -this.radius / 2 ||
            controls.pointStartY - controls.pointEndY > this.radius / 2 ||
            controls.pointStartY - controls.pointEndY < -this.radius / 2
          ) {
            this.launch();
          }
          else {
            this.generateSpawnValues();
          }

          // Reset action start and action end.
          controls.actionStart = false;
          controls.actionEnd = false;
          controls.pointStartX = 0;
          controls.pointEndX = 0;
          controls.pointStartY = 0;
          controls.pointEndY = 0;

        }

      }

    }

  },

  draw: function() {

    // Reference controls.
    var controls = stage.controls;

    // Reset stage.
    stage.resetStage();

    // Position.
    stage.stage.translate(this.x, this.y);

    // Draw.

    stage.stage.fillStyle = 'rgba(0, 0, 0, .1)';

    stage.stage.beginPath();
    stage.stage.arc(0, 0, this.radius + 5, 0, 2 * Math.PI);
    stage.stage.fill();
    stage.stage.closePath();

    stage.stage.fillStyle = "rgba(255, 255, 255, 1)";
    stage.stage.strokeStyle = "rgba(0, 0, 0, .25)";

    stage.stage.beginPath();
    stage.stage.arc(0, 0, this.spawnRadius, 0, 2 * Math.PI);
    stage.stage.fill();
    stage.stage.stroke();
    stage.stage.closePath();

    stage.stage.fillStyle = "rgba(0, 0, 0, .25)";

    stage.stage.beginPath();
    stage.stage.arc(0, 0, this.spawnRadius * this.spawnDensity / 3, 0, 2 * Math.PI);
    stage.stage.fill();
    stage.stage.closePath();

    // If starting point of action is the center of the dock.
    if (
      controls.pointStartX === this.x &&
      controls.pointStartY === this.y
    ) {

      // If control has gone a minimum distance.
      if (
        controls.pointStartX - controls.pointEndX > this.radius ||
        controls.pointStartX - controls.pointEndX < -this.radius ||
        controls.pointStartY - controls.pointEndY > this.radius ||
        controls.pointStartY - controls.pointEndY < -this.radius
      ) {

        // Reset stage.
        stage.resetStage();

        // Draw.
        stage.stage.beginPath();
        stage.stage.moveTo(controls.pointStartX, controls.pointStartY);
        stage.stage.lineTo(controls.pointEndX, controls.pointEndY);
        stage.stage.stroke();
        stage.stage.closePath();

      }

    }

  },

}
