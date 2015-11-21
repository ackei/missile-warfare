
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

var x = 512;
var y = 384;
var bool = false;

socket.on('receivePose', function(pos) {
    bool = true;
    x = pos.xpos;
    y = pos.ypos;
    socket.emit('sendPose', {xpos: BasicGame.Game.myself.x , ypos: BasicGame.Game.myself.y }); 
});


BasicGame.Game.prototype = {

    create: function () {

        socket.emit('enterGame');

        this.physics.startSystem(Phaser.Physics.ARCADE);
        // TODO: We need to create the stage and players here. No projectiles yet.
        this.myself = this.game.add.sprite(512, 384,'playersprite');
        this.myself.anchor.setTo(0.5,0.5);
        this.myself.scale.setTo(0.2, 0.2);

        this.enemy = this.game.add.sprite(512, 384, 'playersprite');
        this.enemy.anchor.setTo(0.5,0.5);
        this.enemy.scale.setTo(0.2, 0.2);
        this.enemy.visible = false;

        this.physics.arcade.enable(this.myself);

        this.cursors = this.input.keyboard.createCursorKeys();
        socket.emit('sendPose', {xpos: this.myself.x, ypos: this.myself.y});

        this.MYSPEED = 250;

    },

    update: function () {

        this.myself.angle += 1;

        if (this.cursors.left.isDown) {
            this.myself.body.velocity.x = -this.MYSPEED;
        }
        else if (this.cursors.right.isDown) {
            this.myself.body.velocity.x = this.MYSPEED;
        }
        else if (this.cursors.up.isDown) {
            this.myself.body.velocity.y = -this.MYSPEED; 
        }
        else if (this.cursors.down.isDown) {
            this.myself.body.velocity.y = this.MYSPEED;
        }
        else {
        this.myself.body.velocity.x = this.myself.body.velocity.y = 0;
        }

        if (bool) {
            this.enemy.visible = true;
            this.enemy.x = x;
            this.enemy.y = y;
        }
        // TODO: For now, we just need to implement player movement. No projectiles yet.

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
