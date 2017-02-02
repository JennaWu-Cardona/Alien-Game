/* global game phaser game_state */

game_state.badEndingTwo = function() {};
game_state.badEndingTwo.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky2.png');
        game.load.image('planet', 'assets/planet.png');
        game.load.spritesheet('spaceship', 'assets/spaceship.png', 193.5, 190);
    },
    create: function() {
        //a simple background for our game
        game.add.sprite(0, 0, 'sky');
        
        //this is the planet
        this.sprite = game.add.sprite(250, 190, 'planet');
        this.sprite.scale.setTo(1.9, 1.9);
        
        //this is the spaceship
        this.player = game.add.sprite(50,350, 'spaceship');
        
        // the story
        this.storyText = game.add.text(16, 16, 'Unfortunately, you have run out of fuel \nYou are now left to float in space for eternity', {
            fontSize: '32px',
            fill: 'white'
        });
    },

    update: function() {
        this.player.frame = 1;
    
    },

};
game.state.add('badEndingTwo', game_state.badEndingTwo);
