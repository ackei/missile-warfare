var MainMenuState = {

	create: function () {

		/* 	TODO: Create our main menu.
			Below are example Phaser code for playing some music,and adding a title page and play button. THey are
			just here for reference.
			this.music = this.add.audio('titleMusic');
			this.music.play();
			this.add.sprite(0, 0, 'titlepage');
			this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
		*/

		this.physics.startSystem(Phaser.Physics.ARCADE);

		this.background = this.add.sprite(0, 0, 'titlePage');
		this.background.width = this.game.world.width;
		this.background.height = this.game.world.height;

		this.titleText = this.add.sprite(512, 200,'titleText');
		this.titleText.anchor.setTo(0.5,0.5);

		// ISSUE: For some reason, the buttons do not work properly when initialized.
		this.titleStart = this.game.add.sprite(512, 400, 'titleButtonStart');
		this.titleOptions = this.game.add.sprite(512, 465, 'titleButtonOptions');
		this.titleHowToPlay = this.game.add.sprite(512, 530, 'titleButtonHowToPlay');
		this.titleQuit = this.game.add.sprite(512, 595, 'titleButtonQuit');

		this.titleStart.anchor.setTo(0.5,0.5);
		this.titleOptions.anchor.setTo(0.5,0.5);
		this.titleHowToPlay.anchor.setTo(0.5,0.5);
		this.titleQuit.anchor.setTo(0.5,0.5);


		this.titleArrow = this.add.sprite(250, 360, 'titleArrow');
		this.physics.arcade.enable(this.titleArrow);

		this.menuSwitchSound = this.add.audio('titleSoundHover');
		this.menuSelectSound = this.add.audio('titleSoundSelect');
		this.menuMusic = this.add.audio('titleMusic');
		this.menuMusic.play();

		this.cursor = this.input.keyboard.createCursorKeys();
		this.cursor.down.onDown.add(this.moveDown, this);
		this.cursor.up.onDown.add(this.moveUp, this);
		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
		this.select = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.select.onDown.add(this.selectButton,this);
		this.menuState = 0;

	},

	update: function () {

		//	TODO: Do some fancier main menu effects here.
		this.titleStart.frame = 1;
		this.titleOptions.frame = 1;
		this.titleHowToPlay.frame = 1;
		this.titleQuit.frame = 1;
		this.titleArrow.frame = 0;

		switch(this.menuState) {
			case 0:
				this.titleStart.frame = 2;
				break;
			case 1:
				this.titleOptions.frame = 2;
				break;
			case 2:
				this.titleHowToPlay.frame = 2;
				break;
			case 3:
				this.titleQuit.frame = 2;
				break;
		}

		if(this.select.isDown) {
			switch(this.menuState) {
				case 0:
					this.titleStart.frame = 0;
					break;
				case 1:
					this.titleOptions.frame = 0;
					break;
				case 2:
					this.titleHowToPlay.frame = 0;
					break;
				case 3:
					this.titleQuit.frame = 0;
					break;
			}
			this.titleArrow.frame = 1;
		}
	},

	startGame: function () {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)

		this.menuMusic.stop();

		//	And start the actual game
		this.state.start('Game');

	},

	selectButton: function () {
		//TODO: implement multiple functions to handle the buttons.
		//Right now it just plays a neat sound.
		this.menuSelectSound.play();
		switch(this.menuState){
			case 0:
				this.startGame();
		}
	},

	moveDown: function () {
		this.menuSwitchSound.play();
		switch(this.menuState) {
			case 0:
				this.titleArrow.y += 65;
				this.menuState = 1;
				break;
			case 1:
				this.titleArrow.y += 65;
				this.menuState = 2;
				break;
			case 2:
				this.titleArrow.y += 65;
				this.menuState = 3;
				break;
			case 3:
				this.titleArrow.y -= 195;
				this.menuState = 0;
				break;
		}
	},

	moveUp: function () {
		this.menuSwitchSound.play();
		switch(this.menuState) {
			case 0:
				this.titleArrow.y += 195;
				this.menuState = 3;
				break;
			case 1:
				this.titleArrow.y -= 65;
				this.menuState = 0;
				break;
			case 2:
				this.titleArrow.y -= 65;
				this.menuState = 1;
				break;
			case 3:
				this.titleArrow.y -= 65;
				this.menuState = 2;
				break;
		}
	}

};