class Archer1 {
  constructor(x, y, width, height) {
    var options = {
      isStatic: true
    };
    this.body = Bodies.rectangle(x, y, width, height, options);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    Matter.Body.setAngle(this.body, radians(-90));
    World.add(world, this.body);
  }
  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    if (keyIsDown(RIGHT_ARROW) && angle < -1) {
      angle += 0.01;
      Matter.Body.setAngle(this.body, angle);
    }

    if (keyIsDown(LEFT_ARROW) && angle > -2.3) {
      angle -= 0.01;
      Matter.Body.setAngle(this.body, angle);
    }

    // if (this.body.isStatic) {
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill("white");
    rect(0, -20, this.width, this.height);
    pop();
    // } else {
    //   push();
    //   translate(pos.x, pos.y);
    //   rotate(angle);
    //   rectMode(CENTER);
    //   fill("#676e6a");
    //   rect(0, 0, this.width, this.height);
    //   pop();
    // }
  }
}
