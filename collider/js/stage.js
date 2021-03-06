function Stage() {

  this.canvas = document.getElementById('canvas');
  this.stage = this.canvas.getContext('2d');

  this.width = 500;
  this.height = 750;

  this.screenWidth = window.innerWidth;
  this.screenCanvasRatio = this.width / this.screenWidth;

  this.circles = [];
  this.pins = [];
  this.blocks = [];
  this.controls = {};
  this.dock = {};
  this.loop = {};

}

Stage.prototype = {

  prepare: function() {

    // Instantiate Controls.
    this.controls = new Controls();
    this.controls.prepare();

    this.dock = new Dock();

    this.circles.push(new Circle({
      x: 220,
      y: 40,
      radius: 15,
      density: .5,
      collisionBehaviors: ['divide', 'pop']
    }));

    this.circles.push(new Circle({
      x: 250,
      y: 40,
      radius: 15,
      density: .5,
      collisionBehaviors: ['divide', 'pop']
    }));

    this.circles.push(new Circle({
      x: 280,
      y: 40,
      radius: 15,
      density: .5,
      collisionBehaviors: ['divide', 'pop']
    }));

    this.circles.push(new Circle({
      x: 235,
      y: 70,
      radius: 15,
      density: .5,
      collisionBehaviors: ['divide', 'pop']
    }));

    this.circles.push(new Circle({
      x: 265,
      y: 70,
      radius: 15,
      density: .5,
      collisionBehaviors: ['divide', 'pop']
    }));

    this.circles.push(new Circle({
      x: 250,
      y: 100,
      radius: 15,
      density: .5,
      collisionBehaviors: ['divide', 'pop']
    }));

    this.pins.push(new Pin({
      x: 250,
      y: 300,
      radius: 45,
      bounce: 5
    }));

    this.pins.push(new Pin({
      x: 50,
      y: 500,
      radius: 10,
      hitPoints: 5
    }));

    this.pins.push(new Pin({
      x: 100,
      y: 500,
      radius: 10,
      hitPoints: 5
    }));

    this.pins.push(new Pin({
      x: 150,
      y: 500,
      radius: 10,
      hitPoints: 5
    }));

    this.pins.push(new Pin({
      x: 350,
      y: 500,
      radius: 10,
      hitPoints: 5
    }));

    this.pins.push(new Pin({
      x: 400,
      y: 500,
      radius: 10,
      hitPoints: 5
    }));

    this.pins.push(new Pin({
      x: 450,
      y: 500,
      radius: 10,
      hitPoints: 5
    }));

    // Instantiate Loop.
    this.loop = new Loop();

    // Start loop.
    requestAnimationFrame(this.loop.mainLoop);

  },

  resetStage: function() {

    this.stage.setTransform(1, 0, 0, 1, 0, 0);
    this.stage.globalAlpha = 1;
    this.stage.lineWidth = 1;
    this.stage.strokeStyle = "#000000";
    this.stage.fillStyle = "#000000";

  },

  update: function() {

    // Update dock.
    this.dock.update();

    // Loop through circles.
    this.circles.forEach(function(circle){

      // Update circle.
      circle.update();

    });

    // Loop through circles.
    this.circles.forEach(function(circle){

      // check for collisions.
      circle.checkCollisions();

    });

    // Loop through circles.
    for (var circleID = this.circles.length - 1; circleID >= 0; circleID--) {

      var circle = this.circles[circleID];

      // If circle has no hit points...
      if (circle.hitPoints <= 0) {

        // Remove the circle.
        this.circles.splice(circleID, 1);

      }

    };

    // Loop through pins.
    for (var pinID = this.pins.length - 1; pinID >= 0; pinID--) {

      var pin = this.pins[pinID];

      // If pin has no hit points...
      if (pin.hitPoints <= 0) {

        // Remove the pin.
        this.pins.splice(pinID, 1);

      }

    };

  },

  draw: function() {

    // Reset transformations and styles
    this.resetStage();

    // Clear canvas.
    this.stage.clearRect(0, 0, this.width, this.height);

    // Loop through circles.
    this.circles.forEach(function(circle){

      // Draw circle.
      circle.draw();

    });

    // Loop through pins.
    this.pins.forEach(function(pin){

      // Draw pin.
      pin.draw();

    });

    // Draw dock.
    this.dock.draw();

  },

}