/*global Phaser game game_state eventFunctions*/

// var eventFunctions = {};

// var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
// var game_state = {};
game_state.mainTwo = function() {};
game_state.mainTwo.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky2.png');
        game.load.image('debris', 'assets/planet.png');
        game.load.spritesheet('spaceship', 'assets/spaceship.png', 193, 190);
        document.removeEventListener("click", eventFunctions.mainTwoStarter);


    },
    create: function() {
        game.add.sprite(0, 0, 'spaceship');
        // We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        

        // a simple background for our game
        game.add.sprite(0, 0, 'sky');

        //the platforms group contains the ground
        this.platforms = game.add.group();

        //this is the physics for any object created in this group- the platforms
        this.platforms.enableBody = true;

        //this is the spaceship
        this.player = game.add.sprite(1, -100, 'spaceship');
        

        // this.player = game.add.sprite(1, game.world.height - 0, 'spaceship');
        this.player.scale.setTo(0.5, 0.5);

        //We need to add physics to this character
        game.physics.arcade.enable(this.player);
        this.player.enableBody = true;

        //Player physics properties. Give the little guy a slight bounce
        this.player.body.gravity.y = 290;
        this.player.body.collideWorldBounds = true;

        //the this.player animations
        this.player.animations.add('right', [4, 5], 10, true);
        this.player.animations.add('left', [2, 3], 10, true);
        this.player.animations.add('up', [0], 10, true);
        this.player.animations.add('down', [1], 10, true);

        //Out controls
        this.cursors = game.input.keyboard.createCursorKeys();

        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var movingPlatform = this.platforms.create(0, 64, 'debris');
        movingPlatform.body.velocity.y = 100;
        movingPlatform.body.immovable = true;
        movingPlatform.body.checkCollision.down = false;
        movingPlatform.body.checkCollision.left = false;
        movingPlatform.body.checkCollision.right = false;

        //this makes a moving platform
        var _this = this;
        setInterval(function() {

            // var movingPlatform = this.platforms = this.add.physicsGroup();
            var movingPlatform = _this.platforms.create(Math.random() * 700, 64, 'debris');
            game.physics.enable(movingPlatform, Phaser.Physics.ARCADE);
            movingPlatform.body.velocity.y = 100;
            movingPlatform.body.immovable = true;
            movingPlatform.body.checkCollision.down = false;
            movingPlatform.body.checkCollision.left = false;
            movingPlatform.body.checkCollision.right = false;
            movingPlatform.scored = false;
            // movingPlatform.body.setSize ()
        }, 2000);

        //the score
        this.scoreText = game.add.text(16, 16, 'Score: 0', {
            fontSize: '30px',
            fill: 'white'
        });
        this.score = 0;
    },




    update: function() {
        // Collide the player and the platforms
        game.physics.arcade.collide(this.player, this.platforms, this.scorePlatform, null, this);
        // game.physics.arcade.collide(this.player, this.ground);
        // the spaceship's movement
        this.player.body.velocity.x = 0;
        // this.player.body.velocity.y = 0;

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
        else if (this.cursors.down.isDown) {
            //Move down
            this.player.body.velocity.y = 350;
            this.player.animations.play('down');
        }

        else {
            //Stand still
            this.player.animations.stop();
            this.player.frame = 1;
        }

        console.log(this.player.body.touching.down)
            //Allow the this.player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
        if (this.cursors.up.isDown) {
            this.player.animations.play('up');
        }
        //this is supposed the cue the losing screen if you fall
        if (this.player.y >= 499) {
            game.state.start('badEndingTwo');
        }

        //this is supposed to cue the winning screen if you get a certain score
        if (this.score === 40) {
            game.state.start('goodEndingTwo');
        }
        
        // this.platforms.forEach(function(item){
        //     game.debug.body(item);
        // });
        
        // game.debug.body(this.player); 
        
        // game.debug.body(this.platforms);

        //      this.player.x -= 2;
        // if (this.player.x < -this.player.width) {
        //     this.player.x = game.world.width;
        // }

        // if(this.player.touching.right)

    },

    //makes score for landing on platforms
    scorePlatform: function(player, platform) {
        if (!platform.scored) {
            this.score++;
            this.scoreText.text = "Score: " + this.score;
            platform.scored = true;
        }
    }

};
game.state.add('mainTwo', game_state.mainTwo);
