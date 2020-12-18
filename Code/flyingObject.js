class UFO {
  constructor(x, y, bad) {
    this.x = x;
    this.y = y;
    this.bad = bad;
  }

  show() {
    fill(this.bad * 255);
    circle(x, y, 50);
  }
  
  update() {
    this.x -= spd;
  }
}
