const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  car = document.createElement('div'),
  music = document.createElement('audio'),
  bottomStart = start.querySelector('.start_game'),
  finishGame = document.querySelector('.game_over');

let topGameScore = document.querySelector('.top_score');
let yuoGameScore = document.querySelector('.yuo_score');

car.classList.add('car');
let topScore;
// topGamescore.textContent += topScore;
topGameScore.innerHTML = 'Лучший счет: ' + 0;




const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

const setting = {
  start: false,
  score: 0,
  speed: 20,
  traffic: 2,
  managementSpeedCar: 7
};

function getQuantityElements (heightElement) {
  return document.documentElement.clientHeight / (heightElement + 1);
}

bottomStart.addEventListener('click', startGame);
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 32 && !setting.start) {
    startGame();
  }
  return;
});
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

function startGame () {
  start.classList.add('hide');
  gameArea.classList.remove('hide');
  score.classList.remove('hide');
  gameArea.innerHTML = '';  

  topScore = localStorage.getItem('topScore');    

  for (let i = 0; i < getQuantityElements(100); i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * 100) + 'px';
    line.y = i * 100;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
    const enemy = document.createElement('div');
    let enemyImg = Math.floor(Math.random() * 2) + 1;
    enemy.classList.add('enemy');
    enemy.y = -100 * setting.traffic * (i + 1);
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    enemy.style.top = enemy.y + 'px';
    enemy.style.background = `transparent url(./image/enemy${enemyImg}.png) center / cover no-repeat`;
    gameArea.appendChild(enemy);
  }

  setting.score = 0;
  setting.start = true;
  gameArea.appendChild(car);
  music.setAttribute('autoplay', true);
  music.setAttribute('src', './music/startGame.mp3');
  car.style.left = (gameArea.offsetWidth / 2) - (car.offsetWidth / 2);
  car.style.top = 'auto';
  car.style.bottom = '10px';
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;  
  requestAnimationFrame(playGame);
}

function playGame () {
  if (setting.start) {
    setting.score += setting.speed;
    score.innerHTML = 'SCORE<br>' + setting.score;        

    moveRoad();
    moveEnemy();
    if (keys.ArrowLeft && setting.x > 0) {
      setting.x -= setting.managementSpeedCar;
    }
    if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
      setting.x += setting.managementSpeedCar;
    }
    if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
      setting.y += setting.managementSpeedCar;

    }
    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.managementSpeedCar;
    }

    car.style.left = setting.x + 'px';
    car.style.top = setting.y + 'px';           
    requestAnimationFrame(playGame);
  }
}

function startRun (event) {
  event.preventDefault();
  if (keys.hasOwnProperty(event.key)) {
    keys[event.key] = true;
  }
}

function stopRun (event) {
  event.preventDefault();
  if (keys.hasOwnProperty(event.key)) {
    keys[event.key] = false;
  }
}

function moveRoad () {
  let lines = document.querySelectorAll('.line');
  lines.forEach(function (it) {
    it.y += setting.speed;
    it.style.top = it.y + 'px';
    if (it.y >= document.documentElement.clientHeight) {
      it.y = -100;
    }
  });
}

function moveEnemy () {
  let enemys = document.querySelectorAll('.enemy');

  enemys.forEach(function (it) {
    let carRect = car.getBoundingClientRect();
    let enemyRect = it.getBoundingClientRect();

    if (carRect.top <= enemyRect.bottom &&
        carRect.right >= enemyRect.left &&
        carRect.left <= enemyRect.right &&
        carRect.bottom >= enemyRect.top) {
          gameOver();
          if (topScore < setting.score) {
            localStorage.setItem('topScore', setting.score);            
          }
    }

    it.y += setting.speed / 2;
    it.style.top = it.y + 'px';

    if (it.y >= document.documentElement.clientHeight) {
      it.y = -100 * setting.traffic;
      it.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    }
  });
}

function gameOver () {  
  setting.start = false;
  gameArea.classList.add('hide');
  score.classList.add('hide');
  finishGame.classList.remove('hide');
  start.style.top = score.offsetHeight;
  music.setAttribute('src', '');   
  topGameScore.innerHTML = `Последний лучший счет: ${topScore}`; 
  yuoGameScore.innerHTML = `Ваш счет: ${setting.score}`;    
}






