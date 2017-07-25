var stage = {};

document.addEventListener('DOMContentLoaded', function(){

  // Instantiate stage.
  stage = new Stage();

  // Prepare stage.
  stage.prepare();

});

window.addEventListener('resize', function() {

  stage.screenWidth = window.innerWidth;
  stage.screenHeight = window.innerHeight;
  stage.screenCanvasRatio = stage.width / stage.screenWidth;

}, true);
