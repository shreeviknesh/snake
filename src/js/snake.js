class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(w / 2), floor(h / 2));
    this.xdir = 0;
    this.ydir = 0;
    this.total = 0;
  }

  changeDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.body.push(head);
  }

  gameOver() {
    let head = this.body[this.body.length - 1];

    if (head.x > w - 1 || head.x < 0 || head.y > h - 1 || head.y < 0) {
      return true;
    }

    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x == head.x && part.y == head.y) {
        return true;
      }
    }

    return false;
  }

  eat(pos) {
    let head = this.body[this.body.length - 1];
    if (head.x == pos.x && head.y == pos.y) {
      this.grow();

      // Every 1000 points grants 25 extra points per food eaten
      score += int(score / 1000) * 25 + 100;

      // Every 10000 points grants 100 extra points per food eaten
      score += int(score / 10000) * 100;

      if (score % 800 == 0) {
        fps += 1;
      }

      return true;
    }

    return false;
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(snakeFill);
      stroke(0);
      strokeWeight(0.005);
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }
  }
}
