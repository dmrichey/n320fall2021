// Container for raindrop objects
var raindrops = [];

// Potential colors for raindrop objects
var rainColors = ["#1973D1", "#135CC5", "#0C3BAA", "#061993", "#010280"];

// Ref to ground object
var groundObject;

// Key information for each raindrop object
class raindrop {
  constructor(xPos, size) {
    this.xPos = xPos;
    this.yPos = 0;
    this.speed = 5;
    this.size = size;
  }
}

// Generates a random size and horizontal position for the raindrop
// and adds the raindrop to the raindrops array
function addDrop() {
  let xPos = Math.floor(Math.random() * 800);
  let size = Math.floor(Math.random() * 5);
  raindrops.push(new raindrop(xPos, size));
  //console.log(raindrops);
}

// Draws all raindrops in the array to the canvas
function illustrateDrops() {
  for (let i = 0; i < raindrops.length; i++) {
    let segmentYPos = raindrops[i].yPos;
    let dropSize = raindrops[i].size;
    while (dropSize >= 0) {
      fill(rainColors[dropSize]);
      circle(raindrops[i].xPos, segmentYPos, dropSize * 5);
      segmentYPos = segmentYPos - dropSize * 8;
      dropSize--;
    }
  }
}

// Key information for the ground object
class ground {
  constructor() {
    this.xPos = 0;
    this.yPos = 500;
    this.width = 800;
    this.height = 100;
    this.blueValue = 15;
    this.numHits = 0;
  }
}

// Checks collision of each drop in array with bounds of ground object
function checkCollision() {
  for (let i = 0; i < raindrops.length; i++) {
    if (raindrops[i].yPos >= groundObject.yPos) {
      groundObject.numHits++;
      raindrops.splice(i, 1);
      if (groundObject.numHits % 10 == 0) {
        groundObject.blueValue++;
      }
    }
  }
}

// Setup canvas, initialize ground
function setup() {
  background("#444455");
  createCanvas(800, 600);
  groundObject = new ground();
}

function draw() {
  background("#444455");
  if (frameCount % 3 == 0 || frameCount % 5 == 0) {
    addDrop();
  }
  illustrateDrops();
  fill(0, 0, groundObject.blueValue);
  rect(
    groundObject.xPos,
    groundObject.yPos,
    groundObject.width,
    groundObject.height
  );
  checkCollision();
  for (let i = 0; i < raindrops.length; i++) {
    raindrops[i].yPos = raindrops[i].yPos + raindrops[i].speed;
  }
  console.log(groundObject.numHits);
  console.log(groundObject.blueValue);
}
