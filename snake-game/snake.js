const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let score = 0;

const snake = {
  x: 10,
  y: 10,
  dx: 1,
  dy: 0,
  tail: 5,
  trail: [],
};

const apple = {
  x: 15,
  y: 15,
};

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 1000 / 15);
}

function update() {
  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0 || snake.x >= tileCount || snake.y < 0 || snake.y >= tileCount) {
    snake.x = snake.y = 10;
    snake.tail = 5;
    score = 0;
  }

  for (const t of snake.trail) {
    if (t.x === snake.x && t.y === snake.y) {
      snake.tail = 5;
      score = 0;
    }
  }

  snake.trail.push({ x: snake.x, y: snake.y });

  while (snake.trail.length > snake.tail) {
    snake.trail.shift();
  }

  if (snake.x === apple.x && snake.y === apple.y) {
    snake.tail++;
    score++;
    apple.x = Math.floor(Math.random() * tileCount);
    apple.y = Math.floor(Math.random() * tileCount);
  }
}

function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'lime';
  for (const t of snake.trail) {
    ctx.fillRect(t.x * gridSize, t.y * gridSize, gridSize - 2, gridSize - 2);
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize - 2, gridSize - 2);

  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 20);
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (snake.dy === 0) {
        snake.dx = 0;
        snake.dy = -1;
      }
      break;
    case 'ArrowDown':
      if (snake.dy === 0) {
        snake.dx = 0;
        snake.dy = 1;
      }
      break;
    case 'ArrowLeft':
      if (snake.dx === 0) {
        snake.dx = -1;
        snake.dy = 0;
      }
      break;
    case 'ArrowRight':
      if (snake.dx === 0) {
        snake.dx = 1;
        snake.dy = 0;
      }
      break;
  }
});

gameLoop();
