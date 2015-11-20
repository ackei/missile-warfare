
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

var player;
var enemy;

BasicGame.Game.prototype = {

    create: function () {

        // TODO: We need to create the stage and players here. No projectiles yet.
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0,0,1024,768);
        player = this.game.add.sprite(200,300,'triangle');
        player.anchor.setTo(0.5,0.5);
        player.scale.setTo(0.2,0.2);
        this.game.physics.arcade.enable(player);

        enemy = this.game.add.sprite(800,300,'triangle');
        enemy.anchor.setTo(0.5,0.5);
        enemy.scale.setTo(0.2,0.2);
        this.game.physics.arcade.enable(enemy);
        enemy.visible = false;

        this.cursors = this.game.input.keyboard.createCursorKeys();
        player.body.collideWorldBounds = true;
        this.PLAYER_SPEED = 5;
        socket.on('updateEnemy',function(pos){
            enemy.visible = true;
            enemy.x = pos.x;
            enemy.y = pos.y;
        });
    },

    update: function () {

        // TODO: For now, we just need to implement player movement. No projectiles yet.
        if (this.cursors.left.isDown){
            player.x -= this.PLAYER_SPEED;
        }
        if (this.cursors.right.isDown){
            player.x += this.PLAYER_SPEED;
        }
        if (this.cursors.up.isDown){
            player.y -= this.PLAYER_SPEED;
        }
        if (this.cursors.down.isDown){
            player.y += this.PLAYER_SPEED;
        }
        socket.emit('sendPosition',{x: player.x, y: player.y});
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
