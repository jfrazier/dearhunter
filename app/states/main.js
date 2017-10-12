'use strict';

class MainState {

  init() {
    this.cursors = game.input.keyboard.createCursorKeys();
  }

  preload () {
    game.load.image('background', 'images/background.jpg');
    game.load.image('ground', 'images/ground.png');
    game.load.image('muzzle', 'images/muzzle.png');
    game.load.image('bullet', 'images/bullet_large.png');
    game.load.spritesheet('muzzleFlashes', 'images/muzzleFlashes.png', 200, 150);
    game.load.spritesheet('rifle', 'images/rifle_V03.png', 174, 197);
    game.load.spritesheet('deer', 'images/deer_hop_ani.png', 260, 260);
  }

  create () {

    var background = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
    background.anchor.setTo(0.5, 0.5);

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);


    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;

    // Here we create the ground.
    this.ground = this.platforms.create(0, game.world.height / 2, 'ground');
    // this.ground = this.platforms.create(0, game.world.height - 240, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    // ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    this.ground.body.immovable = true;
    // game.physics.arcade.enable(ground);

    // The player and its settings
    this.deer = game.add.sprite(game.world.width / 2, 250, 'deer');
    this.deer.anchor.setTo(0.5, 0.5);
    this.deer.scale.setTo(0.5, 0.5);

    //  We need to enable physics on the rifle
    game.physics.arcade.enable(this.deer);
    // game.physics.arcade.enable(rifle);

    //  Player physics properties. Give the little guy a slight bounce.
    // this.deer.body.setSize(this.deer.body.width, this.deer.body.height);
    // this.deer.body.setSize(100, 100, this.deer.body.width / this.deer.scale.x, this.deer.body.height / this.deer.scale.y);
    this.deer.body.setSize((this.deer.body.width / this.deer.scale.x) / 2, (this.deer.body.height / this.deer.scale.y) / 2, this.deer.body.width / 2, this.deer.body.height / 2);
    this.deer.body.bounce.y = 0.2;
    this.deer.body.gravity.y = 300;
    this.deer.body.collideWorldBounds = true;

    // //  Our two animations, walking left and right.
    this.deer.animations.add('hop', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, true);
    this.deer.animations.add('standing', [18, 19], 10, true);

    this.deer.maxHealth = 100;
    this.deer.setHealth(100);

    // rifle
    this.rifle = game.add.sprite(game.world.width - 174, game.world.height - 197, 'rifle');
    game.physics.arcade.enable(this.rifle);
    this.rifle.animations.add('aim', [0], 1, true);
    this.rifle.animations.add('shoot', [1, 0], 0.25, false);

    // bullet
    this.bullet = game.add.sprite(0, 0, 'bullet');
    this.bullet.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this.bullet);
    this.bullet.body.x = game.world.width / 2;
    this.bullet.body.y = game.world.height - this.bullet.body.height;

    // muzzle
    this.muzzle = game.add.sprite(game.world.width / 2, game.world.height, 'muzzle');
    this.muzzle.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this.muzzle);
    this.muzzle.body.x = game.world.width / 2;
    this.muzzle.body.y = game.world.height - this.muzzle.body.height;

    // muzzle
    this.muzzleFlashes = game.add.sprite(game.world.width / 2, game.world.height - 75, 'muzzleFlashes');
    this.muzzleFlashes.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this.muzzleFlashes);
    this.muzzleFlashes.body.x = game.world.width / 2;
    this.muzzleFlashes.body.y = game.world.height - this.muzzleFlashes.body.height;
    this.muzzleFlashes.animations.add('flash', [0, 1, 2, 3], 10, false);

    // health readout
    var style = { font: "bold 26px Arial", fill: "#fff"};

    //  The Text is positioned at 0, 100
    this.healthLabel = game.add.text(0, 0, "Health", style);
    this.healthLabel.setShadow(1, 1, 'rgba(0,0,0,1)', 5);

    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    this.healthLabel.setTextBounds(10, game.world.height - 60, 100, 50);

    //  The Text is positioned at 0, 100
    this.healthScore = game.add.text(0, 0, this.deer.health, style);
    this.healthScore.setShadow(1, 1, 'rgba(0,0,0,1)', 5);

    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    this.healthScore.setTextBounds(10, game.world.height - 35, 300, 50);


  }

    update() {
      //  Collide the player and the stars with the this.platforms
    var hitPlatform = game.physics.arcade.collide(this.deer, this.platforms);
    var hitDeer = game.physics.arcade.collide(this.deer, this.bullet);

    //  Reset the players velocity (movement)
        this.deer.body.velocity.x = 0;
        this.bullet.body.velocity.y = -800;
        // this.bullet.body.velocity.y *= 1.08;
        if (this.bullet.scale.x > 0.1) {
          this.bullet.scale.x -= 0.02;
          this.bullet.scale.y -= 0.02;
        }

        if (this.cursors.left.isDown)
        {
            //  Move to the left
            this.deer.body.velocity.x = -400;

            this.deer.animations.play('hop');
            if (this.deer.scale.x < 0) {
              this.deer.scale.x *= -1;
            }
        }
        else if (this.cursors.right.isDown)
        {
            //  Move to the right
            this.deer.body.velocity.x = 400;

            this.deer.animations.play('hop');
            if ( this.deer.scale.x > 0) {
              this.deer.scale.x *= -1;
            }
        }
        else
        {
            //  Stand still
            // this.deer.animations.stop();
            this.deer.animations.play('standing');
            // this.deer.frame = 0;
        }

        //  Allow the this.deer to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.deer.body.touching.down && hitPlatform)
        {
            this.deer.body.velocity.y = -250;
        }

        if (hitDeer) {
          this.deer.damage(10);
          this.healthScore.setText(this.deer.health);
          if(!this.deer.alive) {
            game.state.start('startScreen');
          }
        }

        if (hitDeer || this.bullet.body.checkWorldBounds()) {
          this.rifle.animations.play('shoot');
          this.muzzleFlashes.animations.play('flash');
          this.bullet.scale.x = 1;
          this.bullet.scale.y = 1;
          this.bullet.body.x = game.world.width / 2;
          this.bullet.body.y = game.world.height - this.bullet.body.height;
          // this.bullet.body.velocity.y = -100;
          // this.bullet.body.velocity.x = 0;
          var leftOrRight = Math.random() < 0.5 ? 1 : -1;
          this.bullet.body.velocity.x = leftOrRight * (Math.random() * 700);
        } else {
          this.rifle.animations.play('aim');
        }
  }

  render() {
    //note: most things in phaser is automatically rendered.
    // game.debug.body(this.deer);
    // game.debug.body(this.bullet);
    // game.debug.body(this.ground);
  }

};
