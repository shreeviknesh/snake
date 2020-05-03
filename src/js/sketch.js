const scaleRatio = 20;
const widthRatio = 0.9;
const heightRatio = 0.8;

const snakeFill = "#01FF70";
const foodFill = "rgba(255, 65, 54, 0.75)";
const gameColor = "rgba(102, 147, 105, 0.5)";
const gameOverColor = "rgba(255, 0, 0, 0.1)";

let snake;
let food;
let w, h;
let score = 0;
let gameover = false;
let fps = 10;

let getSide = () => {
  return min(window.innerWidth * widthRatio - ((window.innerWidth * widthRatio) % scaleRatio),
    window.innerHeight * heightRatio);
};

function setup() {
  fps = 10;
  createCanvas(getSide(), getSide());
  document.body.style.backgroundColor = "";

  w = floor(width / scaleRatio);
  h = floor(height / scaleRatio);
  score = 0;

  snake = new Snake();
  spawnFood();
}

function draw() {
  frameRate(fps);
  scale(scaleRatio);
  clear();
  background(gameColor);

  if (snake.eat(food)) {
    spawnFood();
  }

  snake.update();
  snake.show();

  if (snake.gameOver()) {
    noLoop();
    document.body.style.backgroundColor = gameOverColor;
    gameover = true;
  }

  fill(foodFill);
  stroke(255, 0, 0);
  strokeWeight(0.01);
  rect(food.x, food.y, 1, 1);
}

function spawnFood() {
  food = createVector(floor(random(w)), floor(random(h)));
}

function windowResized() {
  resizeCanvas(getSide(), getSide());
}

function keyPressed() {
  if (keyCode === LEFT_ARROW || keyCode == 65) {
    snake.changeDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW || keyCode == 68) {
    snake.changeDir(1, 0);
  } else if (keyCode === DOWN_ARROW || keyCode == 83) {
    snake.changeDir(0, 1);
  } else if (keyCode === UP_ARROW || keyCode == 87) {
    snake.changeDir(0, -1);
  } else if (key == ' ' && gameover) {
    setup();
    loop();
  }
}