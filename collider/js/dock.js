'use strict';

function Dock(options = {}) {

  this.x = options['x'] || 250;
  this.y = options['y'] || 650;
  this.radius = options['radius'] || 35;
  this.spawnRadius = 30;

}

Dock.prototype = {

  prepare: function() {},

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
      direction: direction,
      speed: speed
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

          this.launch();

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
    stage.stage.beginPath();
    stage.stage.arc(0, 0, this.radius, 0, 2 * Math.PI);
    stage.stage.strokeStyle = "rgba(0, 0, 0, .1)";
    stage.stage.stroke();
    stage.stage.closePath();

    stage.stage.beginPath();
    stage.stage.arc(0, 0, this.spawnRadius, 0, 2 * Math.PI);
    stage.stage.strokeStyle = "rgba(0, 0, 0, .1)";
    stage.stage.stroke();
    stage.stage.closePath();

    if (controls.pointStartX === this.x && controls.pointStartY === this.y) {

      // Draw controls.
      stage.controls.draw();

    }

  },

}
