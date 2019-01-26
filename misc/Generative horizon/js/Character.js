const MOVE_SPEED = 0.1;


class Character {
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

    fill('#c0d146');
    ellipse(this.xpos, this.ypos, 25, 25);

    pop();
  }

  move(type){
    switch (type){
      case "Left":
        this.xpos-= MOVE_SPEED;
        break;
      case "Right":
        this.ypos+= MOVE_SPEED;
        break;
    }
  }
}
