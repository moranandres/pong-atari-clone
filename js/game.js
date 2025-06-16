// js/game.js — Versión 7: puntuación y reinicio de pelota
// (basado en v6)

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Paletas
const paddle   = { width:10, height:100, x:10, y:canvas.height/2-50, speed:5 };
const opponent = { width:10, height:100, x:canvas.width-20, y:canvas.height/2-50, speed:5 };

// Pelota y marcador
const ball = { x:canvas.width/2, y:canvas.height/2, radius:8, speedX:4, speedY:4 };
let scorePlayer = 0, scoreOpponent = 0;

function drawPaddle() { ctx.fillStyle='#fff'; ctx.fillRect(paddle.x,paddle.y,paddle.width,paddle.height); }
function drawOpponent() { ctx.fillStyle='#fff'; ctx.fillRect(opponent.x,opponent.y,opponent.width,opponent.height); }
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
  ctx.fill();
}
function drawScore() {
  ctx.font='32px monospace'; ctx.textAlign='center';
  ctx.fillText(scorePlayer,canvas.width/4,50);
  ctx.fillText(scoreOpponent,3*canvas.width/4,50);
}
function checkCollision(p) {
  return (
    ball.x - ball.radius < p.x + p.width &&
    ball.x + ball.radius > p.x &&
    ball.y - ball.radius < p.y + p.height &&
    ball.y + ball.radius > p.y
  );
}
function resetBall() {
  ball.x = canvas.width/2; ball.y = canvas.height/2;
  ball.speedX = -ball.speedX;
  ball.speedY = 4*(Math.random()>0.5?1:-1);
}
function updateBall() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height)
    ball.speedY *= -1;
  if (checkCollision(paddle) || checkCollision(opponent))
    ball.speedX *= -1;
  if (ball.x - ball.radius < 0) { scoreOpponent++; resetBall(); }
  if (ball.x + ball.radius > canvas.width) { scorePlayer++; resetBall(); }
}

// Teclado
window.addEventListener('keydown', e => {
  if (e.key==='ArrowUp' && paddle.y>0) paddle.y-=paddle.speed;
  if (e.key==='ArrowDown' && paddle.y+paddle.height<canvas.height)
    paddle.y+=paddle.speed;
});

function gameLoop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawPaddle();
  drawOpponent();
  drawBall();
  drawScore();       // marcador
  updateBall();
  requestAnimationFrame(gameLoop);
}

gameLoop();

