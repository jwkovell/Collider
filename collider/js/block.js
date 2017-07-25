'use strict';

function Block(options = {}) {

  this.x = options['x'] || 0;
  this.y = options['y'] || 0;
  this.width = options['width'] || 0;
  this.height = options['height'] || 0;
  this.rotation = options['rotation'] || 0;

  this.prepare();

}

Block.prototype = {

  prepare: function() {},

  update: function() {},

  draw: function() {

    stage.resetStage();

    // Position.
    stage.stage.translate(this.x, this.y);

    // Rotate.
    stage.stage.rotate(this.rotation);

    // Draw.
    stage.stage.rect(this.x, this.y, this.width, this.height);
    stage.stage.stroke();

  },

}
