const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Paleta del jugador
const paddle = { width:10, height:100, x:10, y:canvas.height/2 - 50, speed:5 };

function drawPaddle() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// 2) Movimiento por teclado
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && paddle.y > 0) {
    paddle.y -= paddle.speed;
  }
  if (e.key === 'ArrowDown' && paddle.y + paddle.height < canvas.height) {
    paddle.y += paddle.speed;
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  requestAnimationFrame(gameLoop);
}

gameLoop();
