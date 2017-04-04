/* global game phaser game_state eventFunctions*/

game_state.badEnding = function() {};
game_state.badEnding.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky2.png');
        game.load.spritesheet('alien', 'assets/alien.png', 200, 200);
        game.load.spritesheet('spaceship', 'assets/spaceship.png', 190, 190);
    },
    create: function() {
        //a simple background for our game
        game.add.sprite(0, 0, 'sky');
        
        //this is the spaceship
        game.add.sprite(250, 190, 'spaceship');
        
        //this is the alien
        this.player = game.add.sprite(50, 350, 'alien');
        
        // the story
        this.storyText = game.add.text(16, 16, 'You were unable to catch up to the ship!\n It has taken off without you\n Now Cephus has been left behind ', {
            fontSize: '32px',
            fill: 'white'
        });
        
        document.addEventListener("click", eventFunctions.mainStarter);

    },

    update: function() {
        this.player.frame = 2;
    
    },

};
game.state.add('badEnding', game_state.badEnding);
// game.state.start('badEnding');
