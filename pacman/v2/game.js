// Load game assets
const pacmanSprite = new Image();
pacmanSprite.src = "pacman.png";

const ghostSprite = new Image();
ghostSprite.src = "ghost.png";

const pelletSprite = new Image();
pelletSprite.src = "pellet.png";

const wallSprite = new Image();
wallSprite.src = "wall.png";

// Set up the canvas
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Set up game objects
class Pellet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 16;
  }

  update() {
    // Update pellet state
  }

  draw() {
    ctx.drawImage(pelletSprite, this.x, this.y, this.size, this.size);
  }
}

class Wall {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 16;
  }

  update() {
    // Update wall state
  }

  draw() {
    ctx.drawImage(wallSprite, this.x, this.y, this.size, this.size);
  }
}

class Pacman {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 32;
    this.direction = "right";
  }

  update() {
    // Update Pac-Man state
    switch (this.direction) {
      case "left":
        this.x -= 5;
        break;
      case "right":
        this.x += 5;
        break;
      case "up":
        this.y -= 5;
        break;
      case "down":
        this.y += 5;
        break;
    }
  }

  draw() {
    ctx.drawImage(pacmanSprite, this.x, this.y, this.size, this.size);
  }
}



// ADICIONAMOS A PERSEGUIÇÃO

class Ghost {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 32;
  }

  update() {
    this.chase();

    console.log(this.speed)


    // Update ghost position based on direction
    switch (this.direction) {
      case "left":
        this.x -= this.speed;
        break;
      case "right":
        this.x += this.speed;
        break;
      case "up":
        this.y -= this.speed;
        break;
      case "down":
        this.y += this.speed;
        break;
    }
  }

  draw() {
    ctx.drawImage(ghostSprite, this.x, this.y, this.size, this.size);
  }


  chase() {


    // Calculate the distance between Pac-Man and the ghost
    const dx = pacman.x - this.x;
    const dy = pacman.y - this.y;



    // Calculate the angle between Pac-Man and the ghost
    const angle = Math.atan2(dy, dx);


    console.log(angle);

    // Set the ghost's direction based on the angle
    if (angle > -Math.PI / 4 && angle <= Math.PI / 4) {
      this.direction = "right";
    } else if (angle > Math.PI / 4 && angle <= 3 * Math.PI / 4) {
      this.direction = "up";
    } else if (angle > 3 * Math.PI / 4 || angle <= -3 * Math.PI / 4) {
      this.direction = "left";
    } else if (angle > -3 * Math.PI / 4 && angle <= -Math.PI / 4) {
      this.direction = "down";
    }
  }
}

// Set up game state
let pacman;
let ghosts = [];
let pellets = [];
let walls = [];
let score = 0;
let gameOver = false;



// Initialize game objects
pacman = new Pacman(128, 128);
ghosts.push(new Ghost(256, 256));
pellets.push(new Pellet(64, 64));
walls.push(new Wall(0, 0));

// Set up input handling
document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event) {
  switch (event.key) {
    case "ArrowLeft":
      pacman.direction = "left";
      break;
    case "ArrowRight":
      pacman.direction = "right";
      break;
    case "ArrowUp":
      pacman.direction = "up";
      break;
    case "ArrowDown":
      pacman.direction = "down";
      break;
  }
}

// Set up collision detection
function checkCollision(a, b) {
  if (
    a.x < b.x + b.size &&
    a.x + a.size > b.x &&
    a.y < b.y + b.size &&
    a.y + a.size > b.y
  ) {
    return true;
  }
  return false;
}




// Set up the game loop
function update() {
  // Update game objects
  pacman.update();
  ghosts.forEach(ghost => ghost.update());
  pellets.forEach(pellet => pellet.update());
  walls.forEach(wall => wall.update());



  // PEDI PARA ARRUMAR NAO TINHA = ESTAVA DANDO ERRO

  // Check for collisions with all Pellets
  pellets.forEach(pellet => {
    if (checkCollision(pacman, pellet)) {
      // Handle collision between Pac-Man and pellet
      console.log("pac-man hitting the pallet")

    }
  });

  // ========================
  ghosts.forEach(ghost => {
    if (checkCollision(pacman, ghost)) {
      // Handle collision between Pac-Man and pellet
      console.log("pac-man hitting the ghosts")

    }
  });

}



function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw game objects
  pacman.draw();
  ghosts.forEach(ghost => ghost.draw());
  pellets.forEach(pellet => pellet.draw());
  walls.forEach(wall => wall.draw());

  // Draw score
  ctx.font = "24px sans-serif";
  ctx.fillText(`Score: ${score}`, 8, 24);
}

function gameLoop() {
  update();
  draw();

  if (gameOver) {
    // Stop the game loop
    return;
  }

  // Request another frame
  requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);





