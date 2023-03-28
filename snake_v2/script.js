const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const tamanho = 20;
const intervalo = 100;

let snake = [{ x: 200, y: 200 }];
let comida = novaComida();

let dx = tamanho;
let dy = 0;

document.addEventListener('keydown', moverCobrinha);

function desenhar() {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'lime';
    for (let bloco of snake) {
        ctx.fillRect(bloco.x, bloco.y, tamanho, tamanho);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(comida.x, comida.y, tamanho, tamanho);
}

function atualizar() {
    const cabeca = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (cabeca.x === comida.x && cabeca.y === comida.y) {
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
    snake = [{ x: 200, y: 200 }];
    dx = tamanho;
    dy = 0;
}




atualizar();

function atualizar() {
    const cabeca = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (cabeca.x === comida.x && cabeca.y === comida.y) {
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
    snake = [{ x: 200, y: 200 }];
    dx = tamanho;
    dy = 0;
}

atualizar();
