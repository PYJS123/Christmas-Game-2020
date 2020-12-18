let reindeer;
let spd = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  reindeer = new Reindeer(width / 5, height / 2);
}

function draw() {
  background(0, 255, 255);
  reindeer.update();
  reindeer.show();
  if (keyIsDown(UP_ARROW)) {
    reindeer.fy -= reindeer.spd;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    reindeer.fx += reindeer.spd;
  }
  if (keyIsDown(DOWN_ARROW)) {
    reindeer.fy += reindeer.spd;
  }
  if (keyIsDown(LEFT_ARROW)) {
    reindeer.fx -= reindeer.spd;
  }
}
