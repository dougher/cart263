let Drew = new Phaser.Class({
  Extends: Phaser.Physics.Arcade.Sprite,

  initialize:
  function Drew(scene, x, y, key, game){
    Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, key);

    this.SPEED = 300;
    this.JUMP = -250;
    this.jumping = false;
    this.hitting = false;
    this.drawing = false; // This boolean helps us regulate the drawing of
    this.hurt = false;
    this.combos = 0; // The combos accumulated by button mashing the hitButton.
    this.currentCombo = 0; // This int allows us to choose the right current animation in the combo sequence.

    this.gameRef = game;
    this.graphics = game.graphics;
    this.depth = 2;
  },

  create: function(){
    //this.body.height = 100;

    this.setScale(2);
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);

    this.scene.anims.create({
      key: 'idle',
      frames:
      this.scene.anims.generateFrameNumbers('idle', {start: 0, end:3}),
      frameRate: 9,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'idle-combat',
      frames:
      this.scene.anims.generateFrameNumbers('idle-combat', {start: 0, end:3}),
      frameRate: 12 ,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'run',
      frames:
      this.scene.anims.generateFrameNumbers('run', {start: 0, end:6}),
      frameRate: 12,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'crouch',
      frames:
      this.scene.anims.generateFrameNumbers('jump', {start:0, end:0}),
      frameRate: 1
    });

    this.scene.anims.create({
      key: 'jump',
      frames:
      this.scene.anims.generateFrameNumbers('jump', {start: 1, end:7}),
      frameRate: 11
    });

    this.scene.anims.create({
      key: 'hit1',
      frames:
      this.scene.anims.generateFrameNumbers('hit1', {start: 0, end:5}),
      frameRate: 24
    });

    this.scene.anims.create({
      key: 'hit2',
      frames:
      this.scene.anims.generateFrameNumbers('hit2', {start: 0, end:5}),
      frameRate: 24
    });

    this.on('animationcomplete', function(animation, frame){
      switch (animation.key){
        case "crouch":
          this.jumping = true;
          this.setVelocityY(this.JUMP);
          //console.log("Done crouching");
          break;
        case "hit1":
          this.combos--;
          this.currentCombo = this.combos;
          break;
        case "hit2":
          this.combos--;
          this.currentCombo = this.combos;
          break;
      }
      if (this.combos === 0){
        this.hitting = false;
        this.drawing = false;
      }
    }, this);

  },

  update: function(cursor, hitButton){
    if (!this.jumping && !this.hitting){

      if (cursors.left.isDown){
        this.move(true);
      } else if (cursors.right.isDown){
        this.move(false);
      } else {
        this.setVelocityX(0);
        this.anims.play('idle', true);
        //console.log("Setting to idle");
      }

    } else if (this.hitting && !this.jumping){

      this.attack();

    } else {
      this.anims.play('jump', true);

      if (this.body.touching.down){
        this.jumping = false;
      }
    }

    if (cursors.up.isDown && this.body.touching.down && !this.jumping){
      this.anims.play('crouch', true);
    }

    if (Phaser.Input.Keyboard.JustDown(hitButton)){
      if (!this.hitting)
        this.hitting = true;

      this.combos++;
      console.log(this.combos);
    }

    if (this.combos < 0)
      this.combos = 0;
  },

  move: function(left){
    if (left){
      this.setVelocityX(-this.SPEED);
      this.flipX = true;
    } else {
      this.setVelocityX(this.SPEED);
      this.flipX = false;
    }

    this.anims.play('run', true);
  },

  attack: function(){
    if (this.currentCombo % 2 == 0)
      this.anims.play('hit1', true);
    else
      this.anims.play('hit2', true);
  },

  receiveDamage: function(){
    this.setVelocityY(this.JUMP/2);
    this.setTintFill(0xffffff);
  },

  collisionHandler: function(enemy){

    if (this.hitting && !this.drawing)
    {
      this.drawing = true;
      console.log("Enemy X: " + enemy.x + " // Enemy Y: " + enemy.y);
      enemy.anims.play('cw_hurt', true);
      enemy.health--;
      // this.graphics.beginPath();
      //this.graphics.lineStyle(1, 0x000000);
      let currentDegree = this.getRandomDegree();
      let currentRadius = this.currentRadius();
      // this.graphics.arc(enemy.x - SPRITE_WIDTH, enemy.y, currentRadius, 0, Phaser.Math.DegToRad(currentDegree), true);
      // this.graphics.strokePath();
      // this.graphics.closePath();

      let paintX = (enemy.x - SPRITE_WIDTH) + Math.cos(this.getDegreeBetween(currentDegree)) * currentRadius;
      let paintY = (enemy.y - SPRITE_HEIGHT) + Math.sin(this.getDegreeBetween(currentDegree)) * currentRadius;
      let paint = this.gameRef.add.sprite(paintX, paintY, 'paint');
      paint.angle = 315;
      paint.anims.play('paint_splash');
    } else {
      drew.receiveDamage();
    }

  },

  currentRadius: function(enemy){
    let center = Math.random() * 50;

    //console.log("This is the current radial center, on the x-axis: " + circleCenterXPos);

    return center;

  },

  getRandomDegree: function(){
    return Math.ceil(Math.random()) * 360 + 270;
  },

  getDegreeBetween: function(max){
    return Math.ceil(Math.random() * max);
  }


});
