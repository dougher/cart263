const FPS = 60;

class Box {
  constructor (x1, y, x2, z, time){
    this.xpos = x1;
    this.ypos = y;
    this.xrot = x2;
    this.zrot = z;

    this.time = time * FPS;
  }

  update(){
    this.time--;

  }

  display(){
    push();

    translate(this.xpos, this.ypos);
    rotateX(this.xrot);
    rotateY(this.zrot);

    box(25);

    pop();
  }
}
