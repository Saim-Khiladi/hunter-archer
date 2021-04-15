const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, base1, base2, archer;
var arrows1 = [];
var arrows2 = [];
var archer1Life = 3;
var archer2Life = 3;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;

  base1 = new Base1(300, random(300, height - 300), 140, 25);
  base2 = new Base2(width - 300, random(300, height - 300), 140, 25);
  archer1 = new Archer1(300, base1.body.position.y - 150, 120, 40);
  archer2 = new Archer2(width - 300, base2.body.position.y - 150, 120, 40);
  moveArcher2();
}

function draw() {
  background(195);
  Engine.update(engine);

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("STICKMAN ARCHER", width / 2, 100);

  base1.display();
  base2.display();
  for (var i = 0; i < arrows1.length; i++) {
    showArrows(i, arrows1);
  }

  for (var i = 0; i < arrows2.length; i++) {
    showArrows(i, arrows2);
  }

  archer1.display();
  archer2.display();

  for (var i = 0; i < arrows1.length; i++) {
    var collision = Matter.SAT.collides(arrows1[i].body, base2.body);
    if (collision.collided) {
      archer2Life -= 1;
      base2.reduceLife(archer2Life);
      if (archer2Life <= 0) {
        archer2.collapse = true;
        Matter.Body.setStatic(archer2.body, false);
      }
    }
  }

  for (var i = 0; i < arrows1.length; i++) {
    var collision = Matter.SAT.collides(arrows1[i].body, archer2.body);
    if (collision.collided) {
      archer2Life -= 1;
      base2.reduceLife(archer2Life);
      if (archer2Life <= 0) {
        archer2.collapse = true;
        Matter.Body.setStatic(archer2.body, false);
      }
    }
  }

  for (var i = 0; i < arrows2.length; i++) {
    var collision = Matter.SAT.collides(arrows2[i].body, base1.body);
    if (collision.collided) {
      archer1Life -= 1;
      base1.reduceLife(archer1Life);
      if (archer1Life <= 0) {
        Matter.Body.setStatic(archer1.body, false);
      }
    }
  }

  for (var i = 0; i < arrows2.length; i++) {
    var collision = Matter.SAT.collides(arrows2[i].body, archer1.body);
    if (collision.collided) {
      archer1Life -= 1;
      base1.reduceLife(archer1Life);
      if (archer1Life <= 0) {
        Matter.Body.setStatic(archer1.body, false);
      }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var arrow = new Arrow(
      archer1.body.position.x,
      archer1.body.position.y,
      100,
      50
    );
    arrow.trajectory = [];
    Matter.Body.setAngle(arrow.body, archer1.body.angle);
    arrows1.push(arrow);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    if (arrows1.length) {
      arrows1[arrows1.length - 1].shoot(archer1.body.angle);
    }
  }
}

function showArrows(index, arrowList) {
  arrowList[index].display();
  if (
    arrowList[index].body.position.x > width ||
    arrowList[index].body.position.y > height
  ) {
    if (!arrowList[index].isRemoved) {
      arrowList[index].remove(index, arrowList);
    } else {
      arrowList[index].trajectory = [];
    }
  }
}

function moveArcher2() {
  if (!archer2.collapse) {
    setTimeout(() => {
      var pos = archer2.body.position;
      var angle = archer2.body.angle;
      var moves = ["UP", "DOWN"];
      var move = random(moves);
      var angleValue;

      if (move === "UP") {
        angleValue = 0.2;
      } else {
        angleValue = -0.2;
      }
      angle += angleValue;

      var arrow = new Arrow(pos.x, pos.y, 100, 50);
      arrow.trajectory = [];

      Matter.Body.setAngle(archer2.body, angle);
      Matter.Body.setAngle(arrow.body, angle);

      arrows2.push(arrow);
      setTimeout(() => {
        arrows2[arrows2.length - 1].shoot(angle);
      }, 100);

      moveArcher2();
    }, 2000);
  }
}
