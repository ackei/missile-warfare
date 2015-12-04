// Initialize Phaser Game
var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'gameContainer');

// Add the game states
game.state.add('Boot', BootState);
game.state.add('Preloader', PreloaderState);
game.state.add('MainMenu', MainMenuState);
game.state.add('Game', GameState);

//	Now start the Boot state.
game.state.start('Boot');