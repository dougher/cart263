const MAX_VELOCITY = 10;
const MIN_SIZE = 6;
const MAX_SIZE = 42;

//const DAMAGE = 0.2;
const EASING = 0.05;
const COLOR_GAIN = 15;

class Agent {
  constructor(position, size, color){
    this.position = position;
    this.size = size;
    this.color = color;
    this.active = true;
    this.state = 0;
  }

  update(){

  }

  display(){
    if (!this.active)
      return;

  }

  overlap(collider){
    if (!this.active)
    return;

    let d = dist(this.position.x, this.position.y, collider.position.x, collider.position.y);

    if (d < this.size/2 + collider.size/2)
      return true;
    else
      return false;
  }

  reset(){
    this.active = true;
  }
}

class Avatar extends Agent{
  constructor(position, size, color){
    super(position, size, color);
    this.initialColor = this.color;
  }

  update(){
    if (!this.active)
      return;

    let dx = mouseX - this.position.x;
    let dy = mouseY - this.position.y;
    this.position.x += dx * EASING;
    this.position.y += dy * EASING;

    avatar.position.x = constrain(avatar.position.x, 0 + avatar.size/2, width - avatar.size/2);
    avatar.position.y = constrain(avatar.position.y, 0 + avatar.size/2, height - avatar.size/2);
  }

  display(){
    super.display();

    noStroke();
    fill(this.color);

    push();
    ellipse(this.position.x, this.position.y, this.size, this.size);
    pop();
  }

  gain(){
    switch (this.state){
      case 0:
        let g = green(avatar.color);
        g += COLOR_GAIN;
        console.log(g);
        //avatar.color = lerpColor(avatar.color, color(190, 190, 0), EASING * 5);
        avatar.color = color(red(avatar.color), g, 0);
        if (g >= 190){
          this.state++;
        }
        break;
      case 1:
        let r = red(avatar.color);
        r -= COLOR_GAIN;

        avatar.color = color(r, green(avatar.color), 0);
        if (r <= 0){
          this.state++;
        }
        break;
      case 2:
        gameWon();
        break;
    }

  }

  reset(){
    super.reset();
    this.state = 0;
    this.position.x = width/2;
    this.position.y = height/2;
    this.color = color(red(this.initialColor), green(this.initialColor), blue(this.initialColor));

  }
}

class Collectible extends Agent{
  constructor(position, size, color){
    super(position, size, color);
    this.velocity = createVector(random(-MAX_VELOCITY, MAX_VELOCITY), random(-MAX_VELOCITY, MAX_VELOCITY));

    //"fake-rotating" attributes
    this.widthSize = this.size;
    this.expanding = false;
    this.rotationSpeed = random(0.1, 2);
  }

  update(){
    if (!this.active)
      return;

    //velocity stuff
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.x + this.size/2 < 0){
      this.position.x = width + this.size/2;
      this.position.y = height - this.position.y;
    } else if (this.position.x - this.size/2 > width){
      this.position.x = 0 - this.size/2;
      this.position.y = height - this.position.y;
    }

    if (this.position.y + this.size/2 < 0){
      this.position.y = height + this.size/2;
      this.position.x = width - this.position.x;
    } else if (this.position.y - this.size/2 > height){
      this.position.y = 0 - this.size/2;
      this.position.x = width - this.position.x;
    }

    //"fake-rotation" stuff
    this.rotate();

    //console.log(this.widthSize);
    if (this.widthSize >= this.size){
      this.expanding = false;
    } else if (this.widthSize <= 0){
      this.expanding = true;
    }
  }

  display(){
    super.display();

    noFill();
    stroke(this.color);
    strokeWeight(3);

    push();
    ellipse(this.position.x, this.position.y, this.widthSize, this.size);
    pop();
  }

  rotate(){
    if (this.expanding){
      this.widthSize += this.rotationSpeed;
    } else {
      this.widthSize -= this.rotationSpeed;
    }

    //console.log(this.position.z);
  }

  reset(){
    super.reset();
    this.position.x = random(width);
    this.position.y = random(height);
    this.velocity.x = random (-MAX_VELOCITY, MAX_VELOCITY);
    this.velocity.y = random (-MAX_VELOCITY, MAX_VELOCITY);
    this.size = random(MIN_SIZE, MAX_SIZE);
  }
}
