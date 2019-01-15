class Shape {
  constructor(x,y,size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
  update() {
    this.x += random(-1,1);
    this.y += random(-1,1);
  }
  display() {
    // A generic shape cannot be displayed
    // But it makes sense to tell anyone extending this class to include one!
  }
}

class Square extends Shape {
  constructor(x,y,size) {
    super(x,y,size);
  }
  display() {
    push();
    rectMode(CENTER);
    fill(255,0,0);
    noStroke();
    rect(this.x,this.y,this.size,this.size);
    pop();
  }
}

class Circle extends Shape {
  constructor(x,y,size){
    super(x,y,size);
  }
  update(){
    super.update();
    this.size += random(-1, 1);
  }
  display() {
    push();
    ellipseMode(CENTER);
    fill(0, 255, 0);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}

class Line extends Shape{
  constructor(x,y,x2,y2){
    super(x,y,undefined);
    this.x2 = x2;
    this.y2 = y2;
  }
  update(){
    super.update();
    this.x2 += random(-1, 1);
    this.y2 += random(-1, 1);
  }
  display(){
    push();
    stroke(0, 0, 255);
    strokeWeight(5);
    line(this.x, this.y, this.x2, this.y2);
    pop();
  }
}
