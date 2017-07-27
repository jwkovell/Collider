'use strict';

function Circle(options = {}) {

  this.x = options['x'] || 0;
  this.y = options['y'] || 0;
  this.radius = options['radius'] || 0;

  this.direction = options['direction'] || 0;
  this.speed = options['speed'] || 0;
  this.density = options['density'] || 1;
  this.maxSpeed = options['maxSpeed'] || 20;
  this.minSpeedThreshold = options['minSpeedThreshold'] || .01;

  this.hitPoints = options['hitPoints'] || Infinity;

  this.friction = options['friction'] || .01;
  this.bounce = options['bounce'] || 1;
  this.pinned = options['pinned'] || false;

  this.collisionBehaviors = options['collisionBehaviors'] || ['move'];

  this.prepare();

}

Circle.prototype = {

  prepare: function() {},

  checkEdgeCollisions: function() {

    // If circle is out of bounds...
    if (
      this.y < 0 + this.radius ||
      this.y > stage.height - this.radius ||
      this.x < 0 + this.radius ||
      this.x > stage.width - this.radius
    ) {

      // If a horizontal bound was breached...
      if (this.y < 0 + this.radius || this.y > stage.height - this.radius) {

        // Update direction based on a reflection against a horizontal surface.
        this.direction = Math.PI / 2 - (this.direction + Math.PI - Math.PI / 2);

      }

      // If a vertical bound was breached...
      if (this.x < 0 + this.radius || this.x > stage.width - this.radius) {

        // Update direction based on a reflection against a vertical surface.
        this.direction = -(this.direction + Math.PI);

      }

      // Move circle inbounds.
      if (this.x < 0 + this.radius) {
        this.x = 0 + this.radius;
      }
      else if (this.x > stage.width - this.radius) {
        this.x = stage.width - this.radius;
      }
      if (this.y < 0 + this.radius) {
        this.y = 0 + this.radius;
      }
      else if (this.y > stage.height - this.radius) {
        this.y = stage.height - this.radius;
      }

    }

  },

  checkCollisions: function() {

    var self = this;

    // Loop through pins.
    stage.pins.forEach(function(pin){

      // If collision is found...
      if (self.checkCollision(pin)) {

        // Handle collision.
        self.evaluateCollision(pin);

      }

    });

    // Loop through circles.
    stage.circles.forEach(function(circle){

      // If collision is found...
      if (self.checkCollision(circle)) {

        // Handle collision.
        self.evaluateCollision(circle);

      }

    });

  },

  checkCollision: function(object) {

    // If this circle is not the given object...
    if (!(this === object)) {

      // Get squared distance between object centers.
      var distanceSquared = Math.pow(object.x - this.x, 2) + Math.pow(object.y - this.y, 2);

      // Get sum of both object radii squared.
      var radiiSumSquared = Math.pow(object.radius + this.radius, 2);

      // If circles overlap...
      if (radiiSumSquared - distanceSquared > 0) {

        return true;

      }

    }

    return false;

  },

  evaluateCollision: function(object) {

    // See: https://scratch.mit.edu/projects/116144988/

    // Get distance between centers of both objects.
    var distanceX = this.x - object.x;
    var distanceY = this.y - object.y;
    var distSquared = Math.pow(distanceX, 2) + Math.pow(distanceY, 2);

    // Get speed of collision.
    var collisionSpeedX = object.speed * Math.cos(object.direction) - this.speed * Math.cos(this.direction);
    var collisionSpeedY = object.speed * Math.sin(object.direction) - this.speed * Math.sin(this.direction);

    // Get dot product of object distances and collision speed.
    var dotProduct = distanceX * collisionSpeedX + distanceY * collisionSpeedY;

    // If circles are moving toward each other...
    if (dotProduct > 0) {

      var collisionScale = dotProduct / distSquared;
      var collisionX = distanceX * collisionScale;
      var collisionY = distanceY * collisionScale;

      var collisionBounce = this.bounce * object.bounce;

      var collisionMass = this.radius * this.density;
      var collisionRatio1 = 1;
      var collisionRatio2 = 0;

      // If object is not pinned.
      if (!object.pinned) {

        // Set collision ratios based on ratio to total collision mass.
        collisionMass = this.radius * this.density + object.radius * object.density;
        collisionRatio1 = 2 * object.radius * object.density * object.bounce / collisionMass;
        collisionRatio2 = 2 * this.radius * this.density * this.bounce / collisionMass;

      }

      this.applyCollision(
        Math.atan2(collisionY * collisionRatio1, collisionX * collisionRatio1),
        Math.sqrt( Math.pow(collisionX * collisionRatio1, 2) + Math.pow(collisionY * collisionRatio1, 2)) * collisionBounce
      );

      object.applyCollision(
        Math.atan2(collisionY * collisionRatio2, collisionX * collisionRatio2) + Math.PI,
        Math.sqrt( Math.pow(collisionX * collisionRatio2, 2) + Math.pow(collisionY * collisionRatio2, 2)) * collisionBounce
      );

    }

  },

  applyCollision: function(direction, speed) {

    this.hitPoints--;

    if (this.collisionBehaviors.includes('move')) {

      this.direction = direction;
      this.speed = speed;

    }

    if (this.collisionBehaviors.includes('divide')) {

      stage.circles.push(new Circle({
        x: this.x,
        y: this.y,
        radius: this.radius / 2,
        direction: direction + Math.PI / 2,
        speed: speed / 2
      }));

      stage.circles.push(new Circle({
        x: this.x,
        y: this.y,
        radius: this.radius / 2,
        direction: direction - Math.PI / 2,
        speed: speed / 2
      }));

    }

    if (this.collisionBehaviors.includes('pop')) {

      this.hitPoints = 0;

    }

    this.direction = direction;
    this.speed = speed;

  },

  update: function() {

    // Check for out of bounds.
    this.checkEdgeCollisions();

    // Limit speed to maximum speed.
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    // Reduce speed by friction.
    this.speed -= this.speed * this.friction;

    // If speed is greater than minimum threshold...
    if (this.speed > this.minSpeedThreshold) {

      // Update position.
      this.x = this.x + this.speed * Math.cos(this.direction);
      this.y = this.y + this.speed * Math.sin(this.direction);

    } else {

      // Set speed to 0;
      this.speed = 0;

    }

  },

  draw: function() {

    // Reset stage.
    stage.resetStage();

    // Position.
    stage.stage.translate(this.x, this.y);

    stage.stage.fillStyle = 'rgba(255, 255, 255, 1)';
    stage.stage.strokeStyle = 'rgba(0, 0, 0, .025)';

    // Draw.
    stage.stage.beginPath();
    stage.stage.arc(0, 0, this.radius, 0, 2 * Math.PI);
    stage.stage.fill();
    stage.stage.stroke();
    stage.stage.closePath();

    stage.stage.fillStyle = 'rgba(0, 0, 0, ' + (this.density * this.radius) / 120 + ')';

    // Draw.
    stage.stage.beginPath();
    stage.stage.arc(0, 0, this.radius - 5, 0, 2 * Math.PI);
    stage.stage.fill();
    stage.stage.closePath();

  },

}
