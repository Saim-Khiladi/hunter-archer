class Base2 {
  constructor(x, y, width, height) {
    var options = {
      isStatic: true
    };

    this.body = Bodies.rectangle(x, y, width, height, options);
    this.width = width;
    this.height = height;

    this.life1 = "#91ff35";
    this.life2 = "#91ff35";
    this.life3 = "#91ff35";

    World.add(world, this.body);
  }

  reduceLife(archerLife) {
    if (archerLife === 2) {
      this.life1 = "red";
    }

    if (archerLife === 1) {
      this.life2 = "red";
    }

    if (archerLife === 0) {
      this.life3 = "red";
    }
  }

  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    rect(0, 0, this.width, this.height, 20);

    fill(this.life1);
    rect(-30, 0, 30, this.height - 5);
    fill(this.life2);
    rect(0, 0, 30, this.height - 5);
    fill(this.life3);
    rect(30, 0, 30, this.height - 5);
    pop();
  }
}
