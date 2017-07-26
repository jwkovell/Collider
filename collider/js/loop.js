function Loop() {

  this.maxFPS = 60;
  this.lastFrame = 0;
  this.timePassed = 1;

}

Loop.prototype = {

  mainLoop: function(timestamp) {

    // If insufficient time has passed...
    if (timestamp < stage.loop.lastFrame + (1000 / stage.loop.maxFPS)) {

      // Restart loop.
      requestAnimationFrame(stage.loop.mainLoop);

    } else {

      // Update time passed.
      stage.loop.timePassed = (timestamp - stage.loop.lastFrame) / 100;

      // Update last frame.
      stage.loop.lastFrame = timestamp;

      // If a lot of time has passed...
      if (stage.loop.timePassed > 1000) {

        // Reset the time passed counter.
        stage.loop.timePassed = 0;

      }

      // Update stage.
      stage.update();

      // Redraw stage.
      stage.draw();

      // Restart loop.
      requestAnimationFrame(stage.loop.mainLoop);

    }

  }

}