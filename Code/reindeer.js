class Reindeer {
  constructor(x, y) {
    this.x = 0;
    this.y = height / 2;
    this.fx = x;
    this.fy = y;
    this.lerprt = 0.2;
    this.spd = 10;
  }

  show() {
    fill(255, 0, 255);
    circle(this.x, this.y, 100);
  }

  update() {
    this.x = lerp(this.x, this.fx, this.lerprt);
    this.y = lerp(this.y, this.fy, this.lerprt);
  }
}
