class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.dx = 1;
    this.dy = 0;
    this.total = 1;
    this.body = [];
  }

  eat(pos) {
    let dist = distance(this.x, this.y, pos.x, pos.y);
    if (dist < 1) {
      this.total++;
      console.log("grown");
      return true;
    } else {
      return false;
    }
  }

  dir(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }

  death() {
    for (let i = 0; i < this.body.length; i++) {
      let pos = this.body[i];
      var dist = distance(this.x, this.y, pos.x, pos.y);
      if (dist < 1) {
        alert(`Game over. Your score: ${(this.body.length - 1) * 10}`)
        this.total = 1;
        this.body = [];
        this.x = 0;
        this.y = 0;
        this.dx = 1;
        this.dy = 0;
      }
    }
  }

  update() {
    for (let i = 0; i < this.body.length - 1; i++) {
      this.body[i] = this.body[i + 1];
    }
    if (this.total >= 1) {
      this.body[this.total - 1] = {
        x: this.x,
        y: this.y
      };
    }

    this.x = this.x + this.dx * scl;
    this.y = this.y + this.dy * scl;

    // this.x = Math.min(Math.max(this.x, 0), canvas.width - scl);
    // this.y = Math.min(Math.max(this.y, 0), canvas.height - scl);

    if (this.x > canvas.width - scl) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = canvas.width - scl;
    }
    if (this.y > canvas.height - scl) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = canvas.height - scl;
    }
  }

  show() {
    context.fillStyle = 'rgb(243, 42, 100)';
    for (var i = 0; i < this.body.length; i++) {
      context.fillRect(this.body[i].x, this.body[i].y, scl, scl);
      context.strokeRect(this.body[i].x, this.body[i].y, scl, scl);
    }
  }
}