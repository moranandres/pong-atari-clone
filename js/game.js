const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Paleta del jugador
const paddle = { width:10, height:100, x:10, y:canvas.height/2 - 50, speed:5 };
function drawPaddle() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Paleta del oponente
const opponent = {
  width: 10,
  height: 100,
  x: canvas.width - 20,
  y: canvas.height / 2 - 50,
  speed: 5
};
function drawOpponent() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(opponent.x, opponent.y, opponent.width, opponent.height);
}

// Movimiento por teclado
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && paddle.y > 0) paddle.y -= paddle.speed;
  if (e.key === 'ArrowDown' && paddle.y + paddle.height < canvas.height) paddle.y += paddle.speed;
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawOpponent();
  requestAnimationFrame(gameLoop);
}

gameLoop();
