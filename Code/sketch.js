let reindeer;
let spd = 2;
let objs = [];
let score = 0,
  time = 0,
  miss = 0;
let lives = 3,
  llives = 3;
let last;

function preload() {
  verdana = loadFont('7a9c453f-539d-4b06-8c84-fd90088c243d.TTF');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  reindeer = new Reindeer(width / 5, height / 2);
}

function draw() {
  if ((reindeer.x < 50 || reindeer.x > width - 50) || (reindeer.y < 50 || reindeer.y > height - 50)) {
    noLoop();
  }
  if (lives <= 0.01) {
    noLoop();
  }
  background(0, 255, 255);
  time = floor(frameCount / 60);
  for (let i = objs.length - 1; i >= 0; i--) {
    if (objs[i].x < -25) {
      if (objs[i].bad == 1) {
        miss++;
      }
      objs.splice(i, 1);
      continue;
    }
    if (dist(objs[i].x, objs[i].y, reindeer.x, reindeer.y) <= 75) {
      if (objs[i].bad == 1) {
        objs.splice(i, 1);
        score++;
        continue;
      } else {
        llives--;
        objs.splice(i, 1);
      }
    }
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
  fill(255, 0, 0);
  textStyle(BOLD);
  textFont(verdana);
  textAlign(LEFT, TOP);
  textSize(30);
  text('Score: ' + score + "               Missed Points: " + miss, 10, 10);
  textAlign(RIGHT, TOP);
  fill(100, 50, 0);
  text('Time: ' + time + " secs", width - 10, 10);
  textAlign(CENTER, TOP);
  fill(0, 0, 125);
  text('Health:', width / 2, 10);
  fill(0, 255, 255);
  rect(width / 2 - 200 / 2, 50, 200, 30);
  fill(0, 255, 0);
  rect(width / 2 - 200 / 2, 50, 200 / 3 * lives, 30);
  lives = lerp(lives, llives, 0.2);
}
