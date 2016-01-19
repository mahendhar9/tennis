var canvas;
var canvasContext;

window.onload = function() {
  console.log('Hello');
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  var fps = 1000/30; //30 frames per second
  var ballX = 50;
  var ballY = 50;
  var ballSpeedX = 5;
  var ballSpeedY = 5;
  var paddle1Y = 250;
  var paddle2Y = 250;
  const PADDLE_HEIGHT = 100;
  setInterval(function(){
    moveBall()
  }, fps);


  // Track user's mouse position
  var calculateMousePos = function(event) {
    var mouseX = event.clientX - canvas.offsetLeft;
    var mouseY = event.clientY - canvas.offsetTop;
    return {
      x: mouseX,
      y: mouseY
    }
  }

  canvas.addEventListener('mousemove', function(event) {
    var mousePos = calculateMousePos(event);
    paddle1Y = mousePos.y - PADDLE_HEIGHT/2;
    
  });

  //Computer AI - Second Paddle's movement
  function computerMovement() {
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2)
    if(paddle2YCenter < ballY - 35 ) {
      paddle2Y = paddle2Y + 10
    } else if(paddle2YCenter > ballY + 35) {
      paddle2Y = paddle2Y - 10
    }
  }

  //Reset the ball from the net when it hits the wall
  function ballReset() {
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
  }

  //move the ball
  function moveBall() {
    computerMovement()
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    // Bounce back the ball if it hits the paddle, else reset
    if(ballX > canvas.width) {
      if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
      } else {
        ballReset()
      }
    } else if(ballX < 0) {
      if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
      } else {
        ballReset()
      }
    }

    // Bounce back vertically if it hits the wall
    if(ballY > canvas.height) {
      ballSpeedY = -ballSpeedY;
    } else if(ballY < 0) {
      ballSpeedY = -ballSpeedY;
    }

    // Draw the canvas
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0,0, canvas.width, canvas.height);

    // Left Paddle
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(0, paddle1Y, 10, PADDLE_HEIGHT);

    // Right Paddle
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(canvas.width-10, paddle2Y, 10, PADDLE_HEIGHT);

    // Draw the ball
    canvasContext.fillStyle = "white";
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, 10, 0, 2*Math.PI, true);
    canvasContext.fill();
  }

}