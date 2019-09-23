const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameAre = document.querySelector('.gameAre'),
  car = document.createElement('div');

  car.classList.add('car');

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

const setting = {
  start: false,
  score: 0,
  speed: 3
};


start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

function startGame () {
  start.classList.add('hide');
  setting.start = true;
  gameAre.appendChild(car);
  requestAnimationFrame(playGame);
}

function playGame () {
  console.log('playGame');
  if (setting.start === true) {
    requestAnimationFrame(playGame);
  }  
}

function startRun (event) {
  event.preventDefault();
  keys[event.key] = true;
}

function stopRun () {
  event.preventDefault();
  keys[event.key] = false;
}
