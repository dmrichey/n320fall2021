class Boid {
  MAX_SPEED = 25;
  CIRCLE_SIZE = 5;
  xPos;
  yPos;
  currentDirectionVector = { x: 0, y: 0 };
  seenBoids = [];
  aggregateDirectionVector = { x: 0, y: 0 };
  centerDirectionVector = { x: 0, y: 0 };
  separationDirectionVector = { x: 0, y: 0 };

  constructor(x, y) {
    this.xPos = x;
    this.yPos = y;
    this.currentDirectionVector = {
      x: Math.random() * this.MAX_SPEED,
      y: Math.random() * this.MAX_SPEED,
    };
  }
}

let boidArray = [];

function getSeen(boidInst, boidArray, i) {
  let currentX = boidInst.xPos;
  let currentY = boidInst.yPos;
  for (let j = 0; j < i; j++) {
    if (
      Math.abs(currentX - boidArray[j].xPos) < 50 ||
      Math.abs(currentY - boidArray[j].yPos) < 50
    ) {
      boidInst.seenBoids.push(boidArray[j]);
    }
  }
  for (let j = i + 1; j < boidArray.length; j++) {
    if (
      Math.abs(currentX - boidArray[j].xPos) < 50 ||
      Math.abs(currentY - boidArray[j].yPos) < 50
    ) {
      boidInst.seenBoids.push(boidArray[j]);
    }
  }
}

function getAggregateDirection(boidInst) {
  let xDirectionTotal = boidInst.currentDirectionVector.x;
  let yDirectionTotal = boidInst.currentDirectionVector.y;
  for (let i = 0; i < boidInst.seenBoids.length; i++) {
    xDirectionTotal += boidInst.seenBoids[i].currentDirectionVector.x;
    yDirectionTotal += boidInst.seenBoids[i].currentDirectionVector.y;
  }
  boidInst.aggregateDirectionVector.x =
    xDirectionTotal / boidInst.seenBoids.length;
  boidInst.aggregateDirectionVector.y =
    yDirectionTotal / boidInst.seenBoids.length;
}

function getCenterDirection(boidInst) {}

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 25; i++) {
    boidArray[i] = new Boid(Math.random() * 800, Math.random() * 600);
  }
  /*for (let i = 0; i < 25; i++) {
    getSeen(boidArray[i], boidArray, i);
    console.log(boidArray[i].seenBoids);
  }*/
}

function draw() {
  background("#fff");
  fill("#000");
  for (let i = 0; i < boidArray.length; i++) {
    circle(boidArray[i].xPos, boidArray[i].yPos, boidArray[i].CIRCLE_SIZE);
    getSeen(boidArray[i], boidArray, i);
  }
}
