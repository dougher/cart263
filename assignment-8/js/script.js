"use strict";

var DREW_SIZE = 32;
var VELOCITY = 300;
var JUMP = -250;

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 400},
      debug: false
    }
  },
  scene : {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

var cursors;
var drew;
var platforms;

var jumping = false;

function preload() {
  this.load.image('sky', 'assets/images/sky.png');
this.load.image('ground', 'assets/images/platform.png');

  this.load.spritesheet('idle', 'assets/images/silhouette_idle.png',
                      {frameWidth: DREW_SIZE, frameHeight:DREW_SIZE});
  this.load.spritesheet('idle-combat', 'assets/images/silhouette_idlecombat.png',
                                          {frameWidth: DREW_SIZE, frameHeight:DREW_SIZE});
  this.load.spritesheet('run', 'assets/images/silhouette_run.png',
                      {frameWidth: DREW_SIZE, frameHeight:DREW_SIZE});
  this.load.spritesheet('jump', 'assets/images/silhouette_jump.png',
                                          {frameWidth: DREW_SIZE, frameHeight:DREW_SIZE});
  this.load.spritesheet('hit1', 'assets/images/silhouette_hit1.png',
                      {frameWidth: DREW_SIZE, frameHeight:DREW_SIZE});

}


// setup()
//
// Description of setup

function create() {
  cursors = this.input.keyboard.createCursorKeys();

  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  drew = this.physics.add.sprite(100, 450, 'drew').setScale(2);

  drew.setBounce(0.2);
  drew.setCollideWorldBounds(true);

  this.anims.create({
    key: 'idle',
    frames:
    this.anims.generateFrameNumbers('idle', {start: 0, end:3}),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'idle-combat',
    frames:
    this.anims.generateFrameNumbers('idle-combat', {start: 0, end:3}),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'run',
    frames:
    this.anims.generateFrameNumbers('run', {start: 0, end:6}),
    frameRate: 12,
    repeat: -1
  });

  this.anims.create({
    key: 'jump',
    frames:
    this.anims.generateFrameNumbers('jump', {start: 0, end:7}),
    frameRate: 8,
  });

  this.physics.add.collider(drew, platforms);
}

function update() {
  if (!jumping){
    //console.log(jumping);
    if (cursors.left.isDown){
      drew.setVelocityX(-VELOCITY);
      drew.flipX = true;
      drew.anims.play('run', true);
    } else if (cursors.right.isDown){
      drew.flipX = false;
      drew.setVelocityX(VELOCITY);
      drew.anims.play('run', true);
    } else {
      drew.setVelocityX(0);
      drew.anims.play('idle', true);

      //console.log("Setting to idle");
    }
  }


  if (cursors.up.isDown && drew.body.touching.down && !jumping){
    drew.setVelocityY(JUMP);
  }

  if (jumping){
    console.log(jumping);
    drew.anims.play('jump', true);
  }


  if (!drew.body.touching.down){
    jumping = true;
  } else {
    jumping = false;
  }

}
