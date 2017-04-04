/* global game  game_state */
game_state.story = function() {};
game_state.story.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky2.png');
        game.load.image('ground', 'assets/dirt.png');
        game.load.spritesheet('alien', 'assets/alien.png', 200, 200);
        game.load.spritesheet('spaceship', 'assets/spaceship.png', 220, 200);

    },
    create: function() {
        //a simple background for our game
        game.add.sprite(0, 0, 'sky');
        
        //this is the spaceship
        this.ship = game.add.sprite(250,190, 'spaceship');

        //the platforms group contains the ground
        this.platforms = game.add.group();

        //this is the physics for any object created in this group (the ground and platforms)
        this.platforms.enableBody = true;

        //this is the ground
        var ground = this.platforms.create(0, game.world.height - 88, 'ground');
        
        //scale the ground to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //this keeps it from falling away when it's jumped on
        ground.body.immovable = true;

        //this is the alien
        this.player = game.add.sprite(50, 500, 'alien');
        // game.debug.body('alien')
        //We need to add physics to this character
        game.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        
        //player physics properties.
        this.player.body.gravity.y = 370;
        this.player.body.collideWorldBounds = true;
        
         // this makes the alien the size we want
        this.player.body.setSize(90, 140, 55, 30);

        // the story
        this.storyText = game.add.text(16, 16, ' This alien here is Cephus \n His spaceship going back to his home planet \n took off without him. \n Help Cephus climb the falling debris to reach the \n spaceship before it leaves him behind!', {
            fontSize: '32px',
            fill: 'white'
        });
        
        document.addEventListener("click", eventFunctions.mainStarter);
        
    },
    update: function() {
        // Collide the player and the platforms
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.player, this.ground);
        
    }
};

game.state.add('story', game_state.story);
game.state.start('story');
