/* global game phaser game_state eventFunctions*/

var checkOne = true;
game_state.goodEnding = function() {};
game_state.goodEnding.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky2.png');
        game.load.spritesheet('spaceship', 'assets/spaceship.png', 190, 190);

    },
    create: function() {
        //a simple background for our game
        game.add.sprite(0, 0, 'sky');

        //this is the spaceship
        game.add.sprite(250, 190, 'spaceship');

        // the story
        this.storyText = game.add.text(16, 16, 'Congratulations! \nYou have made it to the ship! \nNow we go onward! \nMove from planet to planet to refuel! ', {
            fontSize: '32px',
            fill: 'white'
        });

        // var thing = document.addEventListener("click", function() {
        //     if (checkOne === true) {
        //         game.state.start('main2');
        //         alert("test1234567890");
        //         checkOne = false;
        //     }

        // });
        // document.addEventListener("click", function() {
        //     if (checkOne === true) {
        //         game.state.start('mainTwo');
        //         alert("test1234567890");
        //         checkOne = false;
        //     }

        // });
        
        document.addEventListener("click", eventFunctions.mainTwoStarter);

    },

    update: function() {
        //this starts the game
        // document.addEventListener("click", eventFunctions.mainTwoStarter);


    },
    
};
game.state.add('goodEnding', game_state.goodEnding);
// game.state.start('goodEnding');
