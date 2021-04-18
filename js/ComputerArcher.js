class ComputerArcher {
  constructor(x, y, width, height) {
    var options = {
      isStatic: true
    };

    this.body = Bodies.rectangle(x, y, width, height, options);

    this.width = width;
    this.height = height;
    this.collapse = false;

    this.image1 = loadImage("./assets/computerArcher.png");
    this.image2 = loadImage("./assets/archer.png");

    World.add(world, this.body);

    Matter.Body.setAngle(this.body, PI / 2); // 90 degree
  }

  display() {
    var pos = this.body.position;
    var angle = this.body.angle;

    if (this.body.isStatic) {
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      fill("#81d4fa");
      rect(0, -20, this.width, this.height);
      // image(this.image1, 0, -20, this.width, this.height);
      pop();
    } else {
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      rectMode(CENTER);
      fill("#81d4fa");
      rect(0, 0, this.width, this.height);

      // imageMode(CENTER);
      // image(this.image2, 0, 0, this.width, this.height);
      pop();
    }
  }
}
