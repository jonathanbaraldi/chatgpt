// pong.js
// Set up some variables to control the game
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let paddle1Y = 250;
let paddle2Y = 250;
const paddleHeight = 50;
const paddleWidth = 10;
let player1Score = 0;
let player2Score = 0;

// Set up some variables to track the keys
const KEY_UP = 38;
const KEY_DOWN = 40;
let keyPressed = {};

// Set up an event listener to track key presses and releases
window.addEventListener('keydown', function(event) {
  keyPressed[event.keyCode] = true;
});
window.addEventListener('keyup', function(event) {
  keyPressed[event.keyCode] = false;
});


// Draw everything on the canvas
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = '#fff';
  ctx.fill();

  // Draw the paddles
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

  // Draw the scores
  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#fff';
  ctx.fillText(player1Score, 100, 50);
  ctx.fillText(player2Score, 300, 50);
}


// Update the game state
function update() {
  // Move the ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check if the ball is off the left side of the screen
  if (ballX < 0) {
    // Player 2 scores a point
    player2Score++;

    // Reset the ball to the center of the screen
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }

  // Check if the ball is off the right side of the screen
  if (ballX > canvas.width) {
    // Player 1 scores a point
    player1Score++;

    // Reset the ball to the center of the screen
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }

  // Check if the ball is off the top or bottom of the screen
  if (ballY < 0 || ballY > canvas.height) {
    // Reverse the ball's direction
    ballSpeedY = -ballSpeedY;
  }

  // Check for collisions between the ball and the paddles
  if (ballX < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
    // Reverse the ball's direction
    ballSpeedX = -ballSpeedX;
  }
  if (ballX > canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
    // Reverse the ball's direction
    ballSpeedX = -ballSpeedX;
  }

  // Move the paddles
  if (keyPressed[KEY_UP]) {
    paddle1Y -= 5;
  }
  if (keyPressed[KEY_DOWN]) {
    paddle1Y += 5;
  }

  // Move the right paddle to follow the ball
  paddle2Y = ballY - paddleHeight / 2;
}

// Run the game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
