
var PreloaderState = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		var background = game.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = game.add.sprite(300, 400, 'preloaderBar');

		this.ready = false;

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		game.load.setPreloadSprite(this.preloadBar);

		//	TODO: Load the other assets we will be using. Below are examples of ways to load various kinds of assets.
		
		/* 	
			game.load.image('titlepage', 'images/title.jpg');
			game.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
			game.load.audio('titleMusic', ['audio/main_menu.mp3']);
			game.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
		*/
		//game.load.image('playersprite', 'assets/player.png');
		game.load.image('titlePage', 'assets/mainMenuBackground.png');
		game.load.image('titleText','assets/mainMenuTitle.png');
		game.load.image('red','assets/redTriangle.png');
		game.load.image('blue','assets/blueTriangle.png');
		game.load.image('pixel','assets/pixel.png');
		game.load.spritesheet('titleArrow','assets/menuArrows.png',98,84);
		game.load.spritesheet('titleButtonStart','assets/menuButtonStart.png',326,65);
		game.load.spritesheet('titleButtonOptions','assets/menuButtonOptions.png',326,65);
		game.load.spritesheet('titleButtonHowToPlay','assets/menuButtonHowToPlay.png',326,65);
		game.load.spritesheet('titleButtonQuit','assets/menuButtonQuit.png',326,65);
		
		// The following three audio samples were taking from the phaser examples assets folder.
		// It can be replaced with original music later.
		game.load.audio('titleSoundHover',['assets/numkey.wav']);
		game.load.audio('titleSoundSelect',['assets/menu_select.mp3']);
		game.load.audio('titleMusic', ['assets/Totta-HeroQuest-Pophousedub-remix.mp3']);


	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
		//game.state.start('MainMenu');
	},

	update: function () {

		//	You don't actually need to do game, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
			if (game.cache.isSoundDecoded('titleMusic') && this.ready == false)
			{
				this.ready = true;
				game.state.start('MainMenu');
			}
		

	}

};
