const gameBoard = document.getElementById('game-board');

// Cria o personagem do Pac-Man
const pacman = document.createElement('div');
pacman.classList.add('game-element', 'pacman');
gameBoard.appendChild(pacman);

// Cria um fantasma
const ghost = document.createElement('div');
ghost.classList.add('game-element', 'ghost');
gameBoard.appendChild(ghost);

// Define a velocidade do Pac-Man e do fantasma
const pacmanSpeed = 5;
const ghostSpeed = 3;

// Define a direção inicial do Pac-Man e do fantasma
let pacmanDirection = 'right';
let ghostDirection = 'left';



document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      pacmanDirection = 'left';
      break;
    case 'ArrowRight':
      pacmanDirection = 'right';
      break;
    case 'ArrowUp':
      pacmanDirection = 'up';
      break;
    case 'ArrowDown':
      pacmanDirection = 'down';
      break;
  }
});

// Atualiza a posição do Pac-Man e do fantasma a cada frame
function updatePositions() {
  // Atualiza a posição do Pac-Man
  switch (pacmanDirection) {
    case 'left':
      pacman.style.left = `${pacman.offsetLeft - pacmanSpeed}px`;
      break;
    case 'right':
      pacman.style.left = `${pacman.offsetLeft + pacmanSpeed}px`;
      break;
    case 'up':
      pacman.style.top = `${pacman.offsetTop - pacmanSpeed}px`;
      break;
    case 'down':
      pacman.style.top = `${pacman.offsetTop + pacmanSpeed}px`;
      break;
  }

  // Atualiza a posição do fantasma
  switch (ghostDirection) {
    case 'left':
      ghost.style.left = `${ghost.offsetLeft - ghostSpeed}px`;
      break;
    case 'right':
      ghost.style.left = `${ghost.offsetLeft + ghostSpeed}px`;
      break;
    case 'up':
      ghost.style.top = `${ghost.offsetTop - ghostSpeed}px`;
      break;
    case 'down':
      ghost.style.top = `${ghost.offsetTop + ghostSpeed}px`;
      break;
  }

  // Verifica se o Pac-Man e o fantasma colidiram
  const pacmanRect = pacman.getBoundingClientRect();
  const ghostRect = ghost.getBoundingClientRect();
  if (pacmanRect.left < ghostRect.right && ghostRect.left < pacmanRect.right &&
      pacmanRect.top < ghostRect.bottom && ghostRect.top < pacmanRect.bottom) {
    // Exibe uma mensagem de colisão
    console.log('Pac-Man e o fantasma colidiram!');
  }
}

// Atualiza a posição do Pac-Man e do fantasma a cada 10 milissegundos
setInterval(updatePositions, 10);