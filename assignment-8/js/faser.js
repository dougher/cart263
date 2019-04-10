"use strict";

var SPRITE_WIDTH = 32;
var SPRITE_HEIGHT = 28;
var NUM_OF_MONSTERS = 1;

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 600},
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
                      {frameWidth: SPRITE_WIDTH, frameHeight:SPRITE_HEIGHT});
  this.load.spritesheet('idle-combat', 'assets/images/silhouette_idlecombat.png',
                                          {frameWidth: SPRITE_WIDTH, frameHeight:SPRITE_HEIGHT});
  this.load.spritesheet('run', 'assets/images/silhouette_run.png',
                      {frameWidth: SPRITE_WIDTH, frameHeight:SPRITE_HEIGHT});
  this.load.spritesheet('jump', 'assets/images/silhouette_jump.png',
                                          {frameWidth: SPRITE_WIDTH, frameHeight:SPRITE_HEIGHT});
  this.load.spritesheet('hit1', 'assets/images/silhouette_hit1.png',
                      {frameWidth: SPRITE_WIDTH, frameHeight:SPRITE_HEIGHT});
  this.load.spritesheet('hit2', 'assets/images/silhouette_hit2.png',
                      {frameWidth: SPRITE_WIDTH, frameHeight:SPRITE_HEIGHT});
  this.load.spritesheet('cwalker_idle', 'assets/images/cubistwalker_idle.png',
                      {frameWidth: SPRITE_WIDTH, frameHeight:SPRITE_HEIGHT});
  this.load.spritesheet('cwalker_hurt', 'assets/images/cubistwalker_hurt.png',
                      {frameWidth: SPRITE_WIDTH, frameHeight:SPRITE_HEIGHT});
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
  // We create Drew has his own Phaser class (extending Physics.Arcade.Sprite)
  drew = new Drew(this, 100, 450, 'idle');

  this.physics.add.existing(drew);
  this.add.existing(drew);
  drew.create();

  // Animations for cubist walker.

  enemies = this.physics.add.group({ // VERSION WITH ONE STATIC ENEMY FOR GRAPHICS TESTS
    key: 'cwalker_idle',
    repeat: NUM_OF_MONSTERS - 1,
    setXY: {x:250, y:450, stepX:this.cameras.main.width/NUM_OF_MONSTERS}
  });

  // enemies = this.physics.add.group({
  //   key: 'cwalker_idle',
  //   repeat: NUM_OF_MONSTERS - 1,
  //   setXY: {x:12, y:0, stepX:this.cameras.main.width/NUM_OF_MONSTERS}
  // });

  // Phaser.Actions.Call(enemies.getChildren(), function(enemy){
  //   enemy.speed = Math.random() * 2 + 1;
  // }, this);

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

  let enemiesArray = enemies.getChildren();
  for (let i = 0; i < enemiesArray.length;  i++){
    enemiesArray[i].on('animationcomplete', function(animation, frame){
      switch (animation.key){
        case "cw_hurt":
          enemiesArray[i].anims.play('cw_idle', true);
          //console.log("Done crouching");
          break;
      }
    }, this);
  }

  Phaser.Actions.ScaleXY(enemies.getChildren(), 0.5, 0.5);

  this.physics.add.collider(drew, platforms);
  this.physics.add.collider(enemies, platforms);
  this.physics.add.overlap(drew, enemies, collisionHandler, null, this);

  this.graphics = this.add.graphics();
  this.graphics.depth = 1;
}

function update() {

  drew.update(cursors, hitButton);

  // ENEMIES STUFF

  let enemiesArray = enemies.getChildren();

  // for (let i = 0; i < enemiesArray.length;  i++){
  //   if (enemiesArray[i].speed > 0 )
  //     enemiesArray[i].flipX = true;
  //   else
  //     enemiesArray[i].flipX = false;
  //
  //   enemiesArray[i].x += enemiesArray[i].speed;
  //
  //   if (enemiesArray[i].x >= this.cameras.main.width){
  //     enemiesArray[i].speed *= -1;
  //   }
  //   else if (enemiesArray[i].x <= 0){
  //     enemiesArray[i].speed *= -1;
  //   }
  // }

}

function collisionHandler(drew, enemy){
  if (drew.hitting)
  {
    enemy.anims.play('cw_hurt', true);
    this.graphics.moveTo(enemy.x, enemy.y);
    this.graphics.lineStyle(1, 0x000000, 1.0);
    this.graphics.beginPath();
    this.graphics.arc()
  }
  // else {
  //   drew.receiveDamage();
  // }
}
