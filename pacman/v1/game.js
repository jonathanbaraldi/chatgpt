const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Set up the game

function update() {
  // Update the game state
}

function draw() {
  // Draw the game
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
