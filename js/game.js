const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Paletas (jugador + oponente)
const paddle = { width:10, height:100, x:10, y:canvas.height/2 - 50, speed:5 };
const opponent = { width:10, height:100, x:canvas.width-20, y:canvas.height/2 - 50, speed:5 };
function drawPaddle() { ctx.fillStyle='#fff'; ctx.fillRect(paddle.x,paddle.y,paddle.width,paddle.height); }
function drawOpponent() { ctx.fillStyle='#fff'; ctx.fillRect(opponent.x,opponent.y,opponent.width,opponent.height); }

// Pelota
const ball = { x:canvas.width/2, y:canvas.height/2, radius:8, speedX:4, speedY:4 };
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  ctx.fill();
}
function updateBall() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;
  // Rebote techo/suelo
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.speedY *= -1;
  }
}

// Teclado
window.addEventListener('keydown', e => {
  if (e.key==='ArrowUp' && paddle.y>0) paddle.y-=paddle.speed;
  if (e.key==='ArrowDown' && paddle.y+paddle.height<canvas.height) paddle.y+=paddle.speed;
});

function gameLoop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawPaddle();
  drawOpponent();
  drawBall();
  updateBall();
  requestAnimationFrame(gameLoop);
}

gameLoop();
