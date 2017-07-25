'use strict';

function Controls(options = {}) {

  this.actionStart = false;
  this.actionEnd = false;

  this.pointStartX = 0;
  this.pointStartY = 0;

  this.pointEndX = 0;
  this.pointEndY = 0;

  this.ignoreRadius = 100;

}

Controls.prototype = {

  // Prepare controls.
  prepare: function() {

    // Set mouse related handlers.
    this.setMouseHandlers();

  },

  // Set mouse handlers.
  setMouseHandlers: function() {

    // Reference controls.
    var controls = stage.controls;

    // On mouse click start...
    document.addEventListener('mousedown', function(event){

      // Indicate the start of an action.
      controls.actionStart = true;
      controls.actionEnd = false;

      controls.pointStartX = event['clientX'] * stage.screenCanvasRatio;
      controls.pointStartY = event['clientY'] * stage.screenCanvasRatio;
      controls.pointEndX = event['clientX'] * stage.screenCanvasRatio;
      controls.pointEndY = event['clientY'] * stage.screenCanvasRatio;

    }, {passive: true});

    // On mouse click end...
    document.addEventListener('mouseup', function(event){

      // Indicate the end of an action.
      controls.actionEnd = true;

    }, {passive: true});

    // On mouse move...
    document.addEventListener('mousemove', function(event){

      if (controls.actionStart) {

        controls.pointEndX = event['clientX'] * stage.screenCanvasRatio;
        controls.pointEndY = event['clientY'] * stage.screenCanvasRatio;

      }

    }, {passive: true});

  },

  draw: function() {

    stage.resetStage();

    // Draw.
    stage.stage.beginPath();
    stage.stage.moveTo(this.pointStartX, this.pointStartY);
    stage.stage.lineTo(this.pointEndX, this.pointEndY);
    stage.stage.strokeStyle = "rgba(0, 0, 0, 1)";
    stage.stage.stroke();
    stage.stage.closePath();

  },

}
