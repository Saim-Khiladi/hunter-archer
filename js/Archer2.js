class Archer2 {
  constructor(x, y, width, height) {
    var options = {
      isStatic: true
    };
    this.body = Bodies.rectangle(x, y, width, height, options);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    World.add(world, this.body);
    Matter.Body.setAngle(this.body, PI / 2);
    this.collapse = false;
  }

  display() {
    var pos = this.body.position;
    var angle = this.body.angle;

    if (this.body.isStatic) {
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      fill("white");
      rect(0, -20, this.width, this.height);
      pop();
    } else {
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      rectMode(CENTER);
      fill("#676e6a");
      rect(0, 0, this.width, this.height);
      pop();
    }
  }
}
