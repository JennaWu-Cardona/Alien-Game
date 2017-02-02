/* global game phaser game_state eventFunctions*/


game_state.goodEndingTwo = function() {};
game_state.goodEndingTwo.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky2.png');
        game.load.image('planet', 'assets/planet.png');
        game.load.spritesheet('spaceship', 'assets/spaceship.png', 220, 200);

    },
    create: function() {
        //a simple background for our game
        game.add.sprite(0, 0, 'sky');

        //this is the planet
        this.planet = game.add.sprite(250, 200, 'planet');
        this.planet.scale.setTo(2, 2);
        
        //this is the spaceship
        this.ship = game.add.sprite(250, 190, 'spaceship');
        this.ship.frame = 1;

        // the story
        this.storyText = game.add.text(16, 16, 'Congratulations! \nYou made it! \nThank you for helping Cephus get home! ', {
            fontSize: '32px',
            fill: 'white'
        });

        // document.addEventListener("click", eventFunctions.mainTwoStarter);

    },

    update: function() {
        
        


    },

};
game.state.add('goodEndingTwo', game_state.goodEndingTwo);
