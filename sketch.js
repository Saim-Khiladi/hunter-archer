const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, base1, archer1;
var arrows1 = [];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  base1 = new Base1(300, random(300, height - 300), 140, 25);
  archer1 = new Archer1(306, 300, 20, 120);
}

function draw() {
  background(189);
  Engine.update(engine);

  base1.display();
  archer1.display();

  for (var i = 0; i < arrows1.length; i++) {
    showArrows(i, arrows1);
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var arrow = new Arrow(
      archer1.body.position.x,
      archer1.body.position.y,
      100,
      10,
      archer1.body.angle
    );
    arrow.trajectory = [];
    // console.log(archer1.body.angle);
    Matter.Body.setAngle(arrow.body, PI / 2 + archer1.body.angle);
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
