const FPS = 60;


class Point {
  constructor (x, y){
    this.xpos = x;
    this.ypos = y;
    this.active = true;
  }

  update(){
    this.xpos -= SCROLLING_SPEED;

    if (this.xpos < 0)
      this.active = false;
  }

  display(){
    push();

    point(this.xpos, this.ypos);

    pop();
  }
}
