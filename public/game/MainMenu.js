BasicGame.MainMenu = function (game) {
	/* 	TODO: Once assets are loaded, initialize them here.
		this.music = null;
		this.playButton = null;
	*/
	this.background = null;
	this.titleText = null;
};

BasicGame.MainMenu.prototype = {

	create: function () {

		/* 	TODO: Create our main menu.
			Below are example Phaser code for playing some music,and adding a title page and play button. THey are
			just here for reference.
			this.music = this.add.audio('titleMusic');
			this.music.play();

			this.add.sprite(0, 0, 'titlepage');

			this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
		*/
		this.background = this.add.sprite(0, 0, 'titlePage');
		this.background.width = this.game.world.width;
		this.background.height = this.game.world.height;

		this.titleText = this.add.sprite(512, 200,'titleText');
		this.titleText.anchor.setTo(0.5,0.5);

		this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	update: function () {

		//	TODO: Do some fancier main menu effects here.
		if (this.space.isDown) {
			this.startGame();
		}


	},

	startGame: function () {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
