let reindeer;
let spd = 2;
let objs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  reindeer = new Reindeer(width / 5, height / 2);
}

function draw() {
  background(0, 255, 255);
  for (let i = 0; i < objs.length; i++) {
    objs[i].update();
    objs[i].show();
  }

  if (frameCount % 30 == 0 && round(random(1)) == 0) {
    objs.push(new UFO(width + 100, random(height), round(random(1))));
  }
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
