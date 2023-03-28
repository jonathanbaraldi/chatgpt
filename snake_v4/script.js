const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const tamanho = 20;
const intervalo = 200;

let snake = [{ x: canvas.width / 2, y: canvas.height / 2 }];
let comida = novaComida();
let pontuacao = 0;

let dx = tamanho;
let dy = 0;

document.addEventListener('keydown', moverCobrinha);

function desenhar() {
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#4CAF50';
    for (let bloco of snake) {
        ctx.fillRect(bloco.x, bloco.y, tamanho, tamanho);
    }

    ctx.fillStyle = '#F44336';
    ctx.fillRect(comida.x, comida.y, tamanho, tamanho);

    ctx.fillStyle = '#FFF';
    ctx.font = '24px Arial';
    ctx.fillText(`Pontuação: ${pontuacao}`, 10, 30);
}

function atualizar() {
    const cabeca = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (Math.abs(cabeca.x - comida.x) < tamanho && Math.abs(cabeca.y - comida.y) < tamanho) {
        pontuacao++;
        comida = novaComida();
    } else {
        snake.pop();
    }

    snake.unshift(cabeca);

    if (cabeca.x < 0 || cabeca.x >= canvas.width || cabeca.y < 0 || cabeca.y >= canvas.height) {
        reiniciar();
    }

    for (let i = 1; i < snake.length; i++) {
        if (cabeca.x === snake[i].x && cabeca.y === snake[i].y) {
            reiniciar();
        }
    }

    desenhar();
    setTimeout(atualizar, intervalo);
}

function novaComida() {
    return {
        x: Math.floor(Math.random() * (canvas.width / tamanho)) * tamanho,
        y: Math.floor(Math.random() * (canvas.height / tamanho)) * tamanho
    };
}

function moverCobrinha(e) {
    if (e.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -tamanho;
    }
    if (e.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = tamanho;
    }
    if (e.key === 'ArrowLeft' && dx === 0) {
        dx = -tamanho;
        dy = 0;
    }
    if (e.key === 'ArrowRight' && dx === 0) {
        dx = tamanho;
        dy = 0;
    }
}

function reiniciar() {
    snake = [{ x: canvas.width / 2, y: canvas.height / 2 }];
    dx = tamanho;
    dy = 0;
    pontuacao = 0;
}

atualizar();
