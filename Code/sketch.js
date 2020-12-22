let reindeer;
let spd = 2;
let objs = [];
let score = 0,
  hscore = -1,
  time = 0,
  htime = -1,
  ntime = 0,
  miss = 0,
  lmiss = Infinity,
  hss = 0,
  lms = Infinity;
let lives = 3,
  llives = 3;
let last;
let off = false;
let ach = [];

function preload() {
  verdana = loadFont('7a9c453f-539d-4b06-8c84-fd90088c243d.TTF');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  reindeer = new Reindeer(width / 5, height / 2);
}

function draw() {
  if ((reindeer.x < 50 || reindeer.x > width - 50) || (reindeer.y < 50 || reindeer.y > height - 50)) {
    off = true;
  }
  if (lives <= 0.01) {
    off = true;
  }
  noStroke();
  background(0, 255, 255);
  if (!off) {
    ntime++;
    time = floor(ntime / 60);
  }
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
    if (!off) {
      objs[i].update();
    }
    objs[i].show();

  }
  if (frameCount % 30 == 0 && round(random(1)) == 0 && off === false) {
    objs.push(new UFO(width + 100, random(height), round(random(1))));
  }
  if (!off) {
    reindeer.update();
  }
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
  stroke(2);
  fill(0, 255, 255);
  rect(width / 2 - 200 / 2, 50, 200, 30);
  fill(0, 255, 0);
  rect(width / 2 - 200 / 2, 50, 200 / 3 * lives, 30);
  lives = lerp(lives, llives, 0.2);
  if (off === true) {
    push();
    rectMode(CORNERS);
    fill(0);
    rect(width / 3, height / 3, width / 3 * 2, height / 3 * 2);
    fill(255);
    textSize(70);
    text('GAME OVER!', width / 2, height / 3);
    textSize(20);
    text('Press any key to restart', width / 2, height / 2);
    pop();
    if (score > hscore) {
      hscore = score;
      ach.push('NEW High score!:\n' + score);
    }
    if (miss < lmiss) {
      lmiss = miss;
      ach.push('NEW Lowest amount of misses!:\n' + miss);
    }
    if (time > htime) {
      htime = time;
      ach.push('NEW Longest time!:\n' + time);
    }
    if (hss < score / time) {
      hss = score / time;
      ach.push('NEW Highest score per second!:\n' + hss);
    }
    if (miss / time < lms) {
      lms = miss / time;
      ach.push('NEW Lowest misses per second!:\n' + lms);
    }
  }
}

function keyPressed() {
  if (off === true) {
    off = false;
    score = 0;
    miss = 0;
    ntime = 0;
    lives = 3;
    llives = 3;
    objs = [];
    reindeer.fx = width / 5;
    reindeer.fy = height / 2;
    reindeer.x = width / 5;
    reindeer.y = height / 2;
  }
}
