let score = 0;
let opponentScore = 0;
let timeRemaining = 10;
let timer;
let gameInterval;

function incrementScore() {
  if (timeRemaining > 0) {
    score++;
    document.getElementById('score').textContent = score;
  }
}

function updateOpponentScore() {
  if (timeRemaining > 0) {
    opponentScore++;
    document.getElementById('opponentScore').textContent = opponentScore;
  }
}

function updateTime() {
  timeRemaining--;
  document.getElementById('time').textContent = timeRemaining;

  if (timeRemaining <= 0) {
    clearInterval(timer);
    clearInterval(gameInterval);
    alert('O tempo acabou! Sua pontuação é: ' + score + '. Pontuação do adversário: ' + opponentScore);
    resetGame();
  }
}

function resetGame() {
  score = 0;
  opponentScore = 0;
  timeRemaining = 10;
  document.getElementById('score').textContent = score;
  document.getElementById('opponentScore').textContent = opponentScore;
  document.getElementById('time').textContent = timeRemaining;
  document.getElementById('clickMe').disabled = true;
  document.getElementById('startGame').disabled = false;
  document.getElementById('stopGame').disabled = true;
}

function startGame() {
  timer = setInterval(updateTime, 1000);
  gameInterval = setInterval(updateOpponentScore, Math.random() * 1000 + 500);
  document.getElementById('clickMe').disabled = false;
  document.getElementById('startGame').disabled = true;
  document.getElementById('stopGame').disabled = false;
}

function stopGame() {
  clearInterval(timer);
  clearInterval(gameInterval);
  document.getElementById('clickMe').disabled = true;
  document.getElementById('startGame').disabled = false;
  document.getElementById('stopGame').disabled = true;
}

// Inicializa o jogo
resetGame();
