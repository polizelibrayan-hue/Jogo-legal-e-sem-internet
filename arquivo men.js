const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ajusta o tamanho do jogo para o tamanho da tela do celular
canvas.width = window.innerWidth > 600 ? 600 : window.innerWidth;
canvas.height = 300;

let score = 0;
const gravity = 0.6;
const groundY = canvas.height - 40; // Define a linha do chão

let player = {
    x: 50,
    y: groundY - 30,
    w: 30,
    h: 30,
    dy: 0,
    jumpForce: -12,
    grounded: false
};

let obstacle = {
    x: canvas.width,
    y: groundY - 40,
    w: 20,
    h: 40,
    speed: 5
};

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- Lógica do Jogador ---
    player.dy += gravity;
    player.y += player.dy;

    // Colisão com o chão
    if (player.y + player.h > groundY) {
        player.y = groundY - player.h;
        player.dy = 0;
        player.grounded = true;
    }

    // Desenha Jogador (Verde)
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(player.x, player.y, player.w, player.h);

    // --- Lógica do Obstáculo ---
    obstacle.x -= obstacle.speed;
    if (obstacle.x + obstacle.w < 0) {
        obstacle.x = canvas.width;
        score++;
        // Aumenta a velocidade aos poucos para ficar difícil
        obstacle.speed += 0.1;
    }

    // Desenha Obstáculo (Vermelho - como no seu print)
    ctx.fillStyle = "#FF3131";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);

    // --- Placar (Branco - como no seu print) ---
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 20, 30);

    // Colisão simples (Game Over reseta o score)
    if (player.x < obstacle.x + obstacle.w &&
        player.x + player.w > obstacle.x &&
        player.y < obstacle.y + obstacle.h &&
        player.y + player.h > obstacle.y) {
        score = 0;
        obstacle.x = canvas.width;
        obstacle.speed = 5;
    }

    requestAnimationFrame(update);
}

// --- COMANDO DE PULO ---
// 'touchstart' é melhor para celular que 'click'
window.addEventListener('touchstart', function(e) {
    if (player.grounded) {
        player.dy = player.jumpForce;
        player.grounded = false;
    }
}, { passive: false });

// Inicia o jogo
update();
