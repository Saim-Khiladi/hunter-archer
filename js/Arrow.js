class Arrow {
  constructor(x, y, width, height, archerAngle) {
    var options = {
      restitution: 0.8,
      friction: 1.0,
      density: 1.0,
      isStatic: true
    };
    this.width = width;
    this.height = height;
    this.body = Bodies.rectangle(x, y, this.width, this.height, options);
    this.image = loadImage("./assets/arrow.png");
    this.trajectory = [];
    this.isRemoved = false;
    this.velocity = p5.Vector.fromAngle(archerAngle + PI / 2);
    World.add(world, this.body);
  }

  remove(index, arrowList) {
    this.isRemoved = true;
    Matter.World.remove(world, this.body);
    arrowList.splice(index, 1);
  }

  shoot(archerAngle) {
    this.velocity.mult(25);
    Matter.Body.setVelocity(this.body, {
      x: this.velocity.x,
      y: this.velocity.y
    });
    Matter.Body.setStatic(this.body, false);
  }

  display() {
    var pos = this.body.position;
    var angle = this.body.angle;

    // console.log(angle);
    push();
    translate(pos.x, pos.y);
    angle = this.velocity.heading();
    rotate(angle);
    imageMode(CENTER);
    // rect(0, 0, this.width, this.height);
    image(this.image, 0, 0, this.width, this.height);
    pop();

    if (this.body.velocity.x > 0 && this.body.position.x > 400) {
      var position = [this.body.position.x, this.body.position.y];
      this.trajectory.push(position);
    }

    for (var i = 0; i < this.trajectory.length; i++) {
      fill("black");
      ellipse(this.trajectory[i][0], this.trajectory[i][1], 2, 2);
    }
  }
}
