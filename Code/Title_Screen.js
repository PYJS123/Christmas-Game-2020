let size = 70,
  sine = 0;

let Arial, Verdana;

function preload() {
  Verdana = loadFont('VERDANA.TTF');
  // VerdanaBold = loadFont('VERDANAB.TTF');
  // VerdanaItalic = loadFont('VERDANAI.TTF');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 255, 255);
  textFont(Verdana);
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
  text('2020!!!', 0, 0);
  sine += 0.05;
  size = abs(sin(sine)) * 40 + 290;
  pop();
  rectMode(CENTER);
  stroke(0);
  strokeWeight(5);
  rect(width / 2, height - 100, 400, 120);
}
