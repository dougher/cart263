"use strict";

var DREW_WIDTH = 32;
var DREW_HEIGHT = 28;
var VELOCITY = 300;
var JUMP = -250;

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 600},
      debug: true
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
var hitButton;

var drew;
var platforms;
var enemies;
var cubistwalker;

var jumping = false;
var hitting = false;
var currentCombo = 0;
var combos = 0;

function preload() {
  this.load.image('sky', 'assets/images/sky.png');
  this.load.image('ground', 'assets/images/platform.png');

  this.load.spritesheet('idle', 'assets/images/silhouette_idle.png',
                      {frameWidth: DREW_WIDTH, frameHeight:DREW_HEIGHT});
  this.load.spritesheet('idle-combat', 'assets/images/silhouette_idlecombat.png',
                                          {frameWidth: DREW_WIDTH, frameHeight:DREW_HEIGHT});
  this.load.spritesheet('run', 'assets/images/silhouette_run.png',
                      {frameWidth: DREW_WIDTH, frameHeight:DREW_HEIGHT});
  this.load.spritesheet('jump', 'assets/images/silhouette_jump.png',
                                          {frameWidth: DREW_WIDTH, frameHeight:DREW_HEIGHT});
  this.load.spritesheet('hit1', 'assets/images/silhouette_hit1.png',
                      {frameWidth: DREW_WIDTH, frameHeight:DREW_HEIGHT});
  this.load.spritesheet('hit2', 'assets/images/silhouette_hit2.png',
                      {frameWidth: DREW_WIDTH, frameHeight:DREW_HEIGHT});
  this.load.spritesheet('cwalker_idle', 'assets/images/cubistwalker_idle.png',
                      {frameWidth: DREW_WIDTH, frameHeight:DREW_HEIGHT});
  this.load.spritesheet('cwalker_hurt', 'assets/images/cubistwalker_hurt.png',
                      {frameWidth: DREW_WIDTH, frameHeight:DREW_HEIGHT});
}


// setup()
//
// Description of setup

function create() {
  cursors = this.input.keyboard.createCursorKeys();
  hitButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  //
  // DREW ANIMATIONS
  //

  drew = this.physics.add.sprite(100, 450, 'idle').setScale(2);
  drew.body.height = 100;

  drew.setBounce(0.2);
  drew.setCollideWorldBounds(true);

  this.anims.create({
    key: 'idle',
    frames:
    this.anims.generateFrameNumbers('idle', {start: 0, end:3}),
    frameRate: 9,
    repeat: -1
  });

  this.anims.create({
    key: 'idle-combat',
    frames:
    this.anims.generateFrameNumbers('idle-combat', {start: 0, end:3}),
    frameRate: 12 ,
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
    key: 'crouch',
    frames:
    this.anims.generateFrameNumbers('jump', {start:0, end:0}),
    frameRate: 1
  });

  this.anims.create({
    key: 'jump',
    frames:
    this.anims.generateFrameNumbers('jump', {start: 1, end:7}),
    frameRate: 11
  });

  this.anims.create({
    key: 'hit1',
    frames:
    this.anims.generateFrameNumbers('hit1', {start: 0, end:5}),
    frameRate: 24
  });

  this.anims.create({
    key: 'hit2',
    frames:
    this.anims.generateFrameNumbers('hit2', {start: 0, end:5}),
    frameRate: 24
  });

  drew.on('animationcomplete', function(animation, frame){
    switch (animation.key){
      case "crouch":
        jumping = true;
        drew.setVelocityY(JUMP);
        //console.log("Done crouching");
        break;
      case "hit1":
        combos--;
        currentCombo = combos;
        if (combos === 0)
          hitting = false;
        break;
      case "hit2":
        combos--;
        currentCombo = combos;
        if (combos === 0)
          hitting = false;
        break;
    }
  }, this);

  // CUBIST WALKER

  enemies = this.physics.add.group({
    key: 'cwalker_idle',
    repeat: 6,
    setXY: {x:12, y:0, stepX:140}
  });

  Phaser.Actions.Call(enemies.getChildren(), function(enemy){
    enemy.speed = Math.random() * 2 + 1;
  }, this);

  Phaser.Actions.ScaleXY(enemies.getChildren(), 0.5, 0.5);

  this.physics.add.collider(drew, platforms);
  this.physics.add.collider(enemies, platforms);
  this.physics.add.overlap(drew, enemies, collisionHandler, null, this);

  this.anims.create({
    key: 'cw_idle',
    frames:
    this.anims.generateFrameNumbers('cwalker_idle', {start: 0, end:1}),
    frameRate: 12
  });

  this.anims.create({
    key: 'cw_hurt',
    frames:
    this.anims.generateFrameNumbers('cwalker_hurt', {start: 0, end:1}),
    frameRate: 2
  });


}

function update() {

  // DREW STUFF

  if (!jumping && !hitting){
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
  } else if (hitting && !jumping){
    if (currentCombo % 2 == 0)
      drew.anims.play('hit1', true);
    else
      drew.anims.play('hit2', true);

  } else {
    drew.anims.play('jump', true);

    if (drew.body.touching.down){
      jumping = false;
    }
  }

  if (cursors.up.isDown && drew.body.touching.down && !jumping){
    drew.anims.play('crouch', true);
  }

  if (Phaser.Input.Keyboard.JustDown(hitButton)){
    if (!hitting)
      hitting = true;

    combos++;
    console.log(combos);
  }

  if (combos < 0)
    combos = 0;

  // ENEMIES STUFF

  let enemiesArray = enemies.getChildren();

  for (let i = 0; i < enemiesArray.length;  i++){
    if (enemiesArray[i].speed > 0 )
      enemiesArray[i].flipX = true;
    else
      enemiesArray[i].flipX = false;

    enemiesArray[i].x += enemiesArray[i].speed;

    if (enemiesArray[i].x >= this.cameras.main.width){
      enemiesArray[i].speed *= -1;
    }
    else if (enemiesArray[i].x <= 0){
      enemiesArray[i].speed *= -1;
    }


    enemiesArray[i].on('animationcomplete', function(animation, frame){
      switch (animation.key){
        case "cw_hurt":
          enemiesArray[i].anims.play('cw_idle', true);
          //console.log("Done crouching");
          break;
      }
    }, this);
  }

}

function collisionHandler(drew, enemy){
  if (hitting){
    enemy.anims.play('cw_hurt', true);
  } else {
    drew.setVelocityY(JUMP/2);
  }
}
