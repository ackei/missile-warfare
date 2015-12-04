// socket is part of socket.io that allows connectivity to the server
// With no argument, io defaults to try to connect to the host that serves the page
socket = io();

var BootState = {

    init: function () {

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting game to 1
        game.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        game.stage.disableVisibilityChange = true;

        if (game.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
            game.scale.pageAlignHorizontally = true;
        }
        else
        {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.setMinMax(480, 260, 1024, 768);
            game.scale.forceLandscape = true;
            game.scale.pageAlignHorizontally = true;
        }

    },

    preload: function () {

        //  Here we load the assets required for our preloader (in game case a background and a loading bar)

        /* 	TODO: Decide what preloading bar and backgrounds we want to use. Below are temporary images I 
        	found. They can be replaced or kept.
		*/
        
        game.load.image('preloaderBackground', 'assets/preloaderBackground.jpg');
        game.load.image('preloaderBar', 'assets/loadingBar.png');

    },

    create: function () {

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        game.state.start('Preloader');

    }

};
