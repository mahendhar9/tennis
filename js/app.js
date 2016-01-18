var canvas;
var canvasContext;

window.onload = function() {
  console.log('Hello');
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  

  var fps = 1000/30; //30 frames per second
  var ballX = 50;
  var ballSpeed = 5;
  setInterval(function(){
    moveBall()
  }, fps);

  //move the ball
  function moveBall() {
    ballX = ballX + ballSpeed;

    // Draw the canvas
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0,0, canvas.width, canvas.height);

    // Left Paddle
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(0, 210, 10, 90);

    // Draw the ball
    canvasContext.fillStyle = "white";
    canvasContext.beginPath();
    canvasContext.arc(ballX, 50, 10, 0, 2*Math.PI, true);
    canvasContext.fill();
  }

}