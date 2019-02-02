// 매너 공백
var canvas;
var ctx;

const chrome_speed = 1.0, safari_speed = 2.2;
// canvas width, height.
const canvas_width = 600, canvas_height = 600, ball_radius = 10, bar_length = 150, bar_y = 550;
const bar_area_length = bar_length / 7, piece_length = bar_length / 15;
var ball_x = 300, ball_y, ball_acc_x, ball_acc_y, ball_acc_y_acc, ball_acc_y_limit;
var coll_acc0 = 0.05, coll_acc1 = 0.1, coll_acc2 = 0.3, coll_acc3 = 0.6,
coll_acc4  = 0.8, coll_acc5 = 1.0, coll_acc6 = 1.2, coll_acc7 = 1.5;
var coll_acc = [ 0.05, 0.1, 0.3, 0.6, 0.8, 1.0, 1.2, 1.5 ];
var bar_x = (canvas_width / 2) - (bar_length / 2);

// safari에서 가속도가 소수점이라 y좌표를 이하일 때로 해놓았더니 바에 닿았을 때 가속도 처리가 두번 될 경우가 있으므로 방지하는 변수
var topTouchSwitch = false;
var score;

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.addEventListener('mousemove', setBarPositionX);
  canvas.addEventListener('click', canvasClick);

  ready();
}

var threadId = null;

function ready() {
  ball_x = 300;
  ball_y = 500;
  var r = Math.floor(Math.random() * 10); // 0~9 까지 숫자 생성.
  if(r<=4) {
    r = r - 5; // -5 ~ -1
  } else {
    r = r - 4; // 1 ~ 5
  }
  ball_acc_x = r / 5;
  ball_acc_y = -2;
  ball_acc_y_limit = 9;
  ball_acc_y_acc = 1;
  score = 0;

  var agent = navigator.userAgent.toLowerCase();
  var r = null;
  if (agent.indexOf("chrome") != -1) { // chrome agent 에도 safari라는 단어가 뒤에 포함되어있으므로 주의
    // console.log('chrome');
    r = chrome_speed;
  } else if (agent.indexOf("safari") != -1) { // 단, 사파리에는 없음.
    // console.log('safari');
    r = safari_speed;

    for(i = 0; i<coll_acc.length; i++) {
      coll_acc[i] *= 1.1;
    }

  }

  ball_acc_x *= r;
  ball_acc_y *= r;
  ball_acc_y_limit *= r;
  ball_acc_y_acc *= r;

  clear();
  drawBar();
  drawBall();
  drawScore();
  drawClickToTry();
  // start();
}


function start() {
  threadId = setInterval(thread, 2); // 2->1000/60
}

function stop() {
  clearInterval(threadId);
  threadId = null;
  drawClickToTry(true);
}

function thread() {
  clear();

  ball_x += ball_acc_x;
  ball_y += ball_acc_y;
  updateBallAcc();
  drawBall();
  drawBar();
  drawScore();
}

// Make sure the ball is inside the Canvas
function updateBallAcc() {
  if((ball_x - ball_radius) <= 0 || (ball_x + ball_radius) >= canvas_width) {
    ball_acc_x *= -1;
  }

  if((ball_y - ball_radius) <= 0) { // 상단에 닿았을 때
    topTouchSwitch = true;
    ball_acc_y *= -1;
  }

  if((ball_y + ball_radius) >= canvas_height) { // 하단에 닿았을 때
    stop();
  }

  // When the y values ​​of ball and bar are equal.
  if(ball_y + ball_radius >= bar_y && topTouchSwitch) {
    topTouchSwitch = false;
    // My Bar Collision Process
    // ball_x, ball_y is center value of ball.
    // Adjust ball_acc_x, bar_length/15
    if(ball_x >= bar_x && ball_x <= (bar_x+bar_length)) {
      var distance = ball_x - bar_x;
      distance = Math.floor(distance / piece_length);
      switch (distance) {
        case 0:
          ball_acc_x += -coll_acc[7];
          break;
        case 1:
          ball_acc_x += -coll_acc[6];
          break;
        case 2:
          ball_acc_x += -coll_acc[5];
          break;
        case 3:
          ball_acc_x += -coll_acc[4];
          break;
        case 4:
          ball_acc_x += -coll_acc[3];
          break;
        case 5:
          ball_acc_x += -coll_acc[2];
          break;
        case 6:
          ball_acc_x += -coll_acc[1];
          break;
        case 7:
          var r = Math.random();
          if(r > 0.5) {
            ball_acc_x += coll_acc[0];
          } else {
            ball_acc_x -= coll_acc[0];
          }
          break;
        case 8:
          ball_acc_x += coll_acc[1];
          break;
        case 9:
          ball_acc_x += coll_acc[2];
          break;
        case 10:
          ball_acc_x += coll_acc[3];
          break;
        case 11:
          ball_acc_x += coll_acc[4];
          break;
        case 12:
          ball_acc_x += coll_acc[5];
          break;
        case 13:
          ball_acc_x += coll_acc[6];
          break;
        case 14:
          ball_acc_x += coll_acc[7];
          break;
        default:
      }
      if(ball_acc_y < ball_acc_y_limit) { // 최고속도 9.
        ball_acc_y += ball_acc_y_acc;
      }
      ball_acc_y *= -1;
      ++ score;
    }
  }
}

// Clear Canvas
function clear() {
  ctx.clearRect(0, 0, canvas_width, canvas_height);
}

// Draw the Ball On Canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball_x, ball_y, ball_radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

// Draw the Bar On Canvas, 좌우로 조금 짧게 그린다. 육안상 판정이 이상해보인다.
function drawBar() {
  ctx.fillRect(bar_x + 5, bar_y, bar_length - 10, 10);
}

function drawScore() {
  ctx.font = "30px malgun gothic";
  ctx.fillStyle = "black";
  ctx.fillText("score : " + score, 15, 30);
}

function setBarPositionX(event) {
  var rect = canvas.getBoundingClientRect();
  bar_x = (event.pageX - rect.left) - bar_length / 2;
}

function canvasClick(event) {
  // console.log(!threadId);
  if(threadId) return;
  ready();
  start();
}

function drawClickToTry(re = false) {
    ctx.font = "40px malgun gothic";
    ctx.fillStyle = "black";
    if(re) {
      ctx.fillText("Click To Retry", 182, 320);
    } else {
      ctx.fillText("Click To Try", 201, 320);
    }
}
