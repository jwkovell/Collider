'use strict';

function Pin(options = {}) {

  // Pin is a type of circle.
  Circle.call(this, options);

  this.pinned = options['pinned'] || true;
  this.density = 0;

}

Pin.prototype = Object.create(Circle.prototype);
Pin.prototype.constructor = Pin;

/* Pin.prototype.applyCollision = function(direction, speed) {

  this.hitPoints--;

}; */
