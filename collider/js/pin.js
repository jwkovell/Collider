'use strict';

function Pin(options = {}) {

  this.x = options['x'] || 0;
  this.y = options['y'] || 0;
  this.radius = options['radius'] || 0;

  this.direction = options['direction'] || 0;
  this.speed = options['speed'] || 0;

  this.friction = 0;
  this.bounce = 0;
  this.pinned = true;

}

Pin.prototype = {

  update: function() {},

  draw: function() {

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

  },

}
