BasicGame.MainMenu = function (game) {
	/* 	TODO: Once assets are loaded, initialize them here.
		this.music = null;
		this.playButton = null;
	*/
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
	},

	update: function () {

		//	TODO: Do some fancier main menu effects here.

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
