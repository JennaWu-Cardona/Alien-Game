/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky2.png');
        game.load.image('ground', 'assets/dirt.png');
        game.load.spritesheet('alien', 'assets/alien.png', 200, 200);
        game.load.image('debris', 'assets/platform.png');

    },
    create: function() {
        // We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // a simple background for our game
        game.add.sprite(0, 0, 'sky');

        //the platforms group contains the ground
        this.platforms = game.add.group();

        //this is the physics for any object created in this group
        this.platforms.enableBody = true;

        //this is the ground
        var ground = this.platforms.create(0, game.world.height - 45, 'ground');

        //scale the ground to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //this keeps it from falling away when it's jumped on
        ground.body.immovable = false;
game.physics.arcade.enable(this.ground);

        //this is the alien
        this.player = game.add.sprite(1, 1, 'alien');
        // this.player = game.add.sprite(1, game.world.height - 0, 'alien');

        //the this.player animations
        this.player.animations.add('right', [3], 10, true);
        this.player.animations.add('left', [5], 10, true);
        this.player.animations.add('jump',[1], 10, true);

        //We need to add physics to this character
        game.physics.arcade.enable(this.player);

        //Player physics properties. Give the little guy a slight bounce
        this.player.body.bounce.y = /*global BOUNCE*/ -0.2;
        this.player.body.gravity.y = /*global GRAVITY*/ +350;
        this.player.body.collideWorldBounds = true;

        // this makes the alien the size we want
        // this.player.body.setSize(50, 75, 45, 30);

        //Out controls
        this.cursors = game.input.keyboard.createCursorKeys();
    },

    update: function() {
        // Collide the player and the platforms
        game.physics.arcade.collide(this.player, this.ground);

        // the alien's movement
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
            //move to the left
            this.player.body.velocity.x = -180;
            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            //Move to the right
            this.player.body.velocity.x = 180;

            this.player.animations.play('right');
        }
        else if (this.cursors.up.isDown) {
            this.player.animations.play('jump');
        }
        
        else {
            //Stand still
            this.player.animations.stop();

            this.player.frame = 0;
        }


        //Allow the this.player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }


    },

}
game.state.add('main', game_state.main);
game.state.start('main');
