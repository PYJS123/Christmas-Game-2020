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
  hss = -1,
  lms = Infinity;
let lives = 3,
  llives = 3;
let last;
let off = false;
let ach = ['', '', '', '', ''];
let size = 70,
  sine = 0;
let playing = false;


function preload() {
  verdana = loadFont('../Other Assets/2c34c6e5-a98f-4337-8872-c89750fed25d (2).TTF');
  imgRein = loadImage('../Images/Reindeer6.png');
  imgTurb = loadImage('../Images/Turbulence.png');
}

function setup() {
  createCanvas(windowWidth - 10, windowHeight - 20);
  reindeer = new Reindeer(width / 5, height / 2);
  textFont(verdana);
}

function draw() {
  if (!playing) {
    background(0, 255, 255);
    push();
    strokeWeight(0);
    textAlign(LEFT, TOP);
    textSize(100);
    fill(100, 50, 0);
    text('Christmas Game,', 0, 0);
    strokeWeight(5);
    translate(width / 2, height / 2);
    textAlign(CENTER, CENTER);
    textSize(size);
    fill(0, 255, 0);
    rotate(0.2);
    noStroke();
    text('2020!!!', 0, 0);
    sine += 0.05;
    size = abs(sin(sine)) * 40 + 290;
    pop();
    push();
    fill(255);
    rectMode(CENTER);
    stroke(0);
    strokeWeight(5);
    rect(width / 2 - 500, height - 100, 400, 120);
    rect(width / 2 + 500, height - 100, 400, 120);
    noStroke();
    textSize(100);
    textAlign(CENTER, CENTER);
    fill(0);
    text('PLAY', width / 2 - 500, height - 110);
    textSize(50);
    text('TOGGLE\nMUSIC', width / 2 + 500, height - 110);
    pop();
  } else {
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
    stroke(2);
    rect(width / 2 - 200 / 2, 50, 200, 30);
    fill(0, 255, 0);
    rect(width / 2 - 200 / 2, 50, 200 / 3 * lives, 30);
    push();
    textAlign(LEFT, BOTTOM);
    noStroke();
    fill(70, 50, 0);
    text('Press \'M\' to go back to title screen', 0, height - 10);
    pop();
    lives = lerp(lives, llives, 0.2);

    if (off === true) {
      push();
      rectMode(CORNERS);
      fill(0);
      rect(width / 3, height / 3, width / 3 * 2, height / 3 * 2);
      fill(255);
      textSize(70);
      text('GAME OVER!', width / 2, height / 3);
      textSize(10);
      textAlign(CENTER, CENTER);
      text('Press any key to restart' + ach[0] + ach[1] + ach[2] + ach[3] + ach[4], width / 2, height / 2 + 27);
      pop();
      if (score > hscore) {
        hscore = score;
        ach[0] = ('\nNEW High score!:\n' + score);
      }
      if (miss < lmiss) {
        lmiss = miss;
        ach[1] = ('\nNEW Lowest amount of misses!:\n' + miss);
      }
      if (time > htime) {
        htime = time;
        ach[2] = ('\nNEW Longest time!:\n' + time);
      }
      if (score / time > hss) {
        hss = score / time;
        ach[3] = ('\nNEW Highest score per second!:\n' + hss);
      }
      if (miss / time < lms) {
        lms = miss / time;
        ach[4] = ('\nNEW Lowest misses per second!:\n' + lms);
      }
    }
  }
}

function keyPressed() {
  if (key === 'M' || key === 'm') {
    playing = false;
  } else if (off === true) {
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

function mousePressed() {
  if (mouseX > (width / 2 - 700) && mouseY > (height - 160) && mouseX < (width / 2 - 300) && mouseY < (height - 40)) {
    playing = true;
  }
}
