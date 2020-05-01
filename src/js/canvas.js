let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

let min = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.8);
canvas.width = canvas.height = min;

window.addEventListener('resize', () => {
  let min = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.75);
  canvas.width = canvas.height = min;
});

document.addEventListener('keydown', (event) => {
  if (event.keyCode == 87 || event.keyCode == 38) {
    snake.dir(0, -1);
  } else if (event.keyCode == 83 || event.keyCode == 40) {
    snake.dir(0, 1);
  } else if (event.keyCode == 65 || event.keyCode == 37) {
    snake.dir(-1, 0);
  } else if (event.keyCode == 68 || event.keyCode == 39) {
    snake.dir(1, 0);
  }
});

let distance = (x, y, a, b) => {
  return ((x - a) ** 2 + (y - b) ** 2) ** 0.5;
}

let pickLocation = () => {
  let cols = Math.floor(canvas.width / scl);
  let rows = Math.floor(canvas.height / scl);
  food = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
  };
  food.x *= scl;
  food.y *= scl;
}

//INIT
let scl = 20;
let snake = new Snake();
let food;
pickLocation();

let animate = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (snake.eat(food)) {
    pickLocation();
  }
  snake.death();
  snake.update();
  snake.show();

  context.save();
  context.fillStyle = "rgba(10, 10, 10, 0.4)";
  context.fillRect(food.x, food.y, scl, scl);
  context.strokeStyle = "#F012BE";
  context.strokeRect(food.x, food.y, scl, scl);
  context.restore();
  //console.log(snake.tail.length);
}

//Controlling the FPS
let fps = 15;
var game = setInterval(animate, 1000 / fps);