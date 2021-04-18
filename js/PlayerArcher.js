class PlayerArcher {
  constructor(x, y, width, height) {
    const options = {
      isStatic: true
    };

    this.body = Matter.Bodies.rectangle(x, y, width, height, options);
    this.width = width;
    this.height = height;
    this.collapse = false;
    this.image1 = loadImage("./assets/playerArcher.png");
    this.image2 = loadImage("./assets/archer.png");

    World.add(world, this.body);

    Matter.Body.setAngle(this.body, -PI / 2); // -90 degree
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

    if (this.body.isStatic) {
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      fill("#a1887f");
      rect(0, 0, this.width, this.height);
      // image(this.image1, 0, 0, this.width, this.height);
      pop();
    } else {
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      rectMode(CENTER);
      fill("#a1887f");
      rect(0, 0, this.width, this.height);
      // imageMode(CENTER);
      // image(this.image2, 0, 0, this.width, this.height);
      pop();
    }
  }
}
