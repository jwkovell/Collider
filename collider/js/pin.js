'use strict';

function Pin(options = {}) {

  // Pin is a type of circle.
  Circle.call(this, options);

  this.pinned = options['pinned'] || true;

}

Pin.prototype = Object.create(Circle.prototype);
Pin.prototype.constructor = Pin;
